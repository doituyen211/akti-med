export default function EncounterPage() {
  return (
    <div class="page" id="page-encounter">
      <div class="encounter-layout">
        {/* <!-- LEFT: Transcript --> */}
        <div class="encounter-left">
          <div class="enc-header">
            <button
              class="btn btn-ghost btn-sm"
              onclick="navigate('dashboard')"
            >
              <i class="ti ti-arrow-left"></i> Quay lại
            </button>
            <div>
              <div class="enc-title" id="encPatientName">
                Bệnh nhân: Nguyễn Văn B
              </div>
              <div class="enc-meta" id="encInfo">
                CA KHÁM #2025-001 · 09:30 04/06/2025
              </div>
            </div>
            <div style="margin-left:auto;display:flex;gap:8px;align-items:center">
              <span class="badge badge-success" id="encStatusBadge">
                ● Đang ghi âm
              </span>
              <button class="btn btn-secondary btn-sm" onclick="uploadAudio()">
                <i class="ti ti-upload"></i> Upload
              </button>
              <button class="btn btn-primary btn-sm" onclick="endEncounter()">
                <i class="ti ti-check"></i> Kết thúc
              </button>
            </div>
          </div>

          <div class="transcript-area" id="transcriptArea">
            <div style="text-align:center;padding:20px">
              <div style="font-size:32px;margin-bottom:8px">🎙️</div>
              <p style="font-size:14px;color:var(--muted)">
                Nhấn <b>Ghi âm</b> để bắt đầu hoặc <b>Upload</b> file âm thanh
              </p>
            </div>
          </div>

          {/* <!-- Live command box --> */}
          <div class="live-cmd">
            <div style="font-size:11px;font-weight:600;letter-spacing:1px;color:var(--muted);margin-bottom:6px;text-transform:uppercase">
              Lệnh Agent
            </div>
            <div class="live-cmd-row">
              <input
                class="live-cmd-input"
                id="cmdInput"
                placeholder='Ví dụ: "Tìm lịch sử bệnh án", "Kiểm tra BHYT"...'
                onkeydown="if(event.key==='Enter')runCmd()"
              />
              <button class="btn btn-secondary btn-sm" onclick="runCmd()">
                <i class="ti ti-send"></i>
              </button>
              <button
                class="btn btn-secondary btn-sm"
                onclick="voiceCmd()"
                title="Lệnh giọng nói"
              >
                <i class="ti ti-microphone"></i>
              </button>
            </div>
            <div
              id="cmdResult"
              style="display:none;margin-top:8px;padding:8px 12px;background:var(--cream-card);border-radius:var(--r-sm);font-size:13px;color:var(--body)"
            ></div>
          </div>

          {/* <!-- Emergency toggle --> */}
          <div class="emergency-toggle" id="emergencyArea">
            <div
              class="toggle-track"
              id="emergToggle"
              onclick="toggleEmergency()"
            >
              <div class="toggle-thumb"></div>
            </div>
            <span class="emergency-label">
              <i class="ti ti-ambulance"></i> Chế độ Cấp cứu
            </span>
            <span
              style="margin-left:auto;font-size:12px;color:var(--muted)"
              id="emergStatus"
            >
              TẮT
            </span>
          </div>
          <div id="emergencyLog" class="emergency-log hidden"></div>

          {/* <!-- Recording controls --> */}
          <div class="rec-controls">
            <button
              class="rec-btn record"
              id="recBtn"
              onclick="toggleRecording()"
            >
              <i class="ti ti-microphone" id="recIcon"></i>
            </button>
            <div>
              <div class="rec-timer" id="recTimer">
                00:00
              </div>
              <div class="rec-status" id="recStatus">
                Sẵn sàng ghi âm
              </div>
            </div>
            <div class="upload-btn-area" style="margin-left:auto">
              <input
                type="file"
                id="audioUpload"
                accept="audio/*,video/*"
                style="display:none"
                onchange="handleAudioFile(this)"
              />
            </div>
          </div>
        </div>

        {/* <!-- RIGHT: SOAP Panel --> */}
        <div class="encounter-right" id="soapPanel">
          <div class="soap-panel">
            <div class="soap-header">
              <i
                class="ti ti-notes-medical"
                style="font-size:18px;color:var(--teal)"
              ></i>
              <span style="font-weight:600;font-size:15px">SOAP Note</span>
              <span
                class="badge badge-warning"
                style="margin-left:auto"
                id="soapStatus"
              >
                Đang soạn
              </span>
            </div>
            <div style="flex:1;overflow-y:auto">
              <div class="soap-section">
                <div class="soap-label">
                  <span style="color:var(--teal);font-size:14px;font-weight:700">
                    S
                  </span>{" "}
                  Subjective — Triệu chứng
                </div>
                <textarea
                  class="soap-input"
                  id="soapS"
                  placeholder="Bệnh nhân mô tả triệu chứng, lý do đến khám..."
                ></textarea>
              </div>
              <div class="soap-section">
                <div class="soap-label">
                  <span style="color:var(--pink);font-size:14px;font-weight:700">
                    O
                  </span>{" "}
                  Objective — Khám lâm sàng
                </div>
                <textarea
                  class="soap-input"
                  id="soapO"
                  placeholder="Kết quả khám: nhiệt độ, huyết áp, mạch, SpO2..."
                ></textarea>
              </div>
              <div class="soap-section">
                <div class="soap-label">
                  <span style="color:var(--ochre);font-size:14px;font-weight:700">
                    A
                  </span>{" "}
                  Assessment — Chẩn đoán
                </div>
                <textarea
                  class="soap-input"
                  id="soapA"
                  placeholder="Chẩn đoán sơ bộ, chẩn đoán phân biệt..."
                ></textarea>
              </div>
              <div class="soap-section">
                <div class="soap-label">
                  <span style="color:var(--lavender);font-size:14px;font-weight:700">
                    P
                  </span>{" "}
                  Plan — Kế hoạch điều trị
                </div>
                <textarea
                  class="soap-input"
                  id="soapP"
                  placeholder="Phác đồ điều trị, xét nghiệm cần làm, kê đơn..."
                ></textarea>
              </div>
            </div>
            <div
              class="soap-actions"
              style="display:flex;gap:8px;border-top:1px solid var(--hairline);padding:16px 20px"
            >
              <button
                class="btn btn-secondary"
                style="flex:1"
                onclick="generateSOAP()"
              >
                <i class="ti ti-sparkles"></i> Tạo AI
              </button>
              <button
                class="btn btn-primary"
                style="flex:1"
                onclick="saveSOAP()"
              >
                <i class="ti ti-device-floppy"></i> Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
