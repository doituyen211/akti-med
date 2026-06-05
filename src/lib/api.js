/**
 * lib/api.js
 * Axios client + toàn bộ hàm gọi API tới FastAPI backend.
 * Frontend chỉ import từ đây — không gọi fetch/axios trực tiếp ở components.
 *
 * Base URL được cấu hình qua env: NEXT_PUBLIC_API_URL
 */

import axios from "axios";

// ─── Axios Instance ───────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  timeout: 30000, // 30s — audio upload có thể chậm
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: tự động gắn JWT token vào header
api.interceptors.request.use((config) => {
  // Đọc token từ localStorage (được Zustand persist lưu)
  try {
    const raw = localStorage.getItem("mediscribe-auth");
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed?.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // Bỏ qua nếu localStorage không khả dụng (SSR)
  }
  return config;
});

// Response interceptor: xử lý lỗi chung (401 → redirect login)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Xóa auth state và redirect về login
      localStorage.removeItem("mediscribe-auth");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// ─── Auth API ─────────────────────────────────────────────────────────────────

/**
 * Đăng nhập — trả về { user, accessToken, refreshToken }
 * @param {{ email: string, password: string, role: string }} credentials
 */
export async function login(credentials) {
  const res = await api.post("/auth/login", credentials);
  return res.data;
}

/**
 * Đăng xuất — backend xóa refresh token
 */
export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

/**
 * Lấy thông tin user hiện tại từ token
 */
export async function getMe() {
  const res = await api.get("/auth/me");
  return res.data;
}

// ─── Encounter API ────────────────────────────────────────────────────────────

/**
 * Lấy danh sách ca khám (có thể filter theo doctorId, status, date)
 * @param {{ doctorId?: string, status?: string, date?: string }} params
 */
export async function getEncounters(params = {}) {
  const res = await api.get("/encounters", { params });
  return res.data;
}

/**
 * Tạo ca khám mới (sau khi bệnh nhân đồng thuận)
 * @param {{ patientId: string, doctorId: string, chiefComplaint: string, consentConfirmed: boolean }} data
 */
export async function createEncounter(data) {
  const res = await api.post("/encounters", data);
  return res.data;
}

/**
 * Lấy chi tiết một ca khám
 * @param {string} encounterId
 */
export async function getEncounter(encounterId) {
  const res = await api.get(`/encounters/${encounterId}`);
  return res.data;
}

/**
 * Cập nhật trạng thái ca khám (vd: kết thúc, chuyển emergency)
 * @param {string} encounterId
 * @param {{ status?: string, isEmergency?: boolean, endedAt?: string }} updates
 */
export async function updateEncounter(encounterId, updates) {
  const res = await api.patch(`/encounters/${encounterId}`, updates);
  return res.data;
}

// ─── Audio / ASR API ──────────────────────────────────────────────────────────

/**
 * Upload file âm thanh để transcribe (Whisper via Groq)
 * Trả về transcript segments.
 * @param {string} encounterId
 * @param {File} audioFile
 * @param {(progress: number) => void} onProgress  - callback upload progress
 */
export async function uploadAudio(encounterId, audioFile, onProgress) {
  const formData = new FormData();
  formData.append("audio", audioFile);
  formData.append("encounter_id", encounterId);
  formData.append("language", "vi");

  const res = await api.post("/asr/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded * 100) / e.total));
      }
    },
  });
  return res.data;
}

/**
 * Lấy transcript của một ca khám
 * @param {string} encounterId
 */
export async function getTranscript(encounterId) {
  const res = await api.get(`/encounters/${encounterId}/transcript`);
  return res.data;
}

// ─── SOAP Note API ────────────────────────────────────────────────────────────

/**
 * Tạo SOAP Note từ transcript bằng Llama-3 (Groq)
 * @param {string} encounterId
 */
export async function generateSoapNote(encounterId) {
  const res = await api.post(`/encounters/${encounterId}/soap/generate`);
  return res.data; // SOAPNote object
}

/**
 * Lấy SOAP Note hiện tại của ca khám
 * @param {string} encounterId
 */
export async function getSoapNote(encounterId) {
  const res = await api.get(`/encounters/${encounterId}/soap`);
  return res.data;
}

/**
 * Lưu / cập nhật SOAP Note (sau khi bác sĩ review & edit)
 * @param {string} encounterId
 * @param {{ subjective: string, objective: string, assessment: string, plan: string }} soapData
 */
export async function saveSoapNote(encounterId, soapData) {
  const res = await api.put(`/encounters/${encounterId}/soap`, soapData);
  return res.data;
}

/**
 * Finalize SOAP Note — kích hoạt background tasks (in giấy, EMR update)
 * @param {string} encounterId
 */
export async function finalizeSoapNote(encounterId) {
  const res = await api.post(`/encounters/${encounterId}/soap/finalize`);
  return res.data;
}

// ─── Agent API ────────────────────────────────────────────────────────────────

/**
 * Gửi lệnh text tới Agent (LangGraph tool calling)
 * @param {string} encounterId
 * @param {string} commandText  - Lệnh ngôn ngữ tự nhiên từ bác sĩ
 */
export async function runAgentCommand(encounterId, commandText) {
  const res = await api.post(`/agent/command`, {
    encounter_id: encounterId,
    command: commandText,
  });
  return res.data; // { toolName, result, executedAt }
}

// ─── Patient API ──────────────────────────────────────────────────────────────

/**
 * Tìm kiếm bệnh nhân theo tên / BHYT / CMND
 * @param {string} query
 */
export async function searchPatients(query) {
  const res = await api.get("/patients/search", { params: { q: query } });
  return res.data;
}

/**
 * Lấy thông tin bệnh nhân kèm lịch sử khám
 * @param {string} patientId
 */
export async function getPatient(patientId) {
  const res = await api.get(`/patients/${patientId}`);
  return res.data;
}

/**
 * Kiểm tra tình trạng BHYT của bệnh nhân
 * @param {string} bhytCode
 */
export async function checkBhyt(bhytCode) {
  const res = await api.get(`/patients/bhyt/${bhytCode}`);
  return res.data;
}

// ─── Emergency Log API ────────────────────────────────────────────────────────

/**
 * Lưu emergency log entry
 * @param {string} encounterId
 * @param {{ speaker: string, text: string, isCommand: boolean }} entry
 */
export async function saveEmergencyLog(encounterId, entry) {
  const res = await api.post(`/encounters/${encounterId}/emergency-log`, entry);
  return res.data;
}

// ─── Admin API ────────────────────────────────────────────────────────────────

/**
 * Lấy danh sách users (admin only)
 * @param {{ role?: string, page?: number, pageSize?: number }} params
 */
export async function getUsers(params = {}) {
  const res = await api.get("/admin/users", { params });
  return res.data;
}

/**
 * Lấy dashboard stats tổng quan (admin)
 */
export async function getDashboardStats() {
  const res = await api.get("/admin/stats");
  return res.data;
}

/**
 * Approve / reject user registration
 * @param {string} userId
 * @param {'approved' | 'rejected'} status
 */
export async function updateUserStatus(userId, status) {
  const res = await api.patch(`/admin/users/${userId}/status`, { status });
  return res.data;
}

// ─── Export default instance (nếu cần dùng trực tiếp) ────────────────────────
export default api;
