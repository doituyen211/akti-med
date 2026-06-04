import React from "react";
import Link from "next/link";

/**
 * Pricing page. Presents four subscription tiers with descriptions and
 * action buttons. The design closely follows the original provided
 * example while using semantic HTML and inline styles.
 */
export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      subtitle: "Cho phòng khám nhỏ",
      price: "₫0",
      period: "Mãi mãi miễn phí",
      features: [
        "50 ca khám/tháng",
        "SOAP Note cơ bản",
        "1 bác sĩ",
        "Lưu trữ 7 ngày",
      ],
      button: (
        <Link
          href="/login"
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 8,
            padding: "8px",
            display: "block",
            textAlign: "center",
            fontSize: 14,
            color: "#0a0a0a",
            textDecoration: "none",
          }}
        >
          Bắt đầu
        </Link>
      ),
    },
    {
      name: "Pro",
      subtitle: "Cho phòng khám trung bình",
      price: "₫1.2M",
      period: "/tháng/bác sĩ",
      features: [
        "Không giới hạn ca khám",
        "SOAP Note nâng cao",
        "5 bác sĩ",
        "Lưu trữ 1 năm",
        "Agent đa tác vụ",
      ],
      featured: true,
      button: (
        <Link
          href="/login"
          style={{
            background: "#fffaf0",
            borderRadius: 8,
            padding: "8px",
            display: "block",
            textAlign: "center",
            fontSize: 14,
            color: "#0a0a0a",
            textDecoration: "none",
          }}
        >
          Dùng thử 30 ngày
        </Link>
      ),
    },
    {
      name: "Clinic",
      subtitle: "Cho bệnh viện nhỏ",
      price: "₫4.5M",
      period: "/tháng",
      features: [
        "Không giới hạn ca khám",
        "Tất cả tính năng Pro",
        "20 bác sĩ",
        "Tích hợp HIS/EMR",
        "API riêng",
      ],
      button: (
        <a
          onClick={() => alert("Liên hệ sales@mediscribe.ai")}
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 8,
            padding: "8px",
            display: "block",
            textAlign: "center",
            fontSize: 14,
            color: "#0a0a0a",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Liên hệ
        </a>
      ),
    },
    {
      name: "Enterprise",
      subtitle: "Cho bệnh viện lớn",
      price: "Liên hệ",
      period: "Tuỳ chỉnh theo nhu cầu",
      features: [
        "Không giới hạn người dùng",
        "Triển khai on‑premise",
        "SLA 99.9%",
        "Hỗ trợ 24/7",
        "Training tùy chỉnh",
      ],
      button: (
        <a
          onClick={() => alert("Liên hệ enterprise@mediscribe.ai")}
          style={{
            background: "#0a0a0a",
            borderRadius: 8,
            padding: "8px",
            display: "block",
            textAlign: "center",
            fontSize: 14,
            color: "#ffffff",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Tư vấn ngay
        </a>
      ),
    },
  ];
  return (
    <div style={{ padding: "96px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
          Bảng giá
        </div>
        <h1
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: -1,
            marginBottom: 8,
          }}
        >
          Đơn giản, minh bạch
        </h1>
        <p style={{ fontSize: 16, color: "#6a6a6a", marginBottom: 48 }}>
          Trả theo nhu cầu thực tế, không phí ẩn.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {plans.map((plan, idx) => (
            <div
              key={idx}
              style={{
                background: plan.featured ? "#1a3a3a" : "#fffaf0",
                color: plan.featured ? "#ffffff" : "#0a0a0a",
                border: "1px solid",
                borderColor: plan.featured ? "#1a3a3a" : "#e5e5e5",
                borderRadius: 16,
                padding: 32,
                position: "relative",
              }}
            >
              {plan.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 20,
                    background: "#a4d4c5",
                    color: "#1a3a3a",
                    padding: "4px 10px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Phổ biến nhất
                </span>
              )}
              <h3
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {plan.name}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: plan.featured ? "rgba(255,255,255,.6)" : "#6a6a6a",
                  marginBottom: 0,
                }}
              >
                {plan.subtitle}
              </p>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 40,
                  fontWeight: 700,
                  letterSpacing: -1,
                  margin: "16px 0 4px",
                }}
              >
                {plan.price}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: plan.featured ? "rgba(255,255,255,.6)" : "#6a6a6a",
                  marginBottom: 20,
                }}
              >
                {plan.period}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: 24,
                }}
              >
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{ color: plan.featured ? "#a4d4c5" : "#22c55e" }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {plan.button}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
