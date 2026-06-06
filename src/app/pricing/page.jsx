/**
 * Trang bảng giá — 4 gói: Starter, Pro, Clinic, Enterprise.
 */

import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { PRICING_TIERS } from "@/lib/constants";

export const metadata = {
  title: "Bảng giá — MediScribeAI",
  description: "Đơn giản, minh bạch. Trả theo nhu cầu thực tế, không phí ẩn.",
};

export default function PricingPage() {
  return (
    <>
      <section
        style={{ padding: "96px 32px 0", maxWidth: 1280, margin: "0 auto" }}
      >
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#9a9a9a",
              marginBottom: 16,
            }}
          >
            Bảng giá
          </div>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-1px",
              marginBottom: 8,
            }}
          >
            Đơn giản, minh bạch
          </h1>
          <p style={{ fontSize: 16, color: "#9a9a9a" }}>
            Trả theo nhu cầu thực tế, không phí ẩn.
          </p>
        </div>

        {/* Pricing grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 96,
          }}
        >
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* FAQ section */}
        <div style={{ maxWidth: 680, margin: "0 auto 96px" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.5px",
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            Câu hỏi thường gặp
          </h2>
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

// ── Pricing Card ──────────────────────────────────────────────────────────────
function PricingCard({ tier }) {
  const featured = tier.isFeatured;

  return (
    <div
      style={{
        border: `1px solid ${featured ? "#1a3a3a" : "#e5e5e5"}`,
        borderRadius: 16,
        padding: 32,
        background: featured ? "#1a3a3a" : "#fffaf0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Popular badge */}
      {featured && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 9999,
            background: "#a4d4c5",
            color: "#1a3a3a",
            marginBottom: 12,
            width: "fit-content",
          }}
        >
          Phổ biến nhất
        </span>
      )}

      {/* Name */}
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 4,
          color: featured ? "#fff" : "#0a0a0a",
        }}
      >
        {tier.name}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: featured ? "rgba(255,255,255,.6)" : "#9a9a9a",
          marginBottom: 0,
        }}
      >
        {tier.description}
      </p>

      {/* Price */}
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: "-1px",
          margin: "16px 0 4px",
          color: featured ? "#fff" : "#0a0a0a",
        }}
      >
        {tier.priceVnd === null ? (
          "Liên hệ"
        ) : tier.priceVnd === 0 ? (
          <>₫0</>
        ) : (
          <>
            <sup style={{ fontSize: 20, verticalAlign: "super" }}>₫</sup>
            {(tier.priceVnd / 1000000).toFixed(1)}M
          </>
        )}
      </div>
      <div
        style={{
          fontSize: 13,
          color: featured ? "rgba(255,255,255,.6)" : "#9a9a9a",
          marginBottom: 20,
        }}
      >
        {tier.period}
      </div>

      {/* Features list */}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 24,
          flex: 1,
        }}
      >
        {tier.features.map((f) => (
          <li
            key={f}
            style={{
              fontSize: 14,
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              color: featured ? "rgba(255,255,255,.9)" : "#3a3a3a",
            }}
          >
            <i
              className="ti ti-check"
              style={{
                color: featured ? "#a4d4c5" : "#22c55e",
                flexShrink: 0,
                marginTop: 2,
              }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/login"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 40,
          fontSize: 14,
          fontWeight: 600,
          borderRadius: 12,
          textDecoration: "none",
          cursor: "pointer",
          border: featured ? "none" : "1px solid #e5e5e5",
          background: featured ? "#fffaf0" : "transparent",
          color: featured ? "#0a0a0a" : "#0a0a0a",
          transition: "opacity .15s",
        }}
      >
        {tier.ctaLabel}
      </Link>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Dùng thử 30 ngày có cần thẻ tín dụng không?",
    a: "Không. Bạn có thể dùng thử gói Pro hoàn toàn miễn phí trong 30 ngày mà không cần nhập thông tin thanh toán.",
  },
  {
    q: "Dữ liệu ghi âm được lưu ở đâu?",
    a: "Dữ liệu âm thanh được mã hóa AES-256 và lưu trên server tại Việt Nam. Audio chunks sẽ bị xóa sau 24 giờ. Transcript và SOAP Note được lưu theo thời hạn của gói đăng ký.",
  },
  {
    q: "Có thể tích hợp với HIS hiện tại của bệnh viện không?",
    a: "Có. Gói Clinic và Enterprise hỗ trợ tích hợp thông qua REST API và HL7 FHIR. Liên hệ đội ngũ kỹ thuật để được hỗ trợ.",
  },
  {
    q: "Hỗ trợ tiếng Việt ở mức độ nào?",
    a: "Whisper Large v3 hỗ trợ tiếng Việt với độ chính xác 95-98%. Llama-3-70B được fine-tune với thuật ngữ y khoa tiếng Việt để tạo SOAP Note chuẩn.",
  },
];

function FAQItem({ q, a }) {
  return (
    <div style={{ borderBottom: "1px solid #e5e5e5", padding: "20px 0" }}>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 8,
          color: "#0a0a0a",
        }}
      >
        {q}
      </h3>
      <p style={{ fontSize: 15, color: "#6a6a6a", lineHeight: 1.6 }}>{a}</p>
    </div>
  );
}
