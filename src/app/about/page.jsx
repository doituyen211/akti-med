import React from "react";

/**
 * About page. Presents a mission statement and introduces the founding
 * team. The layout includes a hero section and a team grid inspired by
 * the original design.
 */
export default function AboutPage() {
  const team = [
    {
      name: "Trần Lâm",
      role: "CEO & Co‑founder",
      detail: "MD, OUCRU",
      initials: "TL",
      color: "#1a3a3a",
    },
    {
      name: "Nguyễn Hà",
      role: "CTO",
      detail: "AI/ML Engineer",
      initials: "NH",
      color: "#ff4d8b",
    },
    {
      name: "Phạm Duy",
      role: "Head of Product",
      detail: "Ex‑Vinmec",
      initials: "PD",
      color: "#b8a4ed",
    },
    {
      name: "Lý Kim",
      role: "Medical Advisor",
      detail: "Prof. Y Hà Nội",
      initials: "LK",
      color: "#e8b94a",
    },
  ];
  return (
    <div>
      <div
        style={{
          padding: "96px 32px",
          textAlign: "center",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div
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
        </div>
        <h1
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: -2,
            marginBottom: 20,
          }}
        >
          Xây dựng tương lai
          <br />
          của y tế Việt Nam
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#3a3a3a",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          Chúng tôi tin rằng AI có thể giúp bác sĩ tập trung vào điều quan trọng
          nhất: chăm sóc bệnh nhân.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
            maxWidth: 900,
            margin: "48px auto 0",
          }}
        >
          {team.map((member, idx) => (
            <div
              key={idx}
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
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                  background: member.color,
                }}
              >
                {member.initials}
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                {member.name}
              </div>
              <div style={{ fontSize: 13, color: "#6a6a6a" }}>
                {member.role}
              </div>
              <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 4 }}>
                {member.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
      <section
        style={{ padding: "0 32px 96px", maxWidth: 800, margin: "0 auto" }}
      >
        <h2
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 16,
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
          giờ mỗi ngày để ghi chép hồ sơ bệnh án thay vì tập trung chữa bệnh.
        </p>
        <p style={{ fontSize: 16, color: "#3a3a3a", lineHeight: 1.7 }}>
          Chúng tôi sử dụng AI tiên tiến nhất để tự động hóa công việc hành
          chính, giúp bác sĩ có thêm thời gian cho bệnh nhân — đây là điều thực
          sự quan trọng.
        </p>
      </section>
    </div>
  );
}
