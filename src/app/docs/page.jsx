/**
 * Trang tài liệu kỹ thuật — có sidebar navigation theo section.
 */

"use client";

import { useState } from "react";

export const dynamic = "force-dynamic"; // tắt static gen vì có useState

const DOC_SECTIONS = [
  { id: "start", label: "Bắt đầu" },
  { id: "api", label: "API Reference" },
  { id: "soap", label: "SOAP Note" },
  { id: "agent", label: "Agent Tools" },
  { id: "webhook", label: "Webhooks" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("start");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 40,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "48px 32px",
      }}
    >
      {/* ── Sidebar nav ── */}
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "#9a9a9a",
            marginBottom: 12,
          }}
        >
          Tài liệu
        </div>
        {DOC_SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              fontSize: 14,
              padding: "7px 10px",
              borderRadius: 8,
              border: "none",
              fontFamily: "Space Mono",
              cursor: "pointer",
              marginBottom: 2,
              background: activeSection === s.id ? "#f5f0e0" : "transparent",
              color: activeSection === s.id ? "#0a0a0a" : "#6a6a6a",
              fontWeight: activeSection === s.id ? 600 : 400,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div>
        {activeSection === "start" && <SectionStart />}
        {activeSection === "api" && <SectionApi />}
        {activeSection === "soap" && <SectionSoap />}
        {activeSection === "agent" && <SectionAgent />}
        {activeSection === "webhook" && <SectionWebhook />}
      </div>
    </div>
  );
}

