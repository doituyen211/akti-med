"use client";

import React from "react";
import Link from "next/link";

/**
 * Application footer. Contains quick links to other pages and legal text.
 * The design is kept minimal and responsive to align with the rest of
 * MediScribeAI’s aesthetic.
 */
export default function Footer() {
  return (
    <footer
      style={{
        background: "#faf5e8",
        borderTop: "1px solid #e5e5e5",
        padding: "40px 32px",
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
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "Space Mono, monospace",
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff4d8b",
              }}
            />
            MediScribe<span style={{ color: "#ff4d8b" }}>AI</span>
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
        <div>
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
            Sản phẩm
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link
              href="/"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Tính năng
            </Link>
            <Link
              href="/pricing"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Bảng giá
            </Link>
            <Link
              href="/docs"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              API
            </Link>
            <Link
              href="/docs"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Changelog
            </Link>
          </div>
        </div>
        <div>
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
            Công ty
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link
              href="/about"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Về chúng tôi
            </Link>
            <Link
              href="/about"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Blog
            </Link>
            <Link
              href="/about"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Tuyển dụng
            </Link>
            <Link
              href="/about"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Liên hệ
            </Link>
          </div>
        </div>
        <div>
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
            Pháp lý
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link
              href="/terms"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Điều khoản dịch vụ
            </Link>
            <Link
              href="/privacy"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Chính sách riêng tư
            </Link>
            <Link
              href="/privacy"
              style={{ fontSize: 14, color: "#6a6a6a", textDecoration: "none" }}
            >
              Cookie
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1280,
          margin: "40px auto 0",
          paddingTop: 24,
          borderTop: "1px solid #e5e5e5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 13, color: "#6a6a6a" }}>
          © 2025 MediScribeAI. Bảo lưu mọi quyền.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <span
            style={{ cursor: "pointer", fontSize: 13, color: "#6a6a6a" }}
            onClick={() => alert("🚀 Sắp ra mắt!")}
          >
            Twitter
          </span>
          <span
            style={{ cursor: "pointer", fontSize: 13, color: "#6a6a6a" }}
            onClick={() => alert("🚀 Sắp ra mắt!")}
          >
            LinkedIn
          </span>
          <span
            style={{ cursor: "pointer", fontSize: 13, color: "#6a6a6a" }}
            onClick={() => alert("🚀 Sắp ra mắt!")}
          >
            GitHub
          </span>
        </div>
      </div>
    </footer>
  );
}
