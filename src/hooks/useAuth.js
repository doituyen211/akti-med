/**
 * Custom hook bọc auth store + gọi API login/logout.
 * Components chỉ cần import hook này, không import store trực tiếp.
 */

"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store";
import { useNotifStore } from "@/app/store";
import { login as apiLogin, logout as apiLogout } from "@/lib/api";

export function useAuth() {
  const router = useRouter();
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const { showNotif } = useNotifStore();

  /**
   * Đăng nhập: gọi API → lưu store → set cookie → redirect dashboard
   * @param {{ email: string, password: string, role: string }} credentials
   */
  async function login(credentials) {
    try {
      // Gọi FastAPI POST /auth/login
      const data = await apiLogin(credentials);
      // Lưu vào Zustand store (tự persist localStorage)
      setAuth(data.user, data.accessToken);
      // Set cookie để middleware Edge Runtime đọc được
      document.cookie = `mediscribe-token=${data.accessToken}; path=/; max-age=86400; SameSite=Strict`;
      showNotif("✅ Đăng nhập thành công", "success");
      router.push("/dashboard");
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.detail || "Email hoặc mật khẩu không đúng";
      showNotif(message, "error");
      return { success: false, error: message };
    }
  }

  /**
   * Demo login — dùng khi chưa có backend thật.
   * Tạo user giả dựa trên role được chọn.
   */
  function demoLogin(role, email) {
    const demoUsers = {
      admin: {
        id: "demo-admin",
        name: "Admin Demo",
        hospital: "MediScribeAI HQ",
      },
      doctor: {
        id: "demo-doctor",
        name: "BS. Nguyễn Demo",
        hospital: "BV Bạch Mai",
      },
      nurse: { id: "demo-nurse", name: "Y tá Lan Demo", hospital: "BV Nhi TW" },
      patient: { id: "demo-patient", name: "Bệnh nhân Demo", hospital: "" },
    };

    const base = demoUsers[role] || demoUsers.doctor;
    const user = {
      ...base,
      email: email || `${role}@demo.mediscribe.ai`,
      role,
    };

    setAuth(user, "demo-token-" + role);

    // Set cookie cho middleware
    document.cookie = `mediscribe-token=demo-token-${role}; path=/; max-age=86400; SameSite=Strict`;

    showNotif(`✅ Đăng nhập thành công (${role})`, "success");
    router.push("/dashboard");
  }

  /**
   * Đăng xuất: xóa store → xóa cookie → về trang chủ
   */
  async function logout() {
    try {
      await apiLogout();
    } catch {
      // Bỏ qua lỗi API khi logout (token đã hết hạn, etc.)
    }
    clearAuth();
    // Xóa cookie
    document.cookie = "mediscribe-token=; path=/; max-age=0";
    showNotif("Đã đăng xuất", "info");
    router.push("/");
  }

  return {
    user,
    token,
    isAuthenticated,
    role: user?.role,
    login,
    demoLogin,
    logout,
  };
}