// ── Shared style helpers ──────────────────────────────────────────────────────
function H1({ children }) {
  return (
    <h1
      style={{
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: "-1px",
        marginBottom: 8,
      }}
    >
      {children}
    </h1>
  );
}
function H2({ children }) {
  return (
    <h2
      style={{
        fontSize: 22,
        fontWeight: 700,
        marginBottom: 12,
        marginTop: 32,
      }}
    >
      {children}
    </h2>
  );
}
function P({ children }) {
  return (
    <p
      style={{
        fontSize: 15,
        color: "#3a3a3a",
        lineHeight: 1.7,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}
function Code({ children }) {
  return (
    <div
      style={{
        background: "#0a1a1a",
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        fontSize: 13,
        color: "#a4d4c5",
        overflow: "auto",
        lineHeight: 1.7,
      }}
    >
      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{children}</pre>
    </div>
  );
}
function EndpointCard({ method, path, desc }) {
  const colors = {
    POST: "#22c55e",
    GET: "#3b82f6",
    PATCH: "#f59e0b",
    DELETE: "#ef4444",
  };
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 9999,
            background: `${colors[method]}18`,
            color: colors[method],
          }}
        >
          {method}
        </span>
        <code style={{ fontSize: 14, color: "#0a0a0a" }}>{path}</code>
      </div>
      <p style={{ fontSize: 13, color: "#9a9a9a", margin: 0 }}>{desc}</p>
    </div>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────
function SectionStart() {
  return (
    <>
      <H1>Bắt đầu nhanh</H1>
      <p style={{ fontSize: 15, color: "#9a9a9a", marginBottom: 32 }}>
        Tích hợp MediScribeAI vào hệ thống của bạn trong 10 phút.
      </p>
      <H2>1. Lấy API Key</H2>
      <P>Sau khi đăng ký, vào Dashboard → Settings → API Keys để tạo key.</P>
      <Code>{`# Cài đặt SDK
npm install @mediscribe/sdk

# Hoặc dùng curl trực tiếp
curl https://api.mediscribe.ai/v1/sessions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</Code>

      <H2>2. Tạo phiên ghi âm</H2>
      <Code>{`POST /v1/sessions
{
  "patient_id": "pt_123",
  "doctor_id":  "dr_456",
  "language":   "vi",
  "consent_confirmed": true
}`}</Code>

      <H2>3. Stream audio và nhận transcript</H2>
      <P>Kết nối WebSocket tới endpoint trả về để nhận transcript realtime:</P>
      <Code>{`const ws = new WebSocket(
  "wss://api.mediscribe.ai/ws/sessions/sess_xxx/stream",
  { headers: { Authorization: "Bearer YOUR_API_KEY" } }
);

ws.onmessage = (event) => {
  const { speaker, text, is_final } = JSON.parse(event.data);
  console.log(\`[\${speaker}]: \${text}\`);
};`}</Code>

      <H2>4. Tạo SOAP Note</H2>
      <Code>{`POST /v1/sessions/sess_xxx/soap
# Không cần body — LLM tự phân tích transcript
# Response: SOAPNote object (xem schema ở tab SOAP Note)`}</Code>
    </>
  );
}

function SectionApi() {
  return (
    <>
      <H1>API Reference</H1>
      <p style={{ fontSize: 15, color: "#9a9a9a", marginBottom: 32 }}>
        Base URL:{" "}
        <code
          style={{
            background: "#f5f0e0",
            padding: "2px 8px",
            borderRadius: 6,
            fontSize: 14,
          }}
        >
          https://api.mediscribe.ai/v1
        </code>
      </p>

      <H2>Authentication</H2>
      <P>
        Tất cả requests cần header:{" "}
        <code>Authorization: Bearer YOUR_API_KEY</code>
      </P>

      <H2>Sessions</H2>
      <EndpointCard
        method="POST"
        path="/sessions"
        desc="Tạo phiên ghi âm mới"
      />
      <EndpointCard
        method="GET"
        path="/sessions/{id}"
        desc="Lấy thông tin phiên"
      />
      <EndpointCard
        method="PATCH"
        path="/sessions/{id}"
        desc="Cập nhật trạng thái phiên"
      />
      <EndpointCard
        method="GET"
        path="/sessions/{id}/transcript"
        desc="Lấy transcript đầy đủ"
      />

      <H2>SOAP Notes</H2>
      <EndpointCard
        method="POST"
        path="/sessions/{id}/soap/generate"
        desc="Tạo SOAP Note từ transcript (AI)"
      />
      <EndpointCard
        method="GET"
        path="/sessions/{id}/soap"
        desc="Lấy SOAP Note hiện tại"
      />
      <EndpointCard
        method="PATCH"
        path="/sessions/{id}/soap"
        desc="Cập nhật SOAP Note"
      />
      <EndpointCard
        method="POST"
        path="/sessions/{id}/soap/finalize"
        desc="Finalize và trigger background tasks"
      />

      <H2>Agent</H2>
      <EndpointCard
        method="POST"
        path="/agent/command"
        desc="Gửi lệnh ngôn ngữ tự nhiên tới Agent"
      />

      <H2>Patients</H2>
      <EndpointCard
        method="GET"
        path="/patients/search"
        desc="Tìm kiếm bệnh nhân"
      />
      <EndpointCard
        method="GET"
        path="/patients/{id}"
        desc="Lấy hồ sơ bệnh nhân"
      />
      <EndpointCard
        method="GET"
        path="/patients/bhyt/{code}"
        desc="Kiểm tra tình trạng BHYT"
      />
    </>
  );
}

function SectionSoap() {
  return (
    <>
      <H1>SOAP Note Schema</H1>
      <P>
        Cấu trúc JSON đầy đủ của một SOAP Note — mapping với Pydantic model trên
        FastAPI.
      </P>
      <Code>{`{
  "id":           "soap_xxx",
  "encounter_id": "sess_xxx",

  "subjective": "Bệnh nhân mô tả: đau đầu, sốt 38.5°C...",

  "objective": {
    "vitals": {
      "temperature":      38.5,
      "blood_pressure":   "120/80",
      "heart_rate":       88,
      "respiratory_rate": 18,
      "spo2":             98,
      "weight":           65,
      "height":           168
    },
    "physical_exam": "Họng đỏ nhẹ, phổi thông khí đều",
    "lab_results":   null
  },

  "assessment": "Cảm cúm thông thường (J11.1)\\nDD: Viêm mũi họng (J06.9)",
  "plan":       "Paracetamol 500mg × 3/ngày\\nVitamin C 1000mg...",

  "icd10_codes":    ["J11.1"],
  "status":         "ai-generated",
  "ai_confidence":  0.94,

  "created_at": "2025-06-04T09:32:00Z",
  "updated_at": "2025-06-04T09:35:00Z"
}`}</Code>

      <H2>Status values</H2>
      {[
        ["draft", "Mới tạo, chưa có AI"],
        ["ai-generated", "AI đã điền, chờ bác sĩ review"],
        ["reviewed", "Bác sĩ đã xem qua"],
        ["finalized", "Đã lưu, kích hoạt background tasks"],
      ].map(([s, d]) => (
        <div
          key={s}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <code
            style={{
              background: "#f5f0e0",
              padding: "2px 8px",
              borderRadius: 6,
              fontSize: 13,
              minWidth: 120,
            }}
          >
            {s}
          </code>
          <span style={{ fontSize: 14, color: "#6a6a6a" }}>{d}</span>
        </div>
      ))}
    </>
  );
}

function SectionAgent() {
  return (
    <>
      <H1>Agent Tools</H1>
      <P>
        Agent hỗ trợ các lệnh tự nhiên bằng tiếng Việt thông qua LangGraph tool
        calling.
      </P>

      <H2>Cách gửi lệnh</H2>
      <Code>{`POST /v1/agent/command
{
  "encounter_id": "sess_xxx",
  "command":      "Tìm lịch sử bệnh án của bệnh nhân"
}

// Response
{
  "tool_name":   "search_medical_history",
  "result":      "Tìm thấy 12 lần khám...",
  "executed_at": "2025-06-04T09:33:00Z"
}`}</Code>

      <H2>Danh sách lệnh hỗ trợ</H2>
      {[
        [
          '"Tìm lịch sử bệnh án"',
          "search_medical_history",
          "Truy xuất hồ sơ bệnh nhân từ EMR",
        ],
        [
          '"Kiểm tra BHYT"',
          "check_bhyt_status",
          "Tra cứu thông tin bảo hiểm y tế",
        ],
        [
          '"Đặt lịch xét nghiệm X-quang"',
          "create_radiology_order",
          "Tạo yêu cầu chụp X-quang",
        ],
        ['"Xét nghiệm máu CBC"', "create_lab_order", "Tạo phiếu xét nghiệm"],
        [
          '"Chuyển bệnh nhân đi ICU"',
          "update_emr_status",
          "Cập nhật trạng thái trong EMR",
        ],
        [
          '"In giấy ra viện"',
          "generate_discharge_doc",
          "Tạo giấy ra viện và gửi lệnh in",
        ],
      ].map(([cmd, tool, desc]) => (
        <div
          key={tool}
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            padding: 14,
            marginBottom: 8,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
            {cmd}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <code
              style={{
                fontSize: 12,
                color: "#1a3a3a",
                background: "rgba(26,58,58,.08)",
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              {tool}
            </code>
            <span style={{ fontSize: 13, color: "#9a9a9a" }}>{desc}</span>
          </div>
        </div>
      ))}

      <H2>Emergency Mode</H2>
      <P>
        Khi bật Emergency Toggle, Agent ngừng tool calling hoàn toàn. Tất cả
        lệnh chỉ được ghi vào blackbox log để đảm bảo bác sĩ tập trung vào cấp
        cứu.
      </P>
    </>
  );
}

function SectionWebhook() {
  return (
    <>
      <H1>Webhooks</H1>
      <P>Nhận thông báo realtime khi các sự kiện xảy ra trong hệ thống.</P>

      <H2>Cấu hình webhook</H2>
      <P>Vào Dashboard → Settings → Webhooks để thêm endpoint URL của bạn.</P>

      <H2>Sự kiện hỗ trợ</H2>
      {[
        ["soap.completed", "SOAP Note đã được tạo bởi AI"],
        ["soap.finalized", "Bác sĩ đã lưu và finalize SOAP Note"],
        ["session.started", "Ca khám bắt đầu (consent đã xác nhận)"],
        ["session.ended", "Ca khám kết thúc"],
        ["emergency.activated", "Chế độ cấp cứu được bật"],
        ["discharge.generated", "Giấy ra viện đã được tạo"],
      ].map(([event, desc]) => (
        <div
          key={event}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 8,
            alignItems: "flex-start",
          }}
        >
          <code
            style={{
              fontSize: 13,
              background: "#f5f0e0",
              padding: "3px 10px",
              borderRadius: 6,
              flexShrink: 0,
            }}
          >
            {event}
          </code>
          <span style={{ fontSize: 14, color: "#6a6a6a", paddingTop: 3 }}>
            {desc}
          </span>
        </div>
      ))}

      <H2>Payload mẫu</H2>
      <Code>{`// POST your-endpoint.com/webhook
{
  "event":      "soap.completed",
  "session_id": "sess_xxx",
  "timestamp":  "2025-06-04T09:35:00Z",
  "data": {
    "soap": {
      "subjective": "...",
      "objective":  { "vitals": {} },
      "assessment": "...",
      "plan":       "..."
    }
  },
  "signature": "sha256=abc123..."  // HMAC-SHA256 để xác thực
}`}</Code>

      <H2>Xác thực webhook</H2>
      <Code>{`// Verify webhook signature (Node.js)
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return \`sha256=\${expected}\` === signature;
}`}</Code>
    </>
  );
}
