/**
 * Thanh điều khiển ghi âm: nút mic, đồng hồ, upload file.
 */

"use client";

import { useRef } from "react";
import { useEncounterStore } from "../../app/store";
import { useRecording } from "../../hooks/useRecording";

export default function RecordingControls({ encounterId }) {
  const fileInputRef = useRef(null);
  const { recordingStatus, recordingSeconds } = useEncounterStore();
  const { toggleRecording, handleAudioFile, formatTime } =
    useRecording(encounterId);

  const isRecording = recordingStatus === "recording";
  const isProcessing = recordingStatus === "processing";

  return (
    <div
      style={{
        padding: "14px 20px",
        borderTop: "1px solid #e5e5e5",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* Mic / Stop button */}
      <button
        onClick={() => toggleRecording(recordingStatus)}
        disabled={isProcessing}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "none",
          cursor: isProcessing ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          transition: "all 0.2s",
          background: isRecording ? "#ef4444" : "#f5f0e0",
          color: isRecording ? "#fff" : "#0a0a0a",
          boxShadow: isRecording ? "0 0 0 4px rgba(239,68,68,.2)" : "none",
        }}
        title={isRecording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
      >
        <i
          className={`ti ${isRecording ? "ti-player-stop-filled" : "ti-microphone"}`}
        />
      </button>

      {/* Timer + status */}
      <div>
        <div
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1,
            color: isRecording ? "#ef4444" : "#0a0a0a",
          }}
        >
          {formatTime(recordingSeconds)}
        </div>
        <div style={{ fontSize: 13, color: "#9a9a9a" }}>
          {isRecording
            ? "● Đang ghi âm"
            : isProcessing
              ? "⏳ Đang xử lý..."
              : recordingStatus === "stopped"
                ? "■ Đã dừng"
                : "Sẵn sàng ghi âm"}
        </div>
      </div>

      {/* Waveform animation khi đang record */}
      {isRecording && <Waveform />}

      {/* Upload button */}
      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*,video/*"
          style={{ display: "none" }}
          onChange={(e) =>
            e.target.files?.[0] && handleAudioFile(e.target.files[0])
          }
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isRecording || isProcessing}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            height: 32,
            fontSize: 13,
            fontWeight: 600,
            border: "1px solid #e5e5e5",
            borderRadius: 8,
            background: "transparent",
            color: "#6a6a6a",
            cursor: isRecording || isProcessing ? "not-allowed" : "pointer",
            opacity: isRecording || isProcessing ? 0.5 : 1,
          }}
        >
          <i className="ti ti-upload" />
          Upload file
        </button>
      </div>
    </div>
  );
}

// ── Mini waveform animation ───────────────────────────────────────────────────
function Waveform() {
  const bars = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28 }}
    >
      {bars.map((i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: 6 + Math.random() * 16,
            borderRadius: 2,
            background: i % 2 === 0 ? "#ff4d8b" : "#b8a4ed",
            animation: `wave ${0.7 + Math.random() * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}
