export default function DocsPage() {
  return (
    <div class="page" id="page-docs">
      <div class="docs-grid">
        <div class="docs-nav">
          <div class="section-label">Tài liệu</div>
          <div
            class="docs-nav-item active"
            onclick="selectDocSection(this,'doc-start')"
          >
            Bắt đầu
          </div>
          <div class="docs-nav-item" onclick="selectDocSection(this,'doc-api')">
            API Reference
          </div>
          <div
            class="docs-nav-item"
            onclick="selectDocSection(this,'doc-soap')"
          >
            SOAP Note
          </div>
          <div
            class="docs-nav-item"
            onclick="selectDocSection(this,'doc-agent')"
          >
            Agent Tools
          </div>
          <div
            class="docs-nav-item"
            onclick="selectDocSection(this,'doc-webhook')"
          >
            Webhooks
          </div>
        </div>
        <div>
          <div id="doc-start">
            <h1 style="font-family:var(--font-display);font-size:36px;font-weight:700;letter-spacing:-1px;margin-bottom:8px">
              Bắt đầu nhanh
            </h1>
            <p style="font-size:15px;color:var(--muted);margin-bottom:32px">
              Tích hợp MediScribeAI vào hệ thống của bạn trong 10 phút.
            </p>
            <h2 style="font-family:var(--font-display);font-size:22px;font-weight:700;margin-bottom:12px">
              1. Lấy API Key
            </h2>
            <p style="font-size:15px;color:var(--body);line-height:1.7;margin-bottom:16px">
              Sau khi đăng ký, vào Dashboard → Settings → API Keys để tạo key.
            </p>
            <div style="background:var(--dark);border-radius:var(--r-md);padding:20px;margin-bottom:24px;font-family:monospace;font-size:13px;color:#a0d4c5;overflow-x:auto">
              <span style="color:var(--muted-soft)"># Cài đặt SDK</span>
              <br />
              npm install @mediscribe/sdk
              <br />
              <br />
              <span style="color:var(--muted-soft)"># Hoặc dùng curl</span>
              <br />
              curl https://api.mediscribe.ai/v1/sessions \<br />
              &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"
            </div>
            <h2 style="font-family:var(--font-display);font-size:22px;font-weight:700;margin-bottom:12px">
              2. Tạo phiên ghi âm
            </h2>
            <div style="background:var(--dark);border-radius:var(--r-md);padding:20px;margin-bottom:24px;font-family:monospace;font-size:13px;color:#a0d4c5;overflow-x:auto">
              POST /v1/sessions
              <br />
              <br />
              &nbsp;&nbsp;"patient_id": "pt_123",
              <br />
              &nbsp;&nbsp;"doctor_id": "dr_456",
              <br />
              &nbsp;&nbsp;"language": "vi"
              <br />
            </div>
          </div>
          <div id="doc-api" class="hidden">
            <h1 style="font-family:var(--font-display);font-size:36px;font-weight:700;letter-spacing:-1px;margin-bottom:8px">
              API Reference
            </h1>
            <p style="font-size:15px;color:var(--muted);margin-bottom:32px">
              Base URL:{" "}
              <code style="background:var(--cream-card);padding:2px 8px;border-radius:var(--r-sm)">
                https://api.mediscribe.ai/v1
              </code>
            </p>
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px">
                <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
                  <span class="badge badge-success">POST</span>
                  <code style="font-size:14px">/sessions</code>
                </div>
                <p style="font-size:13px;color:var(--muted)">
                  Tạo phiên ghi âm mới
                </p>
              </div>
              <div style="border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px">
                <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
                  <span class="badge badge-info">GET</span>
                  <code style="font-size:14px">
                    /sessions/{"{id}"}/transcript
                  </code>
                </div>
                <p style="font-size:13px;color:var(--muted)">
                  Lấy transcript của phiên
                </p>
              </div>
              <div style="border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px">
                <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
                  <span class="badge badge-success">POST</span>
                  <code style="font-size:14px">/sessions/{"{id}"}/soap</code>
                </div>
                <p style="font-size:13px;color:var(--muted)">
                  Tạo SOAP Note từ transcript
                </p>
              </div>
            </div>
          </div>
          <div id="doc-soap" class="hidden">
            <h1 style="font-family:var(--font-display);font-size:36px;font-weight:700;letter-spacing:-1px;margin-bottom:8px">
              SOAP Note Schema
            </h1>
            <div style="background:var(--dark);border-radius:var(--r-md);padding:20px;font-family:monospace;font-size:12px;color:#a0d4c5">
              <br />
              &nbsp;&nbsp;"subjective": "string",
              <br />
              &nbsp;&nbsp;"objective": <br />
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
          <div id="doc-agent" class="hidden">
            <h1 style="font-family:var(--font-display);font-size:36px;font-weight:700;letter-spacing:-1px;margin-bottom:8px">
              Agent Tools
            </h1>
            <p style="font-size:15px;color:var(--body);line-height:1.7">
              Agent hỗ trợ các lệnh tự nhiên bằng tiếng Việt:
            </p>
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:16px">
              <div style="padding:12px 16px;background:var(--cream-card);border-radius:var(--r-md);font-size:14px">
                <b>"Tìm lịch sử bệnh án"</b> → Truy xuất hồ sơ bệnh nhân từ EMR
              </div>
              <div style="padding:12px 16px;background:var(--cream-card);border-radius:var(--r-md);font-size:14px">
                <b>"Kiểm tra BHYT"</b> → Tra cứu thông tin bảo hiểm y tế
              </div>
              <div style="padding:12px 16px;background:var(--cream-card);border-radius:var(--r-md);font-size:14px">
                <b>"Đặt lịch xét nghiệm X-quang"</b> → Tạo yêu cầu xét nghiệm
              </div>
              <div style="padding:12px 16px;background:var(--cream-card);border-radius:var(--r-md);font-size:14px">
                <b>"In giấy ra viện"</b> → Tạo và gửi lệnh in tài liệu
              </div>
            </div>
          </div>
          <div id="doc-webhook" class="hidden">
            <h1 style="font-family:var(--font-display);font-size:36px;font-weight:700;letter-spacing:-1px;margin-bottom:8px">
              Webhooks
            </h1>
            <p style="font-size:15px;color:var(--body);line-height:1.7">
              Nhận thông báo realtime khi SOAP Note hoàn thành.
            </p>
            <div style="background:var(--dark);border-radius:var(--r-md);padding:20px;margin-top:16px;font-family:monospace;font-size:12px;color:#a0d4c5">
              POST your-endpoint
              <br />
              <br />
              &nbsp;&nbsp;"event": "soap.completed",
              <br />
              &nbsp;&nbsp;"session_id": "sess_xxx",
              <br />
              &nbsp;&nbsp;"soap": {"{...}"}
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
