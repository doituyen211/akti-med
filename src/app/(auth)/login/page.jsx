"use client";
import React, { useState, useContext } from "react";
import { UserContext } from "../../../components/ui/UserContext";
import { useRouter } from "next/navigation";

/**
 * Login page. Users choose a role and enter credentials to authenticate. In
 * this demo implementation there is no backend validation; instead we set
 * a user object in context and redirect to the dashboard on submit. The
 * roles defined here mirror those used throughout the dashboard and
 * determine which view the user sees.
 */
export default function LoginPage() {
  const roles = [
    { key: "admin", label: "Admin" },
    { key: "doctor", label: "Bác sĩ" },
    { key: "nurse", label: "Y tá" },
    { key: "patient", label: "Bệnh nhân" },
  ];
  const { setUser } = useContext(UserContext);
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application this would be validated against a backend. Here
    // we simply store the role and email in context and navigate.
    setUser({
      email: email || `${selectedRole}@mediscribe.ai`,
      role: selectedRole,
      name: roles.find((r) => r.key === selectedRole)?.label ?? selectedRole,
    });
    router.push("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e5e5",
          borderRadius: 16,
          padding: 32,
          width: "100%",
          maxWidth: 420,
        }}
      >
        <h2 style={{ fontSize: 28, marginBottom: 8 }}>Đăng nhập</h2>
        <p style={{ fontSize: 14, color: "#6a6a6a", marginBottom: 24 }}>
          Chào mừng trở lại! Vui lòng chọn vai trò và đăng nhập.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Vai trò
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 8,
              }}
            >
              {roles.map((role) => (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => setSelectedRole(role.key)}
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border:
                      selectedRole === role.key
                        ? "1px solid #0a0a0a"
                        : "1px solid #e5e5e5",
                    background:
                      selectedRole === role.key ? "#0a0a0a" : "#fffaf0",
                    color: selectedRole === role.key ? "#ffffff" : "#3a3a3a",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e5e5",
                background: "#fffaf0",
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
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
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e5e5",
                background: "#fffaf0",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: "#0a0a0a",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Đăng nhập
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 13,
            color: "#6a6a6a",
          }}
        >
          Chưa có tài khoản?{" "}
          <span
            style={{ color: "#0a0a0a", cursor: "pointer", fontWeight: 600 }}
            onClick={() => alert("Liên hệ admin để tạo tài khoản")}
          >
            Liên hệ admin
          </span>
        </p>
        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: "#faf5e8",
            borderRadius: 8,
            fontSize: 12,
            color: "#6a6a6a",
          }}
        >
          <b>Demo:</b> Chọn vai trò → bấm Đăng nhập (mật khẩu bất kỳ)
        </div>
      </div>
    </div>
  );
}
