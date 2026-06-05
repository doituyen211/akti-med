/**
 * Quản lý: ghi âm trực tiếp (MediaRecorder), upload file, demo transcript.
 * Tách logic ra khỏi component để dễ test và thay thế WebSocket sau.
 */

"use client";

import { useRef, useCallback } from "react";
import { useEncounterStore } from "../app/store";
import { useNotifStore } from "../app/store";
import { uploadAudio } from "@/lib/api";
import { DEMO_TRANSCRIPT, DEMO_SOAP } from "@/lib/constants";

export function useRecording(encounterId) {
  const mediaRecorderRef = useRef(null); // MediaRecorder instance
  const timerRef = useRef(null); // setInterval cho đồng hồ
  const demoTimerRef = useRef(null); // setTimeout chain cho demo transcript

  const {
    setRecordingStatus,
    setRecordingSeconds,
    incrementRecordingSeconds,
    addTranscriptSegment,
    setAiGeneratedSoap,
    setSoapGenerationStatus,
    addEmergencyLogEntry,
    isEmergencyMode,
    resetEncounter,
  } = useEncounterStore();

  const { showNotif } = useNotifStore();

  // ── Helpers ──────────────────────────────────────────────────────────────────

  /** Format giây → "MM:SS" */
  function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  /** Thêm segment vào store, đồng thời log nếu đang emergency mode */
  function pushSegment(role, text, startTime = 0) {
    const segment = {
      id: `seg-${Date.now()}-${Math.random()}`,
      speaker: role,
      text,
      startTime,
      endTime: startTime + 3,
      confidence: 0.95,
      isFinal: true,
    };
    addTranscriptSegment(segment);

    // Nếu đang emergency mode → ghi vào emergency log luôn
    if (isEmergencyMode) {
      addEmergencyLogEntry({
        id: `emg-${Date.now()}`,
        encounterId,
        timestamp: new Date().toLocaleTimeString("vi-VN"),
        speaker: role,
        text,
        isCommand: false,
      });
    }
  }

  // ── Demo transcript playback (khi chưa có WebSocket thật) ────────────────────

  const runDemoTranscript = useCallback(
    (lines = DEMO_TRANSCRIPT, onDone) => {
      let idx = 0;
      let startTime = 0;

      function next() {
        if (idx >= lines.length) {
          onDone?.();
          return;
        }
        const line = lines[idx++];
        pushSegment(line.role, line.text, startTime);
        startTime += 4;
        demoTimerRef.current = setTimeout(next, 1600 + Math.random() * 800);
      }
      demoTimerRef.current = setTimeout(next, 800);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [isEmergencyMode],
  );

  /** Dừng demo transcript chain */
  function stopDemoTranscript() {
    clearTimeout(demoTimerRef.current);
  }

  // ── Start recording (thật hoặc demo) ─────────────────────────────────────────

  const startRecording = useCallback(async () => {
    setRecordingStatus("recording");
    setRecordingSeconds(0);

    // Bắt đầu đồng hồ đếm
    timerRef.current = setInterval(() => {
      incrementRecordingSeconds();
    }, 1000);

    // Thử lấy microphone thật
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = async () => {
        // Khi dừng, gửi audio lên backend
        const blob = new Blob(chunks, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        try {
          setSoapGenerationStatus("generating");
          await uploadAudio(encounterId, file);
          showNotif(
            "✅ Đã gửi audio lên server, đang tạo SOAP Note...",
            "info",
          );
        } catch {
          // Backend chưa có → chạy demo SOAP
          showNotif("⚠️ Backend chưa kết nối, dùng demo SOAP", "warning");
          setAiGeneratedSoap(DEMO_SOAP);
        }
      };

      recorder.start(1000); // chunk mỗi 1s
      mediaRecorderRef.current = recorder;

      // Chạy demo transcript song song (thay thế bằng WebSocket sau)
      runDemoTranscript(DEMO_TRANSCRIPT, () => {
        showNotif("📝 Transcript hoàn tất, đang tạo SOAP Note...", "info");
        setTimeout(() => setAiGeneratedSoap(DEMO_SOAP), 600);
      });
    } catch {
      // Không có micro → chạy hoàn toàn demo
      showNotif("🎙️ Không tìm thấy micro, chạy chế độ demo", "warning");
      runDemoTranscript(DEMO_TRANSCRIPT, () => {
        showNotif("✅ Demo transcript hoàn tất!", "success");
        setTimeout(() => setAiGeneratedSoap(DEMO_SOAP), 600);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encounterId, runDemoTranscript]);

  // ── Stop recording ────────────────────────────────────────────────────────────

  const stopRecording = useCallback(() => {
    clearInterval(timerRef.current);
    stopDemoTranscript();

    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      // Dừng các track để tắt icon micro trên trình duyệt
      mediaRecorderRef.current.stream?.getTracks().forEach((t) => t.stop());
    }

    setRecordingStatus("stopped");
    showNotif("Ghi âm đã dừng. Có thể tạo SOAP Note.", "info");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Toggle recording ──────────────────────────────────────────────────────────

  const toggleRecording = useCallback(
    (currentStatus) => {
      if (currentStatus === "recording") stopRecording();
      else startRecording();
    },
    [startRecording, stopRecording],
  );

  // ── Handle uploaded audio file ────────────────────────────────────────────────

  const handleAudioFile = useCallback(
    async (file) => {
      if (!file) return;
      showNotif(`📁 Đã chọn: ${file.name} — Đang xử lý...`, "info");
      setRecordingStatus("processing");
      setRecordingSeconds(0);

      try {
        // Thử gọi API thật
        await uploadAudio(encounterId, file, (progress) => {
          // progress callback — có thể hiển thị thanh tiến trình
          console.log(`Upload: ${progress}%`);
        });
        showNotif("✅ Upload thành công, đang phân tích...", "success");
      } catch {
        showNotif("⚠️ Backend chưa kết nối, chạy demo transcript", "warning");
      }

      // Chạy demo transcript nhanh (giả lập kết quả từ server)
      runDemoTranscript(DEMO_TRANSCRIPT, () => {
        setRecordingStatus("stopped");
        setAiGeneratedSoap(DEMO_SOAP);
        showNotif("✅ Phân tích hoàn tất!", "success");
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [encounterId, runDemoTranscript],
  );

  // ── Cleanup on unmount ────────────────────────────────────────────────────────

  function cleanup() {
    clearInterval(timerRef.current);
    clearTimeout(demoTimerRef.current);
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream?.getTracks().forEach((t) => t.stop());
    }
  }

  return {
    startRecording,
    stopRecording,
    toggleRecording,
    handleAudioFile,
    cleanup,
    formatTime,
  };
}
