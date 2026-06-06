"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

/**
 * Top navigation bar.
 * UI giữ theo navbar cũ.
 * Logic auth dùng useAuth: user, isAuthenticated, logout.
 */
export default function TopNav() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const links = [
    { href: "/", label: "Trang chủ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/pricing", label: "Bảng giá" },
    { href: "/docs", label: "Tài liệu" },
    { href: "/terms", label: "Điều khoản" },
    { href: "/privacy", label: "Riêng tư" },
  ];

  const isActiveLink = (href) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fffaf0",
        borderBottom: "1px solid #e5e5e5",
        height: 64,
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        gap: 24,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: 20,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "#0a0a0a",
          textDecoration: "none",
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
      </Link>

      <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
        {links.map(({ href, label }) => {
          const isActive = isActiveLink(href);

          return (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "8px 12px",
                borderRadius: 8,
                color: isActive ? "#0a0a0a" : "#6a6a6a",
                background: isActive ? "#f5f0e0" : "transparent",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginLeft: 16,
        }}
      >
        {!isAuthenticated && (
          <>
            <Link
              href="/login"
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 14,
                fontWeight: 600,
                color: "#0a0a0a",
                textDecoration: "none",
              }}
            >
              Đăng nhập
            </Link>

            <Link
              href="/login"
              style={{
                background: "#0a0a0a",
                color: "#ffffff",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Dùng thử
            </Link>
          </>
        )}

        {isAuthenticated && user && (
          <>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#6a6a6a" }}>
              Xin chào, <b style={{ color: "#0a0a0a" }}>{user.name}</b>
            </span>

            <button
              onClick={logout}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 6,
                padding: "6px 10px",
                fontSize: 13,
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
