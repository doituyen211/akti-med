/**
 * Trang đăng nhập — chọn role, nhập email/password.
 * Dùng demoLogin() khi chưa có backend thật.
 */

"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const ROLES = [
  { id: "admin", label: "Admin", icon: "ti-crown" },
  { id: "doctor", label: "Bác sĩ", icon: "ti-stethoscope" },
  { id: "nurse", label: "Y tá", icon: "ti-nurse" },
  { id: "patient", label: "Bệnh nhân", icon: "ti-user" },
];

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    // Thử API thật trước, nếu lỗi → dùng demoLogin
    const result = await login({ email, password, role: selectedRole });
    if (!result.success) {
      // Fallback demo (xóa dòng này khi backend sẵn sàng)
      demoLogin(selectedRole, email);
    }
    setIsLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        background: "#fffaf0",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e5e5",
          borderRadius: 24,
          padding: 48,
          maxWidth: 420,
          width: "100%",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 8,
            }}
          >
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
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              MediScribe<span style={{ color: "#ff4d8b" }}>AI</span>
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.5px",
              marginBottom: 6,
            }}
          >
            Đăng nhập
          </h1>
          <p style={{ fontSize: 14, color: "#9a9a9a", marginBottom: 28 }}>
            Chào mừng trở lại! Vui lòng chọn vai trò và đăng nhập.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Role selector */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#1a1a1a",
                marginBottom: 8,
              }}
            >
              Vai trò
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {ROLES.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    style={{
                      padding: 10,
                      border: "1px solid",
                      borderColor: isSelected ? "#0a0a0a" : "#e5e5e5",
                      borderRadius: 12,
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: 500,
                      background: isSelected ? "#0a0a0a" : "#fffaf0",
                      color: isSelected ? "#fff" : "#6a6a6a",
                      transition: "all 0.15s",
                    }}
                  >
                    <i
                      className={`ti ${role.icon}`}
                      style={{
                        display: "block",
                        fontSize: 18,
                        marginBottom: 4,
                      }}
                    />
                    {role.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#1a1a1a",
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="bsnguyenvan@hospital.vn"
              style={{
                width: "100%",
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                background: "#faf5e8",
                color: "#0a0a0a",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#1a1a1a",
                marginBottom: 6,
              }}
            >
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                background: "#faf5e8",
                color: "#0a0a0a",
                outline: "none",
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              height: 44,
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              borderRadius: 12,
              background: isLoading ? "#9a9a9a" : "#0a0a0a",
              color: "#fff",
              cursor: isLoading ? "wait" : "pointer",
              transition: "background 0.15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {isLoading ? (
              <>
                <i
                  className="ti ti-loader-2"
                  style={{ animation: "spin 1s linear infinite" }}
                />{" "}
                Đang đăng nhập...
              </>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 13,
            color: "#9a9a9a",
          }}
        >
          Chưa có tài khoản?{" "}
          <span
            style={{ color: "#0a0a0a", cursor: "pointer", fontWeight: 600 }}
          >
            Liên hệ admin
          </span>
        </p>

        {/* Demo hint */}
        <div
          style={{
            marginTop: 16,
            padding: 12,
            background: "#faf5e8",
            borderRadius: 12,
            fontSize: 12,
            color: "#9a9a9a",
          }}
        >
          <strong>Demo:</strong> Chọn vai trò → bấm Đăng nhập (mật khẩu bất kỳ)
        </div>
      </div>
    </div>
  );
}
