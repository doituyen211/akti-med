"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserContext } from "../../../components/ui/UserContext";

const demoLines = [
  {
    role: "doctor",
    text: "Chào buổi sáng! Bạn đang có triệu chứng gì hôm nay?",
  },
  {
    role: "patient",
    text: "Dạ bác sĩ ơi, tôi bị đau đầu và sốt từ tối qua, khoảng 38.5 độ.",
  },
  {
    role: "doctor",
    text: "Ngoài sốt và đau đầu, bạn có ho hay chảy nước mũi không?",
  },
  {
    role: "patient",
    text: "Dạ có, tôi ho ít và có chảy nước mũi trong suốt, không có màu.",
  },
  {
    role: "doctor",
    text: "Bạn có tiếp xúc với người bị cảm cúm gần đây không?",
  },
  {
    role: "patient",
    text: "Dạ hôm qua tôi đi họp với đồng nghiệp, anh ấy cũng đang bị ho.",
  },
  {
    role: "doctor",
    text: "Được, tôi sẽ khám để đánh giá. Bạn có dị ứng thuốc nào không?",
  },
  { role: "patient", text: "Dạ không, tôi không có dị ứng thuốc." },
];

const agentResponses = {
  "lịch sử bệnh án":
    "📋 Đã tìm thấy 12 lần khám trước. Bệnh mãn tính: Không có. Dị ứng: Không ghi nhận.",
  bhyt: "🏥 BHYT hợp lệ đến 31/12/2025. Mức hưởng: 80%. Số thẻ: DN4123456789.",
  "x-quang":
    "📡 Đã tạo yêu cầu chụp X-Quang ngực cho Phòng Chẩn đoán hình ảnh. Số yêu cầu: XQ2025-847.",
  "xét nghiệm":
    "🧪 Đã tạo phiếu xét nghiệm máu (CBC, CRP, glucose). Gửi đến Phòng XN tầng 2.",
  "in giấy":
    "🖨️ Đang chuẩn bị giấy ra viện... Lệnh in đã được gửi đến máy in P-201.",
};

