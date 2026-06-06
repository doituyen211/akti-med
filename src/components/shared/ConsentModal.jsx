/**
 * Gatekeeper Modal — bắt buộc ký/tick xác nhận đồng thuận ghi âm
 * trước khi mở UI khám bệnh.
 *
 * Không thể đóng bằng cách click ngoài — phải tick đủ 2 ô + confirm.
 */

"use client";

import { useState } from "react";

export default function ConsentModal({
  isOpen,
  patientName,
  onConfirm,
  onCancel,
}) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  function handleConfirm() {
    if (!check1 || !check2) return;
    onConfirm();
    // Reset checkboxes cho lần sau
    setCheck1(false);
    setCheck2(false);
  }

  function handleCancel() {
    setCheck1(false);
    setCheck2(false);
    onCancel();
  }

  if (!isOpen) return null;

  return (
    /* Overlay — không cho click ngoài để đóng */
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: 40,
          maxWidth: 480,
          width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>

        <h2
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 8,
            letterSpacing: "-0.3px",
          }}
        >
          Xác nhận đồng thuận ghi âm
        </h2>

        <p
          style={{
            fontSize: 14,
            color: "#3a3a3a",
            lineHeight: 1.6,
            marginBottom: 8,
          }}
        >
          {patientName
            ? `Trước khi bắt đầu ca khám cho <strong>${patientName}</strong>, vui lòng xác nhận bệnh nhân đã đồng ý ghi âm.`
            : "Trước khi bắt đầu phiên khám, vui lòng xác nhận bệnh nhân đã đồng ý ghi âm cuộc trò chuyện."}
        </p>

        {/* Checkbox 1 */}
        <ConsentCheckbox
          id="consent-1"
          checked={check1}
          onChange={setCheck1}
          label="Bệnh nhân đã được thông báo và đồng ý ghi âm cuộc trò chuyện này để tạo hồ sơ y tế (SOAP note)."
        />

        {/* Checkbox 2 */}
        <ConsentCheckbox
          id="consent-2"
          checked={check2}
          onChange={setCheck2}
          label="Tôi xác nhận đây là môi trường khám bệnh hợp pháp và dữ liệu sẽ được bảo mật theo quy định của pháp luật."
        />

        {/* Warning nếu chưa tick đủ */}
        {(!check1 || !check2) && (
          <p
            style={{
              fontSize: 12,
              color: "#f59e0b",
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            ⚠️ Vui lòng xác nhận cả hai điều khoản để tiếp tục.
          </p>
        )}

        {/* Actions */}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button
            onClick={handleCancel}
            style={{
              flex: 0,
              padding: "10px 20px",
              height: 40,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              background: "transparent",
              color: "#0a0a0a",
            }}
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleConfirm}
            disabled={!check1 || !check2}
            style={{
              flex: 1,
              height: 40,
              fontSize: 14,
              fontWeight: 600,
              cursor: check1 && check2 ? "pointer" : "not-allowed",
              border: "none",
              borderRadius: 12,
              background: check1 && check2 ? "#0a0a0a" : "#e5e5e5",
              color: check1 && check2 ? "#fff" : "#9a9a9a",
              transition: "all 0.15s",
            }}
          >
            ✓ Xác nhận &amp; Bắt đầu
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sub-component: checkbox row ───────────────────────────────────────────────
function ConsentCheckbox({ id, checked, onChange, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        margin: "12px 0",
        padding: 16,
        background: "#faf5e8",
        borderRadius: 12,
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          width: 18,
          height: 18,
          flexShrink: 0,
          marginTop: 2,
          cursor: "pointer",
        }}
      />
      <label
        htmlFor={id}
        style={{ fontSize: 13, lineHeight: 1.5, cursor: "pointer" }}
      >
        {label}
      </label>
    </div>
  );
}
