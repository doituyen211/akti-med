"use client";
import React, { useState } from "react";

/**
 * Documentation page. Provides a side navigation with multiple sections.
 * Clicking a navigation item displays the corresponding content. Sections
 * include a quick start, API reference, SOAP schema, agent tools and
 * webhook description.
 */
export default function DocsPage() {
  const [section, setSection] = useState("start");
  return (
    <div style={{ padding: "48px 32px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: 40,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <nav style={{ position: "sticky", top: 80, alignSelf: "flex-start" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#6a6a6a",
              marginBottom: 16,
            }}
          >
            Tài liệu
          </div>
          {[
            { id: "start", label: "Bắt đầu" },
            { id: "api", label: "API Reference" },
            { id: "soap", label: "SOAP Note" },
            { id: "agent", label: "Agent Tools" },
            { id: "webhook", label: "Webhooks" },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setSection(item.id)}
              style={{
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: 8,
                marginBottom: 4,
                fontSize: 14,
                color: section === item.id ? "#0a0a0a" : "#6a6a6a",
                background: section === item.id ? "#f5f0e0" : "transparent",
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>
        <div>
          {section === "start" && (
            <div>
              <h1
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 36,
                  fontWeight: 700,
                  letterSpacing: -1,
                  marginBottom: 8,
                }}
              >
                Bắt đầu nhanh
              </h1>
              <p style={{ fontSize: 15, color: "#6a6a6a", marginBottom: 32 }}>
                Tích hợp MediScribeAI vào hệ thống của bạn trong 10 phút.
              </p>
              <h2
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                1. Lấy API Key
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#3a3a3a",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                Sau khi đăng ký, vào Dashboard → Settings → API Keys để tạo key.
              </p>
              <div
                style={{
                  background: "#0a1a1a",
                  borderRadius: 8,
                  padding: 20,
                  marginBottom: 24,
                  fontFamily: "monospace",
                  fontSize: 13,
                  color: "#a0d4c5",
                  overflowX: "auto",
                }}
              >
                <span style={{ color: "#6a6a6a" }}># Cài đặt SDK</span>
                <br />
                npm install @mediscribe/sdk
                <br />
                <br />
                <span style={{ color: "#6a6a6a" }}># Hoặc dùng curl</span>
                <br />
                curl https://api.mediscribe.ai/v1/sessions
                <br />
                &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"
              </div>
              <h2
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                2. Tạo phiên ghi âm
              </h2>
              <div
                style={{
                  background: "#0a1a1a",
                  borderRadius: 8,
                  padding: 20,
                  marginBottom: 24,
                  fontFamily: "monospace",
                  fontSize: 13,
                  color: "#a0d4c5",
                  overflowX: "auto",
                }}
              >
                POST /v1/sessions
                <br />
                {"{"}
                <br />
                &nbsp;&nbsp;"patient_id": "pt_123",
                <br />
                &nbsp;&nbsp;"doctor_id": "dr_456",
                <br />
                &nbsp;&nbsp;"language": "vi"
                <br />
                {" }"}
              </div>
            </div>
          )}
          {section === "api" && (
            <div>
              <h1
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 36,
                  fontWeight: 700,
                  letterSpacing: -1,
                  marginBottom: 8,
                }}
              >
                API Reference
              </h1>
              <p style={{ fontSize: 15, color: "#6a6a6a", marginBottom: 32 }}>
                Base URL:{" "}
                <code
                  style={{
                    background: "#f5f0e0",
                    padding: "2px 8px",
                    borderRadius: 6,
                  }}
                >
                  https://api.mediscribe.ai/v1
                </code>
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(34,197,94,.1)",
                        color: "#15803d",
                        padding: "2px 6px",
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      POST
                    </span>
                    <code style={{ fontSize: 14 }}>/sessions</code>
                  </div>
                  <p style={{ fontSize: 13, color: "#6a6a6a" }}>
                    Tạo phiên ghi âm mới
                  </p>
                </div>
                <div
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(59,130,246,.1)",
                        color: "#1d4ed8",
                        padding: "2px 6px",
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      GET
                    </span>
                    <code style={{ fontSize: 14 }}>
                      /sessions/&#123;id&#125;/transcript
                    </code>
                  </div>
                  <p style={{ fontSize: 13, color: "#6a6a6a" }}>
                    Lấy transcript của phiên
                  </p>
                </div>
                <div
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(34,197,94,.1)",
                        color: "#15803d",
                        padding: "2px 6px",
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      POST
                    </span>
                    <code style={{ fontSize: 14 }}>
                      /sessions/&#123;id&#125;/soap
                    </code>
                  </div>
                  <p style={{ fontSize: 13, color: "#6a6a6a" }}>
                    Tạo SOAP Note từ transcript
                  </p>
                </div>
              </div>
            </div>
          )}
          {section === "soap" && (
            <div>
              <h1
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 36,
                  fontWeight: 700,
                  letterSpacing: -1,
                  marginBottom: 8,
                }}
              >
                SOAP Note Schema
              </h1>
              <div
                style={{
                  background: "#0a1a1a",
                  borderRadius: 8,
                  padding: 20,
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#a0d4c5",
                }}
              >
                {"{"}
                <br />
                &nbsp;&nbsp;"subjective": "string",
                <br />
                &nbsp;&nbsp;"objective":
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;"vitals": "temp":37.5,"bp":"120/80",
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;"exam": "string"
                <br />
                &nbsp;&nbsp;,
                <br />
                &nbsp;&nbsp;"assessment": "string",
                <br />
                &nbsp;&nbsp;"plan": "string",
                <br />
                &nbsp;&nbsp;"icd10": ["J06.9"],
                <br />
                &nbsp;&nbsp;"created_at": "ISO8601"
                <br />
              </div>
            </div>
          )}
          {section === "agent" && (
            <div>
              <h1
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 36,
                  fontWeight: 700,
                  letterSpacing: -1,
                  marginBottom: 8,
                }}
              >
                Agent Tools
              </h1>
              <p style={{ fontSize: 15, color: "#3a3a3a", lineHeight: 1.7 }}>
                Agent hỗ trợ các lệnh tự nhiên bằng tiếng Việt:
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 16,
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    background: "#f5f0e0",
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                >
                  <b>"Tìm lịch sử bệnh án"</b> → Truy xuất hồ sơ bệnh nhân từ
                  EMR
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    background: "#f5f0e0",
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                >
                  <b>"Kiểm tra BHYT"</b> → Tra cứu thông tin bảo hiểm y tế
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    background: "#f5f0e0",
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                >
                  <b>"Đặt lịch xét nghiệm X‑quang"</b> → Tạo yêu cầu xét nghiệm
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    background: "#f5f0e0",
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                >
                  <b>"In giấy ra viện"</b> → Tạo và gửi lệnh in tài liệu
                </div>
              </div>
            </div>
          )}
          {section === "webhook" && (
            <div>
              <h1
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 36,
                  fontWeight: 700,
                  letterSpacing: -1,
                  marginBottom: 8,
                }}
              >
                Webhooks
              </h1>
              <p style={{ fontSize: 15, color: "#3a3a3a", lineHeight: 1.7 }}>
                Nhận thông báo realtime khi SOAP Note hoàn thành.
              </p>
              <div
                style={{
                  background: "#0a1a1a",
                  borderRadius: 8,
                  padding: 20,
                  marginTop: 16,
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#a0d4c5",
                }}
              >
                POST your‑endpoint
                <br />
                {"{"}
                <br />
                &nbsp;&nbsp;"event": "soap.completed",
                <br />
                &nbsp;&nbsp;"session_id": "sess_xxx",
                <br />
                &nbsp;&nbsp;"soap": {"{...}"}
                <br />
                {" }"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