function formatTimer(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

const sx = {
  page: {
    minHeight: "calc(100vh - 64px)",
    background: "#fffaf0",
    color: "#0a0a0a",
    fontFamily: "'Space Mono', monospace",
  },

  encounterLayout: {
    display: "flex",
    height: "calc(100vh - 64px)",
    overflow: "hidden",
  },

  encounterLeft: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #e5e5e5",
  },

  encounterRight: {
    width: 420,
    display: "flex",
    flexDirection: "column",
    background: "#faf5e8",
  },

  encHeader: {
    padding: "16px 20px",
    borderBottom: "1px solid #e5e5e5",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  ghostButton: {
    background: "transparent",
    color: "#6a6a6a",
    border: "none",
    padding: "6px 10px",
    height: 32,
    fontSize: 13,
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "'Space Mono', monospace",
    fontWeight: 600,
  },

  secondaryButton: {
    background: "transparent",
    color: "#0a0a0a",
    border: "1px solid #e5e5e5",
    padding: "6px 14px",
    height: 32,
    fontSize: 13,
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "'Space Mono', monospace",
    fontWeight: 600,
  },

  primaryButton: {
    background: "#0a0a0a",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    height: 32,
    fontSize: 13,
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "'Space Mono', monospace",
    fontWeight: 600,
  },

  encTitle: {
    fontSize: 15,
    fontWeight: 600,
  },

  encMeta: {
    fontSize: 12,
    color: "#6a6a6a",
  },

  badgeSuccess: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 9999,
    background: "rgba(34,197,94,.1)",
    color: "#15803d",
  },

  badgeWarning: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 9999,
    background: "rgba(245,158,11,.1)",
    color: "#92400e",
  },

  badgeInfo: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 9999,
    background: "rgba(59,130,246,.1)",
    color: "#1d4ed8",
  },

  badgeTeal: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 9999,
    background: "rgba(26,58,58,.1)",
    color: "#1a3a3a",
  },

  transcriptArea: {
    flex: 1,
    overflowY: "auto",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#faf5e8",
  },

  doctorLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
    color: "#1a3a3a",
  },

  patientLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
    color: "#ff4d8b",
  },

  doctorBubble: {
    maxWidth: "85%",
    padding: "10px 14px",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    fontSize: 14,
    lineHeight: 1.5,
    background: "#fff",
    border: "1px solid #e5e5e5",
    alignSelf: "flex-start",
  },

  patientBubble: {
    maxWidth: "85%",
    padding: "10px 14px",
    borderRadius: 16,
    borderBottomRightRadius: 4,
    fontSize: 14,
    lineHeight: 1.5,
    background: "rgba(255,77,139,.08)",
    border: "1px solid rgba(255,77,139,.2)",
    alignSelf: "flex-end",
  },

  liveCmd: {
    padding: "12px 20px",
    borderTop: "1px solid #e5e5e5",
    background: "#faf5e8",
  },

  liveCmdRow: {
    display: "flex",
    gap: 8,
  },

  liveCmdInput: {
    flex: 1,
    border: "1px solid #e5e5e5",
    borderRadius: 9999,
    padding: "8px 16px",
    fontSize: 13,
    fontFamily: "'Space Mono', monospace",
    background: "#fff",
    outline: "none",
  },

  cmdResult: {
    marginTop: 8,
    padding: "8px 12px",
    background: "#f5f0e0",
    borderRadius: 8,
    fontSize: 13,
    color: "#3a3a3a",
  },

  emergencyToggle: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 20px",
    background: "rgba(239,68,68,.05)",
    borderTop: "1px solid rgba(239,68,68,.15)",
  },

  emergencyToggleActive: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 20px",
    background: "rgba(239,68,68,.12)",
    borderTop: "1px solid rgba(239,68,68,.15)",
  },

  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 9999,
    background: "#e5e5e5",
    cursor: "pointer",
    position: "relative",
    transition: "background .2s",
  },

  toggleTrackOn: {
    width: 44,
    height: 24,
    borderRadius: 9999,
    background: "#ef4444",
    cursor: "pointer",
    position: "relative",
    transition: "background .2s",
  },

  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "#fff",
    position: "absolute",
    top: 3,
    left: 3,
    transition: "transform .2s",
    boxShadow: "0 1px 4px rgba(0,0,0,.2)",
  },

  toggleThumbOn: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "#fff",
    position: "absolute",
    top: 3,
    left: 3,
    transform: "translateX(20px)",
    transition: "transform .2s",
    boxShadow: "0 1px 4px rgba(0,0,0,.2)",
  },

  emergencyLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#ef4444",
  },

  emergencyLog: {
    background: "#fff",
    border: "1px solid rgba(239,68,68,.2)",
    borderRadius: 12,
    padding: 12,
    margin: "0 20px 12px",
    fontSize: 13,
    color: "#ef4444",
    maxHeight: 120,
    overflowY: "auto",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
  },

  recControls: {
    padding: "16px 20px",
    borderTop: "1px solid #e5e5e5",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  recButtonRecord: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    background: "#ef4444",
    color: "#fff",
  },

  recButtonStop: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "1px solid #e5e5e5",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    background: "#f5f0e0",
    color: "#0a0a0a",
  },

  recTimer: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 1,
  },

  recStatus: {
    fontSize: 13,
    color: "#6a6a6a",
  },

  soapPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  soapHeader: {
    padding: "16px 20px",
    borderBottom: "1px solid #e5e5e5",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  soapSection: {
    padding: "16px 20px",
    borderBottom: "1px solid #e5e5e5",
  },

  soapLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#6a6a6a",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  soapInput: {
    width: "100%",
    minHeight: 80,
    border: "1px solid #e5e5e5",
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 14,
    fontFamily: "'Space Mono', monospace",
    background: "#fffaf0",
    resize: "vertical",
    outline: "none",
    lineHeight: 1.5,
  },

  soapActions: {
    display: "flex",
    gap: 8,
    borderTop: "1px solid #e5e5e5",
    padding: "16px 20px",
    marginTop: "auto",
  },

  notif: {
    position: "fixed",
    bottom: 24,
    right: 24,
    background: "#0a0a0a",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 12,
    fontSize: 14,
    zIndex: 300,
    opacity: 1,
  },
};

