/**
 * Footer dùng chung cho các trang marketing (home, about, pricing...).
 */

"use client";

import Link from "next/link";

function FooterCol({ title, links }) {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "#9a9a9a",
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      <div className="flex flex-col gap-3">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            className="hover:text-ink transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#faf5e8",
        borderTop: "1px solid #e5e5e5",
        padding: "80px 32px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff4d8b",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              MediScribe<span style={{ color: "#ff4d8b" }}>AI</span>
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              color: "#6a6a6a",
              lineHeight: 1.6,
              maxWidth: 280,
            }}
          >
            Nền tảng AI hỗ trợ y tế đầu tiên tại Việt Nam, giúp bác sĩ làm việc
            thông minh hơn.
          </p>
        </div>

        <FooterCol
          title="Sản phẩm"
          links={[
            { label: "Tính năng", href: "/" },
            { label: "Bảng giá", href: "/pricing" },
            { label: "API", href: "/docs" },
            { label: "Changelog", href: "/docs" },
          ]}
        />
        <FooterCol
          title="Công ty"
          links={[
            { label: "Về chúng tôi", href: "/about" },
            { label: "Blog", href: "/about" },
            { label: "Tuyển dụng", href: "/about" },
            { label: "Liên hệ", href: "/about" },
          ]}
        />
        <FooterCol
          title="Pháp lý"
          links={[
            { label: "Điều khoản dịch vụ", href: "/terms" },
            { label: "Chính sách riêng tư", href: "/privacy" },
            { label: "Cookie", href: "/privacy" },
          ]}
        />
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1280,
          margin: "48px auto 0",
          paddingTop: 24,
          borderTop: "1px solid #e5e5e5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 13, color: "#9a9a9a" }}>
          © 2025 MediScribeAI. Bảo lưu mọi quyền.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          {["Twitter", "LinkedIn", "GitHub"].map((s) => (
            <span
              key={s}
              style={{ fontSize: 13, color: "#9a9a9a", cursor: "pointer" }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
