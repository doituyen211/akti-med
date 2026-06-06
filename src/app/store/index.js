/**
 * Zustand global state — JS (no TypeScript).
 * Quản lý: Auth, Encounter UI, Notifications.
 *
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Auth Store ───────────────────────────────────────────────────────────────
// Lưu user + token. Persist vào localStorage để giữ session qua reload.

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { id, email, name, role, hospital, ... }
      token: null, // JWT access token
      isAuthenticated: false,

      /** Gọi sau khi login thành công */
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),

      /** Xóa session khi logout */
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),

      /** Cập nhật một vài field của user (vd: sau update profile) */
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    {
      name: "mediscribe-auth", // key localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// ─── Encounter Store ──────────────────────────────────────────────────────────
// Trạng thái UI của màn hình ghi âm / SOAP Note.

const initialEncounterState = {
  recordingStatus: "idle", // 'idle' | 'recording' | 'stopped' | 'processing'
  recordingSeconds: 0,
  isEmergencyMode: false,
  isConsentConfirmed: false,
  soapGenerationStatus: "idle", // 'idle' | 'generating' | 'done' | 'error'
  transcriptSegments: [], // [{ id, speaker, text, startTime, isFinal }]
  emergencyLog: [], // [{ id, timestamp, speaker, text }]
  soapDraft: {
    // SOAP Note đang được edit
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    status: "draft",
  },
  agentCommands: [], // lịch sử lệnh agent trong phiên
  activeCommand: null,
};

export const useEncounterStore = create((set) => ({
  ...initialEncounterState,

  // ── Recording controls ──
  setRecordingStatus: (status) => set({ recordingStatus: status }),
  setRecordingSeconds: (s) => set({ recordingSeconds: s }),
  incrementRecordingSeconds: () =>
    set((state) => ({ recordingSeconds: state.recordingSeconds + 1 })),

  // ── Emergency mode ──
  toggleEmergencyMode: () =>
    set((state) => ({ isEmergencyMode: !state.isEmergencyMode })),

  // ── Consent ──
  setConsentConfirmed: (confirmed) => set({ isConsentConfirmed: confirmed }),

  // ── SOAP generation status ──
  setSoapGenerationStatus: (status) => set({ soapGenerationStatus: status }),

  // ── Transcript ──
  /** Thêm segment mới từ WebSocket / demo */
  addTranscriptSegment: (segment) =>
    set((state) => ({
      transcriptSegments: [...state.transcriptSegments, segment],
    })),

  /** Cập nhật text của segment cuối (khi ASR chưa finalize) */
  updateLastSegment: (text, isFinal) =>
    set((state) => {
      const segs = [...state.transcriptSegments];
      if (segs.length > 0) {
        segs[segs.length - 1] = { ...segs[segs.length - 1], text, isFinal };
      }
      return { transcriptSegments: segs };
    }),

  // ── SOAP Draft ──
  updateSoapField: (field, value) =>
    set((state) => ({
      soapDraft: { ...state.soapDraft, [field]: value },
    })),

  /** Set toàn bộ SOAP từ AI response */
  setAiGeneratedSoap: (soap) =>
    set((state) => ({
      soapDraft: { ...state.soapDraft, ...soap, status: "ai-generated" },
      soapGenerationStatus: "done",
    })),

  // ── Emergency log ──
  addEmergencyLogEntry: (entry) =>
    set((state) => ({
      emergencyLog: [...state.emergencyLog, entry],
    })),

  // ── Agent commands ──
  addAgentCommand: (cmd) =>
    set((state) => ({
      agentCommands: [...state.agentCommands, cmd],
      activeCommand: cmd,
    })),

  updateAgentCommand: (id, updates) =>
    set((state) => ({
      agentCommands: state.agentCommands.map((c) =>
        c.id === id ? { ...c, ...updates } : c,
      ),
      activeCommand:
        state.activeCommand?.id === id
          ? { ...state.activeCommand, ...updates }
          : state.activeCommand,
    })),

  /** Reset khi bắt đầu ca mới */
  resetEncounter: () => set(initialEncounterState),
}));

// ─── Notification Store ───────────────────────────────────────────────────────
// Toast notification toàn app.

export const useNotifStore = create((set, get) => ({
  notifications: [], // [{ id, message, type }]  type: 'success'|'error'|'warning'|'info'

  /** Hiển thị toast, tự xóa sau `duration` ms */
  showNotif: (message, type = "info", duration = 3000) => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
    setTimeout(() => get().removeNotif(id), duration);
  },

  removeNotif: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