export default function EncounterPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const params = useParams();

  const encounterId = params?.encounter_id || "new";

  const patientNameMap = {
    new: "Bệnh nhân mới",
    0: "Nguyễn Văn B",
    1: "Trần Thị C",
    2: "Lê Văn D",
    3: "Phạm Thị E",
  };

  const [patientName] = useState(
    patientNameMap[encounterId] || "Bệnh nhân mới",
  );
  const [encounterTime] = useState(() => new Date().toLocaleString("vi-VN"));

  const [isRecording, setIsRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const [recStatus, setRecStatus] = useState("Sẵn sàng ghi âm");

  const [encStatus, setEncStatus] = useState({
    style: sx.badgeInfo,
    text: "Sẵn sàng",
  });

  const [transcriptItems, setTranscriptItems] = useState([]);

  const [soapS, setSoapS] = useState("");
  const [soapO, setSoapO] = useState("");
  const [soapA, setSoapA] = useState("");
  const [soapP, setSoapP] = useState("");

  const [soapStatus, setSoapStatus] = useState({
    style: sx.badgeWarning,
    text: "Đang soạn",
  });

  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyLog, setEmergencyLog] = useState("");

  const [cmdInput, setCmdInput] = useState("");
  const [cmdResult, setCmdResult] = useState("");
  const [notif, setNotif] = useState("");

  const fileInputRef = useRef(null);
  const recIntervalRef = useRef(null);
  const recDemoTimeoutRef = useRef(null);
  const notifTimeoutRef = useRef(null);
  const demoIdxRef = useRef(0);
  const isRecordingRef = useRef(false);
  const isEmergencyRef = useRef(false);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  useEffect(() => {
    isEmergencyRef.current = isEmergency;
  }, [isEmergency]);

  useEffect(() => {
    return () => {
      clearInterval(recIntervalRef.current);
      clearTimeout(recDemoTimeoutRef.current);
      clearTimeout(notifTimeoutRef.current);
    };
  }, []);

  if (!user) return null;

  function showNotif(message) {
    setNotif(message);
    clearTimeout(notifTimeoutRef.current);
    notifTimeoutRef.current = setTimeout(() => setNotif(""), 3000);
  }

  function toggleRecording() {
    if (isRecordingRef.current) stopRecording();
    else startRecording();
  }

  function startRecording() {
    setIsRecording(true);
    isRecordingRef.current = true;

    setRecSeconds(0);
    setRecStatus("● Đang ghi âm");

    setEncStatus({
      style: sx.badgeSuccess,
      text: "● Đang ghi âm",
    });

    clearInterval(recIntervalRef.current);

    recIntervalRef.current = setInterval(() => {
      setRecSeconds((prev) => prev + 1);
    }, 1000);

    simulateTranscript();
  }

  function stopRecording() {
    setIsRecording(false);
    isRecordingRef.current = false;

    clearInterval(recIntervalRef.current);
    clearTimeout(recDemoTimeoutRef.current);

    setRecStatus("Đã dừng ghi âm");

    setEncStatus({
      style: sx.badgeInfo,
      text: "■ Đã dừng",
    });

    showNotif("Ghi âm đã dừng. Có thể tạo SOAP Note.");
  }

  function simulateTranscript() {
    demoIdxRef.current = 0;
    setTranscriptItems([]);

    function addLine() {
      if (!isRecordingRef.current || demoIdxRef.current >= demoLines.length)
        return;

      const line = demoLines[demoIdxRef.current];
      demoIdxRef.current += 1;

      setTranscriptItems((prev) => [...prev, line]);

      if (isEmergencyRef.current) {
        const ts = new Date().toLocaleTimeString("vi-VN");
        const speaker = line.role === "doctor" ? "BS" : "BN";

        setEmergencyLog((prev) => `${prev}[${ts}] ${speaker}: ${line.text}\n`);
      }

      if (demoIdxRef.current < demoLines.length) {
        recDemoTimeoutRef.current = setTimeout(
          addLine,
          1800 + Math.random() * 1000,
        );
      } else {
        recDemoTimeoutRef.current = setTimeout(() => {
          if (isRecordingRef.current) autoFillSOAP();
        }, 800);
      }
    }

    recDemoTimeoutRef.current = setTimeout(addLine, 1000);
  }

  function autoFillSOAP() {
    setSoapS(
      "Bệnh nhân tự mô tả: đau đầu và sốt từ tối qua (38.5°C), ho ít, chảy nước mũi trong. Có tiếp xúc với người bị cảm cúm ngày hôm trước.",
    );

    setSoapO(
      "Nhiệt độ: 38.5°C\nMạch: Chưa đo (đang ghi âm)\nHuyết áp: Chưa đo\nSPO2: Chưa đo\nKhám họng: Đang thực hiện",
    );

    setSoapA(
      "Nghi ngờ: Cảm cúm thông thường (J11.1)\nChẩn đoán phân biệt: Viêm mũi họng cấp (J06.9)",
    );

    setSoapP(
      "Điều trị triệu chứng\nParacetamol 500mg × 3/ngày\nVitamin C 1000mg × 1/ngày\nNghỉ ngơi, uống nhiều nước\nTái khám sau 3 ngày nếu không cải thiện",
    );

    setSoapStatus({
      style: sx.badgeSuccess,
      text: "AI đã điền",
    });

    showNotif("✅ SOAP Note đã được tự động điền từ transcript!");
  }

  function generateSOAP() {
    if (transcriptItems.length === 0) {
      showNotif("⚠️ Chưa có transcript. Hãy ghi âm trước.");
      return;
    }

    setSoapStatus({
      style: sx.badgeWarning,
      text: "Đang tạo...",
    });

    setTimeout(autoFillSOAP, 1200);
  }

  function saveSOAP() {
    if (!soapS.trim()) {
      showNotif("⚠️ Vui lòng điền ít nhất phần Subjective");
      return;
    }

    setSoapStatus({
      style: sx.badgeTeal,
      text: "Đã lưu",
    });

    showNotif("✅ SOAP Note đã lưu thành công!");
  }

  function endEncounter() {
    if (!soapS.trim()) {
      showNotif("⚠️ Hãy tạo SOAP Note trước khi kết thúc");
      return;
    }

    if (isRecordingRef.current) stopRecording();

    setTimeout(() => {
      showNotif("📋 Ca khám kết thúc. Đang tạo giấy ra viện...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 300);
  }

  function uploadAudio() {
    fileInputRef.current?.click();
  }

  function handleAudioFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    showNotif(`📁 Đã upload: ${file.name} — Đang phân tích...`);

    setEncStatus({
      style: sx.badgeWarning,
      text: "⏳ Đang xử lý...",
    });

    setIsRecording(true);
    isRecordingRef.current = true;

    setTimeout(() => {
      setIsRecording(false);
      isRecordingRef.current = false;
      simulateTranscriptFromFile();
    }, 2000);
  }

  function simulateTranscriptFromFile() {
    setTranscriptItems([]);
    demoIdxRef.current = 0;

    function addLine() {
      if (demoIdxRef.current >= demoLines.length) {
        autoFillSOAP();

        setEncStatus({
          style: sx.badgeSuccess,
          text: "✓ Hoàn thành",
        });

        return;
      }

      const line = demoLines[demoIdxRef.current];
      demoIdxRef.current += 1;

      setTranscriptItems((prev) => [...prev, line]);
      recDemoTimeoutRef.current = setTimeout(addLine, 400);
    }

    addLine();
  }

  function toggleEmergency() {
    const next = !isEmergency;

    setIsEmergency(next);
    isEmergencyRef.current = next;

    if (next) {
      const ts = new Date().toLocaleTimeString("vi-VN");

      setEmergencyLog(
        `[${ts}] ⚠️ CHẾ ĐỘ CẤP CỨU ĐƯỢC KÍCH HOẠT\n[${ts}] Đang log y lệnh khẩn cấp...\n`,
      );

      showNotif("🚨 Chế độ cấp cứu đã bật — Đang log y lệnh");
    } else {
      showNotif("Chế độ cấp cứu đã tắt — Trở về SOAP mode");
    }
  }

  function runCmd() {
    const val = cmdInput.trim().toLowerCase();
    if (!val) return;

    setCmdResult("⏳ Agent đang xử lý...");

    setTimeout(() => {
      let found = null;

      for (const [key, res] of Object.entries(agentResponses)) {
        if (val.includes(key)) {
          found = res;
          break;
        }
      }

      setCmdResult(
        found ||
          `🤖 Agent: Đã nhận lệnh "${val}". Đang thực thi... (API chưa kết nối)`,
      );

      showNotif("Agent đã phản hồi");
    }, 800);

    setCmdInput("");
  }

  function voiceCmd() {
    showNotif("🎤 Đang nghe lệnh giọng nói...");

    setTimeout(() => {
      setCmdInput("Kiểm tra BHYT bệnh nhân");
      showNotif("Nhận được lệnh giọng nói");
    }, 1500);
  }

  return (
    <div style={sx.page}>
      <div style={sx.encounterLayout}>
        <div style={sx.encounterLeft}>
          <div style={sx.encHeader}>
            <button
              style={sx.ghostButton}
              onClick={() => router.push("/dashboard")}
            >
              ← Quay lại
            </button>

            <div>
              <div style={sx.encTitle}>Bệnh nhân: {patientName}</div>
              <div style={sx.encMeta}>
                CA KHÁM #{encounterId} · {encounterTime}
              </div>
            </div>

            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <span style={encStatus.style}>{encStatus.text}</span>

              <button style={sx.secondaryButton} onClick={uploadAudio}>
                ⬆ Upload
              </button>

              <button style={sx.primaryButton} onClick={endEncounter}>
                ✓ Kết thúc
              </button>
            </div>
          </div>

          <div style={sx.transcriptArea}>
            {transcriptItems.length === 0 ? (
              <div style={{ textAlign: "center", padding: 20 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🎙️</div>
                <p style={{ fontSize: 14, color: "#6a6a6a" }}>
                  Nhấn <b>Ghi âm</b> để bắt đầu hoặc <b>Upload</b> file âm thanh
                </p>
              </div>
            ) : (
              transcriptItems.map((line, index) => (
                <div
                  key={`${line.role}-${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      line.role === "doctor" ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    style={
                      line.role === "doctor" ? sx.doctorLabel : sx.patientLabel
                    }
                  >
                    {line.role === "doctor" ? "👨‍⚕️ Bác sĩ" : "👤 Bệnh nhân"}
                  </div>

                  <div
                    style={
                      line.role === "doctor"
                        ? sx.doctorBubble
                        : sx.patientBubble
                    }
                  >
                    {line.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={sx.liveCmd}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                color: "#6a6a6a",
                marginBottom: 6,
                textTransform: "uppercase",
              }}
            >
              Lệnh Agent
            </div>

            <div style={sx.liveCmdRow}>
              <input
                style={sx.liveCmdInput}
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                placeholder='Ví dụ: "Tìm lịch sử bệnh án", "Kiểm tra BHYT"...'
                onKeyDown={(e) => {
                  if (e.key === "Enter") runCmd();
                }}
              />

              <button style={sx.secondaryButton} onClick={runCmd}>
                Gửi
              </button>

              <button style={sx.secondaryButton} onClick={voiceCmd}>
                🎤
              </button>
            </div>

            {cmdResult && <div style={sx.cmdResult}>{cmdResult}</div>}
          </div>

          <div
            style={isEmergency ? sx.emergencyToggleActive : sx.emergencyToggle}
          >
            <div
              style={isEmergency ? sx.toggleTrackOn : sx.toggleTrack}
              onClick={toggleEmergency}
            >
              <div style={isEmergency ? sx.toggleThumbOn : sx.toggleThumb} />
            </div>

            <span style={sx.emergencyLabel}>🚑 Chế độ Cấp cứu</span>

            <span
              style={{
                marginLeft: "auto",
                fontSize: 12,
                color: isEmergency ? "#ef4444" : "#6a6a6a",
              }}
            >
              {isEmergency ? "BẬT" : "TẮT"}
            </span>
          </div>

          {isEmergency && <pre style={sx.emergencyLog}>{emergencyLog}</pre>}

          <div style={sx.recControls}>
            <button
              style={isRecording ? sx.recButtonRecord : sx.recButtonStop}
              onClick={toggleRecording}
            >
              {isRecording ? "■" : "🎙️"}
            </button>

            <div>
              <div style={sx.recTimer}>{formatTimer(recSeconds)}</div>
              <div style={sx.recStatus}>{recStatus}</div>
            </div>

            <div style={{ marginLeft: "auto" }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,video/*"
                style={{ display: "none" }}
                onChange={handleAudioFile}
              />
            </div>
          </div>
        </div>

        {!isEmergency && (
          <div style={sx.encounterRight}>
            <div style={sx.soapPanel}>
              <div style={sx.soapHeader}>
                <span style={{ fontSize: 18, color: "#1a3a3a" }}>📝</span>
                <span style={{ fontWeight: 600, fontSize: 15 }}>SOAP Note</span>
                <span style={{ ...soapStatus.style, marginLeft: "auto" }}>
                  {soapStatus.text}
                </span>
              </div>

              <div style={{ flex: 1, overflowY: "auto" }}>
                <div style={sx.soapSection}>
                  <div style={sx.soapLabel}>
                    <span
                      style={{
                        color: "#1a3a3a",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      S
                    </span>
                    Subjective — Triệu chứng
                  </div>

                  <textarea
                    style={sx.soapInput}
                    value={soapS}
                    onChange={(e) => setSoapS(e.target.value)}
                    placeholder="Bệnh nhân mô tả triệu chứng, lý do đến khám..."
                  />
                </div>

                <div style={sx.soapSection}>
                  <div style={sx.soapLabel}>
                    <span
                      style={{
                        color: "#ff4d8b",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      O
                    </span>
                    Objective — Khám lâm sàng
                  </div>

                  <textarea
                    style={sx.soapInput}
                    value={soapO}
                    onChange={(e) => setSoapO(e.target.value)}
                    placeholder="Kết quả khám: nhiệt độ, huyết áp, mạch, SpO2..."
                  />
                </div>

                <div style={sx.soapSection}>
                  <div style={sx.soapLabel}>
                    <span
                      style={{
                        color: "#e8b94a",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      A
                    </span>
                    Assessment — Chẩn đoán
                  </div>

                  <textarea
                    style={sx.soapInput}
                    value={soapA}
                    onChange={(e) => setSoapA(e.target.value)}
                    placeholder="Chẩn đoán sơ bộ, chẩn đoán phân biệt..."
                  />
                </div>

                <div style={sx.soapSection}>
                  <div style={sx.soapLabel}>
                    <span
                      style={{
                        color: "#b8a4ed",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      P
                    </span>
                    Plan — Kế hoạch điều trị
                  </div>

                  <textarea
                    style={sx.soapInput}
                    value={soapP}
                    onChange={(e) => setSoapP(e.target.value)}
                    placeholder="Phác đồ điều trị, xét nghiệm cần làm, kê đơn..."
                  />
                </div>
              </div>

              <div style={sx.soapActions}>
                <button
                  style={{ ...sx.secondaryButton, flex: 1, height: 40 }}
                  onClick={generateSOAP}
                >
                  ✨ Tạo AI
                </button>

                <button
                  style={{ ...sx.primaryButton, flex: 1, height: 40 }}
                  onClick={saveSOAP}
                >
                  💾 Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {notif && <div style={sx.notif}>{notif}</div>}
    </div>
  );
}
