/**
 * Giao diện chi tiết ca khám — split-view.
 * Trái: Transcript realtime + Recording controls + Live command + Emergency toggle
 * Phải: SOAP Editor
 */

"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEncounterStore } from "@/store";
import { useNotifStore } from "@/store";
import { useRecording } from "@/hooks/useRecording";
import { finalizeSoapNote } from "@/lib/api";

import TranscriptPanel from "@/components/encounter/TranscriptPanel";
import RecordingControls from "@/components/encounter/RecordingControls";
import SOAPEditor from "@/components/encounter/SOAPEditor";
import LiveCommandBox from "@/components/encounter/LiveCommandBox";
import EmergencyToggle from "@/components/encounter/EmergencyToggle";
import Badge from "@/components/shared/Badge";

// Map encounter_id → demo patient name (thay bằng API call thật sau)
const DEMO_PATIENT_MAP = {
  "2025-001": { name: "Nguyễn Văn B", age: 35, time: "09:00" },
  "2025-002": { name: "Trần Thị C", age: 28, time: "10:30" },
  "2025-003": { name: "Lê Văn D", age: 52, time: "11:00" },
  "2025-004": { name: "Phạm Thị E", age: 67, time: "14:00" },
  new: { name: "Bệnh nhân mới", age: null, time: "" },
};

export default function EncounterPage() {
  const params = useParams();
  const router = useRouter();
  const encId = params.encounter_id;

  const { user, isAuthenticated } = useAuth();
  const { showNotif } = useNotifStore();
  const {
    recordingStatus,
    isEmergencyMode,
    soapDraft,
    resetEncounter,
    setConsentConfirmed,
  } = useEncounterStore();

  const { cleanup } = useRecording(encId);
  const hasReset = useRef(false);

  // Guard: chưa login → về login
  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  // Reset encounter state khi mount (ca mới)
  useEffect(() => {
    if (!hasReset.current) {
      resetEncounter();
      setConsentConfirmed(true); // consent đã xác nhận từ dashboard
      hasReset.current = true;
    }
    // Cleanup khi unmount (dừng recorder, clear timers)
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  const patient = DEMO_PATIENT_MAP[encId] || DEMO_PATIENT_MAP.new;

  // ── Kết thúc ca khám ────────────────────────────────────────────────────────
  async function handleEndEncounter() {
    if (!soapDraft.subjective) {
      showNotif("⚠️ Hãy tạo SOAP Note trước khi kết thúc", "warning");
      return;
    }
    try {
      await finalizeSoapNote(encId);
    } catch {
      // Demo: bỏ qua lỗi API
    }
    showNotif("📋 Ca khám kết thúc. Đang tạo giấy ra viện...", "success");
    setTimeout(() => router.push("/dashboard"), 1800);
  }

  // ── Recording status badge ───────────────────────────────────────────────────
  function statusBadge() {
    if (isEmergencyMode) return <Badge variant="error">🚨 Cấp cứu</Badge>;
    if (recordingStatus === "recording")
      return <Badge variant="error">● Đang ghi âm</Badge>;
    if (recordingStatus === "processing")
      return <Badge variant="warning">⏳ Đang xử lý</Badge>;
    if (recordingStatus === "stopped")
      return <Badge variant="muted">■ Đã dừng</Badge>;
    return <Badge variant="muted">Sẵn sàng</Badge>;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 64px)",
        overflow: "hidden",
      }}
    >
      {/* ══ LEFT PANEL: Transcript ══════════════════════════════════════════════ */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #e5e5e5",
          minWidth: 0,
        }}
      >
        {/* Encounter header */}
        <div
          style={{
            padding: "12px 20px",
            borderBottom: "1px solid #e5e5e5",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          {/* Back button */}
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 13,
              fontWeight: 600,
              color: "#6a6a6a",
              textDecoration: "none",
              padding: "4px 10px",
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              background: "transparent",
              flexShrink: 0,
            }}
          >
            <i className="ti ti-arrow-left" /> Quay lại
          </Link>

          {/* Patient info */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 15,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Bệnh nhân: {patient.name}
              {patient.age && (
                <span
                  style={{ fontWeight: 400, color: "#9a9a9a", fontSize: 13 }}
                >
                  {" "}
                  · {patient.age} tuổi
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: "#9a9a9a" }}>
              CA KHÁM #{encId.toUpperCase()} ·{" "}
              {new Date().toLocaleString("vi-VN")}
            </div>
          </div>

          {/* Right controls */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {statusBadge()}
            <button
              onClick={handleEndEncounter}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 32,
                padding: "0 14px",
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                borderRadius: 8,
                background: "#0a0a0a",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <i className="ti ti-check" /> Kết thúc
            </button>
          </div>
        </div>

        {/* Scrollable transcript area */}
        <TranscriptPanel />

        {/* Live command box */}
        <LiveCommandBox encounterId={encId} />

        {/* Emergency toggle */}
        <EmergencyToggle />

        {/* Recording controls — always at bottom */}
        <RecordingControls encounterId={encId} />
      </div>

      {/* ══ RIGHT PANEL: SOAP Editor ════════════════════════════════════════════ */}
      {/* Hide SOAP panel in emergency mode — show full-width transcript instead */}
      {!isEmergencyMode && (
        <div
          style={{
            width: 420,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SOAPEditor encounterId={encId} />
        </div>
      )}
    </div>
  );
}
