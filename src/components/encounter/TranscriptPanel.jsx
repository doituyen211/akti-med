/**
 * Khung phụ đề thời gian thực — hiển thị transcript segments
 * phân màu theo bác sĩ / bệnh nhân.
 */

"use client";

import { useEffect, useRef } from "react";
import { useEncounterStore } from "@/store";

export default function TranscriptPanel() {
  const { transcriptSegments, recordingStatus } = useEncounterStore();
  const bottomRef = useRef(null);

  // Auto-scroll xuống segment mới nhất
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcriptSegments]);

  const isEmpty = transcriptSegments.length === 0;

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: "#faf5e8",
      }}
    >
      {isEmpty ? (
        /* Empty state */
        <div
          style={{ textAlign: "center", padding: "40px 20px", margin: "auto" }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎙️</div>
          <p style={{ fontSize: 14, color: "#9a9a9a", lineHeight: 1.6 }}>
            Nhấn <strong>Ghi âm</strong> để bắt đầu hoặc <strong>Upload</strong>{" "}
            file âm thanh
          </p>
        </div>
      ) : (
        transcriptSegments.map((seg, idx) => {
          const isDoctor = seg.speaker === "doctor";
          const isLast = idx === transcriptSegments.length - 1;
          const isLive =
            isLast && recordingStatus === "recording" && !seg.isFinal;

          return (
            <div
              key={seg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isDoctor ? "flex-start" : "flex-end",
              }}
            >
              {/* Speaker label */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: isDoctor ? "#1a3a3a" : "#ff4d8b",
                  marginBottom: 3,
                }}
              >
                {isDoctor ? "👨‍⚕️ Bác sĩ" : "👤 Bệnh nhân"}
              </div>

              {/* Bubble */}
              <div
                style={{
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: 16,
                  fontSize: 14,
                  lineHeight: 1.5,
                  // Doctor: trái, trắng; Patient: phải, hồng nhạt
                  ...(isDoctor
                    ? {
                        background: "#fff",
                        border: "1px solid #e5e5e5",
                        borderBottomLeftRadius: 4,
                      }
                    : {
                        background: "rgba(255,77,139,.08)",
                        border: "1px solid rgba(255,77,139,.2)",
                        borderBottomRightRadius: 4,
                      }),
                }}
              >
                {seg.text}
                {/* Blinking cursor khi đang stream */}
                {isLive && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 14,
                      background: "#ff4d8b",
                      borderRadius: 1,
                      marginLeft: 4,
                      verticalAlign: "middle",
                      animation: "blink 0.8s step-end infinite",
                    }}
                  />
                )}
              </div>

              {/* Timestamp */}
              <div style={{ fontSize: 10, color: "#9a9a9a", marginTop: 2 }}>
                {formatSegmentTime(seg.startTime)}
              </div>
            </div>
          );
        })
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}

/** Chuyển giây → "00:00" */
function formatSegmentTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(Math.round(seconds) % 60).padStart(2, "0");
  return `${m}:${s}`;
}
