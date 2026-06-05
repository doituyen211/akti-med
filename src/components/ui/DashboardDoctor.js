"use client";
import React from "react";
import Link from "next/link";

/**
 * Doctor dashboard. Displays daily statistics and a list of today's
 * encounters. The "Ca khám mới" button would normally open a consent
 * modal; here it links back to the dashboard as a placeholder.
 */
export default function DashboardDoctor({ user }) {
  const encounters = [
    {
      patient: "Nguyễn Văn B",
      ageGender: "35 tuổi, Nam",
      time: "09:00",
      reason: "Cảm cúm, sốt",
      status: "Hoàn thành",
      link: "#",
    },
    {
      patient: "Trần Thị C",
      ageGender: "28 tuổi, Nữ",
      time: "10:30",
      reason: "Đau bụng",
      status: "Đang khám",
      link: "#",
    },
    {
      patient: "Lê Văn D",
      ageGender: "52 tuổi, Nam",
      time: "11:00",
      reason: "Tái khám huyết áp",
      status: "Chờ",
      link: "#",
    },
    {
      patient: "Phạm Thị E",
      ageGender: "67 tuổi, Nữ",
      time: "14:00",
      reason: "Tiểu đường type 2",
      status: "Chờ",
      link: "#",
    },
  ];
  const statusColor = (status) => {
    switch (status) {
      case "Hoàn thành":
        return { bg: "rgba(34,197,94,.1)", color: "#15803d" };
      case "Đang khám":
        return { bg: "rgba(245,158,11,.1)", color: "#92400e" };
      case "Chờ":
      default:
        return { bg: "rgba(59,130,246,.1)", color: "#1d4ed8" };
    }
  };
  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <h1
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Dashboard Bác sĩ
        </h1>
        {/*
          Thay vì hiển thị thông báo (alert) khi bấm nút "Ca khám mới",
          sử dụng component Link để điều hướng tới trang chi tiết ca khám mới.
          Ở đây chúng ta giả sử ID của ca khám mới là "new". Bạn có thể
          thay thế bằng logic tạo ID thực tế nếu backend cung cấp.
        */}
        <Link
          href="/dashboard/new"
          style={{
            background: "#0a0a0a",
            color: "#ffffff",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          + Ca khám mới
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6a6a6a",
              marginBottom: 6,
            }}
          >
            CA KHÁM HÔM NAY
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            12
          </div>
          <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 4 }}>
            3 còn lại
          </div>
        </div>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6a6a6a",
              marginBottom: 6,
            }}
          >
            SOAP NOTES
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            847
          </div>
          <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 4 }}>
            Tổng cộng
          </div>
        </div>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6a6a6a",
              marginBottom: 6,
            }}
          >
            THỜI GIAN TIẾT KIỆM
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            47h
          </div>
          <div style={{ fontSize: 12, color: "#22c55e", marginTop: 4 }}>
            Tháng này
          </div>
        </div>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6a6a6a",
              marginBottom: 6,
            }}
          >
            ĐỘ CHÍNH XÁC
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            97.2%
          </div>
          <div style={{ fontSize: 12, color: "#22c55e", marginTop: 4 }}>
            ↑ SOAP Note
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e5e5e5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 600 }}>Ca khám hôm nay</div>
          <Link
            href="#"
            style={{ fontSize: 13, color: "#6a6a6a", textDecoration: "none" }}
          >
            Xem tất cả
          </Link>
        </div>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
        >
          <thead>
            <tr
              style={{ textAlign: "left", borderBottom: "1px solid #e5e5e5" }}
            >
              <th
                style={{
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#6a6a6a",
                }}
              >
                Bệnh nhân
              </th>
              <th
                style={{
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#6a6a6a",
                }}
              >
                Giờ
              </th>
              <th
                style={{
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#6a6a6a",
                }}
              >
                Lý do
              </th>
              <th
                style={{
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#6a6a6a",
                }}
              >
                Trạng thái
              </th>
              <th style={{ padding: "8px 16px" }}></th>
            </tr>
          </thead>
          <tbody>
            {encounters.map((e, idx) => {
              const badge = statusColor(e.status);
              return (
                <tr
                  key={idx}
                  style={{
                    borderBottom:
                      idx === encounters.length - 1
                        ? "none"
                        : "1px solid #f0f0f0",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <b>{e.patient}</b>
                    <br />
                    <span style={{ fontSize: 12, color: "#6a6a6a" }}>
                      {e.ageGender}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>{e.time}</td>
                  <td style={{ padding: "12px 16px" }}>{e.reason}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: badge.bg,
                        color: badge.color,
                        padding: "2px 6px",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <Link
                      href={`/dashboard/${idx}`}
                      style={{
                        color: "#6a6a6a",
                        cursor: "pointer",
                        fontSize: 14,
                        textDecoration: "none",
                      }}
                    >
                      Mở
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
