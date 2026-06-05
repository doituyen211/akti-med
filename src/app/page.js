/**
 * Trang chủ marketing — Hero, Features, Testimonials, CTA.
 * Server Component (không cần 'use client').
 */

import Link from "next/link";
import Footer from "@/components/layout/Footer";

// ── Helper components ─────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
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
      {children}
    </div>
  );
}

function FeatureCard({ bg, color, icon, title, description, badge, badgeBg }) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: 24,
        padding: 32,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 16, opacity: 0.9, color }}>
        {icon}
      </div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 8,
          color,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 14,
          opacity: 0.85,
          lineHeight: 1.5,
          marginBottom: 16,
          color,
        }}
      >
        {description}
      </p>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontSize: 12,
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: 9999,
          background: badgeBg || "rgba(0,0,0,.08)",
          color: color,
        }}
      >
        {badge}
      </span>
    </div>
  );
}

function TestimonialCard({ quote, name, title, avatarBg, avatarInitials }) {
  return (
    <div style={{ background: "#f5f0e0", borderRadius: 16, padding: 24 }}>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "#1a1a1a",
          marginBottom: 16,
          fontStyle: "italic",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: avatarBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {avatarInitials}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
          <div style={{ fontSize: 12, color: "#9a9a9a" }}>{title}</div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          padding: "96px 32px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 9999,
              background: "rgba(255,77,139,.1)",
              color: "#c0256d",
              marginBottom: 16,
            }}
          >
            <i className="ti ti-sparkles" /> AI hỗ trợ y tế
          </span>

          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-2px",
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Ghi âm → <span style={{ color: "#ff4d8b" }}>SOAP Note</span>
            <br />
            trong vài giây
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "#3a3a3a",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Nền tảng AI agent y tế đầu tiên tại Việt Nam, giúp bác sĩ chuyển
            cuộc trò chuyện thành hồ sơ lâm sàng chuẩn mực một cách tự động.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 48,
                padding: "0 28px",
                fontSize: 15,
                fontWeight: 600,
                background: "#0a0a0a",
                color: "#fff",
                borderRadius: 12,
                textDecoration: "none",
                border: "none",
              }}
            >
              Bắt đầu miễn phí
            </Link>
            <Link
              href="/docs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 48,
                padding: "0 28px",
                fontSize: 15,
                fontWeight: 600,
                background: "transparent",
                color: "#0a0a0a",
                borderRadius: 12,
                textDecoration: "none",
                border: "1px solid #e5e5e5",
              }}
            >
              Xem tài liệu
            </Link>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: "#9a9a9a" }}>
            ✓ Không cần thẻ tín dụng &nbsp; ✓ Cài đặt trong 5 phút
          </p>
        </div>

        {/* Hero visual — demo card */}
        <div style={{ background: "#faf5e8", borderRadius: 24, padding: 32 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#9a9a9a",
              marginBottom: 12,
            }}
          >
            ĐANG GHI ÂM TRỰC TIẾP
          </div>
          {/* Waveform */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 3,
              height: 40,
              marginBottom: 12,
            }}
          >
            {[
              18, 30, 14, 36, 22, 40, 16, 28, 38, 12, 32, 24, 40, 18, 30, 14,
              36, 22, 40, 16, 28, 12, 34, 20,
            ].map((h, i) => (
              <div
                key={i}
                style={{
                  background: i % 2 === 0 ? "#ff4d8b" : "#b8a4ed",
                  borderRadius: 2,
                  width: 4,
                  height: h,
                  animation: `wave ${0.7 + (i % 5) * 0.1}s ease-in-out infinite`,
                  animationDelay: `${i * 0.06}s`,
                }}
              />
            ))}
          </div>
          {/* Transcript preview */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                color: "#9a9a9a",
                marginBottom: 8,
              }}
            >
              PHỤ ĐỀ THỜI GIAN THỰC
            </div>
            <div
              style={{
                fontSize: 13,
                padding: "6px 10px",
                borderRadius: 8,
                marginBottom: 4,
                background: "rgba(26,58,58,.08)",
                color: "#1a3a3a",
              }}
            >
              <b>BS:</b> Bạn đang có triệu chứng gì vậy?
            </div>
            <div
              style={{
                fontSize: 13,
                padding: "6px 10px",
                borderRadius: 8,
                marginBottom: 4,
                background: "rgba(255,77,139,.06)",
                color: "#c0256d",
              }}
            >
              <b>BN:</b> Tôi bị đau đầu và sốt 2 ngày rồi.
            </div>
            <div
              style={{
                fontSize: 13,
                padding: "6px 10px",
                borderRadius: 8,
                background: "rgba(26,58,58,.08)",
                color: "#1a3a3a",
              }}
            >
              <b>BS:</b> Nhiệt độ cao nhất bao nhiêu?{" "}
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 14,
                  background: "#ff4d8b",
                  borderRadius: 1,
                  verticalAlign: "middle",
                  animation: "blink 0.8s step-end infinite",
                }}
              />
            </div>
          </div>
          {/* SOAP preview */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 16 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                color: "#9a9a9a",
                marginBottom: 8,
              }}
            >
              SOAP NOTE TỰ ĐỘNG
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: "#3a3a3a" }}>
              <b style={{ color: "#1a3a3a" }}>S:</b> Đau đầu, sốt 2 ngày...
              <br />
              <b style={{ color: "#1a3a3a" }}>O:</b> Nhiệt độ đang ghi nhận...
              <br />
              <b style={{ color: "#1a3a3a" }}>A:</b> Đang phân tích...
              <br />
              <b style={{ color: "#1a3a3a" }}>P:</b> Đề xuất điều trị...
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        style={{ padding: "0 32px 96px", maxWidth: 1280, margin: "0 auto" }}
      >
        <SectionLabel>Tính năng</SectionLabel>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: 48,
          }}
        >
          Tất cả trong một nền tảng
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          <FeatureCard
            bg="#ff4d8b"
            color="#fff"
            icon={<i className="ti ti-microphone" />}
            title="Ghi âm thời gian thực"
            description="Chuyển giọng nói thành văn bản tức thì với Whisper Large v3 qua Groq API, độ chính xác 98%."
            badge="Whisper v3"
            badgeBg="rgba(255,255,255,.2)"
          />
          <FeatureCard
            bg="#1a3a3a"
            color="#fff"
            icon={<i className="ti ti-notes-medical" />}
            title="SOAP Note tự động"
            description="Llama-3-70B phân tích cuộc trò chuyện và tạo SOAP Note chuẩn y khoa trong vài giây."
            badge="Llama 3"
            badgeBg="rgba(255,255,255,.2)"
          />
          <FeatureCard
            bg="#b8a4ed"
            color="#0a0a0a"
            icon={<i className="ti ti-users" />}
            title="Phân biệt người nói"
            description="Silero VAD nhận diện và phân biệt giọng bác sĩ và bệnh nhân theo màu sắc riêng biệt."
            badge="Silero VAD"
          />
          <FeatureCard
            bg="#ffb084"
            color="#0a0a0a"
            icon={<i className="ti ti-emergency-bed" />}
            title="Chế độ cấp cứu"
            description="Chuyển sang log y lệnh khẩn cấp ngay lập tức, ẩn form SOAP để tập trung vào cấp cứu."
            badge="Blackbox Log"
          />
          <FeatureCard
            bg="#e8b94a"
            color="#0a0a0a"
            icon={<i className="ti ti-robot" />}
            title="Agent đa tác vụ"
            description="Gọi agent qua lệnh giọng nói để tra cứu BHYT, lịch sử bệnh án, đặt lịch xét nghiệm."
            badge="LangGraph"
          />
          <FeatureCard
            bg="#f5f0e0"
            color="#0a0a0a"
            icon={<i className="ti ti-shield-check" />}
            title="Bảo mật y tế"
            description="Mã hóa end-to-end, tuân thủ quy định bảo mật dữ liệu y tế Việt Nam và HIPAA."
            badge="AES-256"
            badgeBg="rgba(26,58,58,.1)"
          />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        style={{ padding: "0 32px 96px", maxWidth: 1280, margin: "0 auto" }}
      >
        <SectionLabel>Phản hồi</SectionLabel>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: 48,
          }}
        >
          Bác sĩ tin dùng
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          <TestimonialCard
            quote="MediScribeAI giúp tôi tiết kiệm 45 phút mỗi ngày. Trước đây tôi phải gõ SOAP note thủ công sau mỗi ca khám."
            name="Nguyễn Văn A"
            title="Bác sĩ Nội khoa, BV Bạch Mai"
            avatarBg="#1a3a3a"
            avatarInitials="NV"
          />
          <TestimonialCard
            quote="Tính năng phân biệt giọng bác sĩ và bệnh nhân rất chính xác. SOAP note xuất ra gần như không cần chỉnh sửa."
            name="Trần Thị H"
            title="Bác sĩ Nhi khoa, BV Nhi TW"
            avatarBg="#ff4d8b"
            avatarInitials="TH"
          />
          <TestimonialCard
            quote="Chế độ cấp cứu thực sự hữu ích. Khi có ca khẩn, chỉ cần bật switch là hệ thống log ngay."
            name="Lê Minh K"
            title="Bác sĩ Cấp cứu, BV 108"
            avatarBg="#e8b94a"
            avatarInitials="LM"
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{ padding: "0 32px 96px", maxWidth: 1280, margin: "0 auto" }}
      >
        <div
          style={{
            background: "#1a3a3a",
            borderRadius: 24,
            padding: 80,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.5)",
                marginBottom: 16,
              }}
            >
              Bắt đầu hôm nay
            </div>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: "-1px",
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Chuyển đổi phòng khám của bạn với AI
            </h2>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 16 }}>
              Dùng thử miễn phí 30 ngày. Không cần thẻ tín dụng.
            </p>
          </div>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 48,
              padding: "0 32px",
              fontSize: 15,
              fontWeight: 600,
              background: "#fffaf0",
              color: "#0a0a0a",
              borderRadius: 12,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Bắt đầu miễn phí →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
