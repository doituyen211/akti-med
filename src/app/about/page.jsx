/**
 * Trang Giới thiệu — team, sứ mệnh, giá trị cốt lõi.
 */

import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Về chúng tôi — MediScribeAI",
  description: "Xây dựng tương lai của y tế Việt Nam với AI.",
};

const TEAM = [
  {
    initials: "TL",
    name: "Trần Lâm",
    title: "CEO & Co-founder",
    sub: "MD, OUCRU",
    bg: "#1a3a3a",
  },
  {
    initials: "NH",
    name: "Nguyễn Hà",
    title: "CTO",
    sub: "AI/ML Engineer",
    bg: "#ff4d8b",
  },
  {
    initials: "PD",
    name: "Phạm Duy",
    title: "Head of Product",
    sub: "Ex-Vinmec Digital",
    bg: "#b8a4ed",
  },
  {
    initials: "LK",
    name: "Lý Kim",
    title: "Medical Advisor",
    sub: "GS. ĐH Y Hà Nội",
    bg: "#e8b94a",
  },
];

const VALUES = [
  {
    icon: "ti-heart",
    color: "#ff4d8b",
    title: "Bệnh nhân là trung tâm",
    desc: "Mọi tính năng đều hướng đến mục tiêu cải thiện chất lượng chăm sóc bệnh nhân.",
  },
  {
    icon: "ti-shield",
    color: "#1a3a3a",
    title: "Bảo mật tuyệt đối",
    desc: "Dữ liệu y tế là nhạy cảm nhất. Chúng tôi mã hóa tất cả và không bao giờ bán dữ liệu.",
  },
  {
    icon: "ti-bulb",
    color: "#e8b94a",
    title: "AI có trách nhiệm",
    desc: "AI hỗ trợ, không thay thế bác sĩ. Mọi output đều cần bác sĩ review trước khi sử dụng.",
  },
  {
    icon: "ti-globe",
    color: "#b8a4ed",
    title: "Phục vụ Việt Nam",
    desc: "Xây dựng bởi người Việt, cho hệ thống y tế Việt Nam, với hiểu biết sâu về ngữ cảnh địa phương.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "96px 32px 64px",
          textAlign: "center",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 9999,
            background: "rgba(26,58,58,.1)",
            color: "#1a3a3a",
            marginBottom: 16,
          }}
        >
          Về chúng tôi
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
          Xây dựng tương lai
          <br />
          của y tế Việt Nam
        </h1>
        <p style={{ fontSize: 18, color: "#3a3a3a", lineHeight: 1.6 }}>
          Chúng tôi tin rằng AI có thể giúp bác sĩ tập trung vào điều quan trọng
          nhất: chăm sóc bệnh nhân.
        </p>
      </section>

      {/* ── Mission ── */}
      <section
        style={{ padding: "0 32px 80px", maxWidth: 800, margin: "0 auto" }}
      >
        <div style={{ background: "#f5f0e0", borderRadius: 24, padding: 48 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 16,
              letterSpacing: "-0.5px",
            }}
          >
            Sứ mệnh
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#3a3a3a",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            MediScribeAI ra đời từ nỗi trăn trở của những bác sĩ phải dành hàng
            giờ mỗi ngày để ghi chép hồ sơ bệnh án thay vì tập trung vào chữa
            bệnh.
          </p>
          <p style={{ fontSize: 16, color: "#3a3a3a", lineHeight: 1.7 }}>
            Chúng tôi sử dụng AI tiên tiến nhất — Whisper Large v3, Llama-3-70B,
            Silero VAD — để tự động hóa công việc hành chính, giúp bác sĩ có
            thêm thời gian cho bệnh nhân. Đây là điều thực sự quan trọng.
          </p>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        style={{ padding: "0 32px 80px", maxWidth: 1280, margin: "0 auto" }}
      >
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
          Đội ngũ
        </div>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: 40,
          }}
        >
          Những người xây dựng
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {TEAM.map((member) => (
            <div
              key={member.name}
              style={{
                background: "#f5f0e0",
                borderRadius: 16,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: member.bg,
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {member.initials}
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                {member.name}
              </div>
              <div style={{ fontSize: 13, color: "#6a6a6a", marginBottom: 4 }}>
                {member.title}
              </div>
              <div style={{ fontSize: 12, color: "#9a9a9a" }}>{member.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section
        style={{ padding: "0 32px 96px", maxWidth: 1280, margin: "0 auto" }}
      >
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
          Giá trị cốt lõi
        </div>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: 40,
          }}
        >
          Chúng tôi tin vào
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          {VALUES.map((v) => (
            <div
              key={v.title}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 16,
                padding: 32,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${v.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <i
                  className={`ti ${v.icon}`}
                  style={{ fontSize: 22, color: v.color }}
                />
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {v.title}
              </h3>
              <p style={{ fontSize: 15, color: "#6a6a6a", lineHeight: 1.6 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats banner ── */}
      <section
        style={{ padding: "0 32px 96px", maxWidth: 1280, margin: "0 auto" }}
      >
        <div
          style={{
            background: "#1a3a3a",
            borderRadius: 24,
            padding: "48px 64px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            textAlign: "center",
          }}
        >
          {[
            { value: "50+", label: "Bệnh viện" },
            { value: "248", label: "Bác sĩ dùng" },
            { value: "94K+", label: "SOAP Notes" },
            { value: "97.2%", label: "Độ chính xác" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-1px",
                  marginBottom: 4,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.6)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
