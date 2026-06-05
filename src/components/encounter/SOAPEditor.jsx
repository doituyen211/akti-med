/**
 * Panel phải của split-view: Form SOAP Note có thể edit trực tiếp.
 * Bác sĩ có thể chỉnh sửa text do AI tạo ra.
 */

"use client";

import { useEncounterStore } from "@/store";
import { useNotifStore } from "@/store";
import { saveSoapNote, generateSoapNote } from "@/lib/api";
import { DEMO_SOAP } from "@/lib/constants";
import Badge from "@/components/shared/Badge";

// Cấu hình 4 section SOAP
const SOAP_SECTIONS = [
  {
    key: "subjective",
    letter: "S",
    label: "Subjective — Triệu chứng",
    letterColor: "#1a3a3a",
    placeholder: "Bệnh nhân mô tả triệu chứng, lý do đến khám...",
    minHeight: 90,
  },
  {
    key: "objective",
    letter: "O",
    label: "Objective — Khám lâm sàng",
    letterColor: "#ff4d8b",
    placeholder: "Kết quả khám: nhiệt độ, huyết áp, mạch, SpO2...",
    minHeight: 90,
  },
  {
    key: "assessment",
    letter: "A",
    label: "Assessment — Chẩn đoán",
    letterColor: "#e8b94a",
    placeholder: "Chẩn đoán sơ bộ, chẩn đoán phân biệt, ICD-10...",
    minHeight: 80,
  },
  {
    key: "plan",
    letter: "P",
    label: "Plan — Kế hoạch điều trị",
    letterColor: "#b8a4ed",
    placeholder: "Phác đồ điều trị, xét nghiệm cần làm, kê đơn...",
    minHeight: 100,
  },
];

const STATUS_BADGE_VARIANT = {
  draft: { variant: "warning", label: "Đang soạn" },
  "ai-generated": { variant: "success", label: "✨ AI đã điền" },
  reviewed: { variant: "teal", label: "Đã review" },
  finalized: { variant: "teal", label: "✓ Đã lưu" },
};

export default function SOAPEditor({ encounterId }) {
  const {
    soapDraft,
    soapGenerationStatus,
    transcriptSegments,
    updateSoapField,
    setAiGeneratedSoap,
    setSoapGenerationStatus,
  } = useEncounterStore();

  const { showNotif } = useNotifStore();

  // ── Generate bằng AI ───────────────────────────────────────────────────────
  async function handleGenerate() {
    if (transcriptSegments.length === 0) {
      showNotif("⚠️ Chưa có transcript. Hãy ghi âm trước.", "warning");
      return;
    }
    setSoapGenerationStatus("generating");

    try {
      const soap = await generateSoapNote(encounterId);
      setAiGeneratedSoap(soap);
      showNotif("✅ SOAP Note đã được tạo bởi AI!", "success");
    } catch {
      // Demo fallback
      setTimeout(() => {
        setAiGeneratedSoap(DEMO_SOAP);
        showNotif("✅ SOAP Note đã được điền (demo)", "success");
      }, 1200);
    }
  }

  // ── Save ───────────────────────────────────────────────────────────────────
  async function handleSave() {
    if (!soapDraft.subjective) {
      showNotif("⚠️ Vui lòng điền ít nhất phần Subjective", "warning");
      return;
    }
    try {
      await saveSoapNote(encounterId, soapDraft);
      updateSoapField("status", "finalized");
      showNotif("✅ SOAP Note đã lưu thành công!", "success");
    } catch {
      // Demo: chỉ cập nhật local state
      updateSoapField("status", "finalized");
      showNotif("✅ Đã lưu (demo mode)", "success");
    }
  }

  const statusConfig =
    STATUS_BADGE_VARIANT[soapDraft.status] || STATUS_BADGE_VARIANT.draft;
  const isGenerating = soapGenerationStatus === "generating";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#faf5e8",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#fff",
        }}
      >
        <i
          className="ti ti-notes-medical"
          style={{ fontSize: 18, color: "#1a3a3a" }}
        />
        <span style={{ fontWeight: 600, fontSize: 15 }}>SOAP Note</span>
        <div style={{ marginLeft: "auto" }}>
          <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
        </div>
      </div>

      {/* Scrollable form */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {SOAP_SECTIONS.map((section) => (
          <div
            key={section.key}
            style={{ padding: "14px 20px", borderBottom: "1px solid #e5e5e5" }}
          >
            {/* Section label */}
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#9a9a9a",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: section.letterColor,
                }}
              >
                {section.letter}
              </span>
              {section.label}
            </div>

            {/* Editable textarea */}
            <textarea
              value={soapDraft[section.key] || ""}
              onChange={(e) => updateSoapField(section.key, e.target.value)}
              placeholder={section.placeholder}
              style={{
                width: "100%",
                minHeight: section.minHeight,
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                padding: "10px 12px",
                fontSize: 13,
                fontFamily: "Inter, sans-serif",
                background: "#fff",
                resize: "vertical",
                outline: "none",
                lineHeight: 1.6,
                color: "#1a1a1a",
                transition: "border 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0a0a0a")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e5e5")}
            />
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div
        style={{
          padding: "14px 20px",
          borderTop: "1px solid #e5e5e5",
          display: "flex",
          gap: 8,
          background: "#fff",
        }}
      >
        {/* Generate AI */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{
            flex: 1,
            height: 40,
            fontSize: 14,
            fontWeight: 600,
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            background: "transparent",
            color: "#0a0a0a",
            cursor: isGenerating ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            opacity: isGenerating ? 0.6 : 1,
          }}
        >
          <i
            className={`ti ${isGenerating ? "ti-loader-2" : "ti-sparkles"}`}
            style={isGenerating ? { animation: "spin 1s linear infinite" } : {}}
          />
          {isGenerating ? "Đang tạo..." : "Tạo AI"}
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          style={{
            flex: 1,
            height: 40,
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            borderRadius: 12,
            background: "#0a0a0a",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <i className="ti ti-device-floppy" />
          Lưu
        </button>
      </div>
    </div>
  );
}
