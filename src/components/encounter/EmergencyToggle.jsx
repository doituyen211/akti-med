/**
 * Nút gạt đỏ chuyển sang chế độ cấp cứu.
 * Khi bật: ẩn SOAP panel, hiện blackbox log, ngắt tool calling.
 */

"use client";

import { useEncounterStore } from "../../app/store";
import { useNotifStore } from "../../app/store";

export default function EmergencyToggle() {
  const { isEmergencyMode, emergencyLog, toggleEmergencyMode } =
    useEncounterStore();
  const { showNotif } = useNotifStore();

  function handleToggle() {
    toggleEmergencyMode();
    if (!isEmergencyMode) {
      showNotif("🚨 Chế độ cấp cứu đã bật — Đang log y lệnh", "error");
    } else {
      showNotif("Chế độ cấp cứu đã tắt — Trở về SOAP mode", "info");
    }
  }

  return (
    <>
      {/* Toggle row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 20px",
          background: isEmergencyMode
            ? "rgba(239,68,68,.1)"
            : "rgba(239,68,68,.04)",
          borderTop: `1px solid ${isEmergencyMode ? "rgba(239,68,68,.3)" : "rgba(239,68,68,.12)"}`,
          transition: "all 0.2s",
        }}
      >
        {/* Switch track */}
        <div
          onClick={handleToggle}
          style={{
            width: 44,
            height: 24,
            borderRadius: 9999,
            background: isEmergencyMode ? "#ef4444" : "#e5e5e5",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >
          {/* Thumb */}
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#fff",
              position: "absolute",
              top: 3,
              left: isEmergencyMode ? 23 : 3,
              transition: "left 0.2s",
              boxShadow: "0 1px 4px rgba(0,0,0,.2)",
            }}
          />
        </div>

        {/* Label */}
        <span style={{ fontSize: 13, fontWeight: 600, color: "#ef4444" }}>
          <i className="ti ti-ambulance" style={{ marginRight: 4 }} />
          Chế độ Cấp cứu
        </span>

        {/* Status text */}
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "1px",
            color: isEmergencyMode ? "#ef4444" : "#9a9a9a",
          }}
        >
          {isEmergencyMode ? "BẬT" : "TẮT"}
        </span>
      </div>

      {/* Emergency log — chỉ hiện khi đang bật */}
      {isEmergencyMode && (
        <div
          style={{
            margin: "0 20px 10px",
            padding: 12,
            background: "#fff",
            border: "1px solid rgba(239,68,68,.2)",
            borderRadius: 8,
            fontSize: 12,
            color: "#ef4444",
            maxHeight: 120,
            overflowY: "auto",
            fontFamily: "monospace",
            lineHeight: 1.7,
          }}
        >
          {/* Header line */}
          <div>
            [{new Date().toLocaleTimeString("vi-VN")}] ⚠️ CHẾ ĐỘ CẤP CỨU ĐƯỢC
            KÍCH HOẠT
          </div>
          <div>
            [{new Date().toLocaleTimeString("vi-VN")}] Đang log y lệnh khẩn
            cấp...
          </div>

          {/* Log entries từ store */}
          {emergencyLog.map((entry) => (
            <div key={entry.id}>
              [{entry.timestamp}] {entry.speaker === "doctor" ? "BS" : "BN"}:{" "}
              {entry.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
