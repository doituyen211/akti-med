/**
 * Bảng danh sách ca khám — dùng trong doctor dashboard.
 */

"use client";

import Badge from "../../components/shared/Bagde";
import { STATUS_BADGE } from "@/lib/constants";

const STATUS_VARIANT = {
  completed: "success",
  "in-progress": "warning",
  waiting: "info",
  emergency: "error",
};

export default function EncounterTable({ encounters, onOpen }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Card header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600 }}>Ca khám hôm nay</span>
        <Badge variant="muted">{encounters.length} ca</Badge>
      </div>

      {/* Table */}
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
      >
        <thead>
          <tr>
            {["Bệnh nhân", "Giờ", "Lý do", "Trạng thái", ""].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  color: "#9a9a9a",
                  padding: "8px 16px",
                  borderBottom: "1px solid #e5e5e5",
                  textTransform: "uppercase",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {encounters.map((enc) => (
            <tr
              key={enc.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#faf5e8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <div style={{ fontWeight: 600 }}>{enc.patientName}</div>
                <div style={{ fontSize: 12, color: "#9a9a9a" }}>
                  {enc.age} tuổi, {enc.gender}
                </div>
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {enc.time}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f0f0f0",
                  color: "#3a3a3a",
                }}
              >
                {enc.complaint}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Badge variant={STATUS_VARIANT[enc.status] || "muted"}>
                  {STATUS_BADGE[enc.status]?.label || enc.status}
                </Badge>
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <button
                  onClick={() => onOpen(enc)}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#6a6a6a",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {enc.status === "completed"
                    ? "Xem"
                    : enc.status === "in-progress"
                      ? "Mở"
                      : "Bắt đầu"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
