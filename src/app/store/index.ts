/**
 * Zustand global state store.
 * Quản lý: Auth state, Encounter UI state, Notifications.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  User,
  UserRole,
  EncounterUIState,
  TranscriptSegment,
  EmergencyLogEntry,
  SOAPNote,
  AgentCommand,
} from '@/types';

// ─── Auth Store ───────────────────────────────────────────────────────────────

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  /** Gọi sau khi login thành công từ API */
  setAuth: (user: User, token: string) => void;
  /** Xóa session khi logout */
  clearAuth: () => void;
  /** Update một số field của user (vd: sau khi update profile) */
  updateUser: (partial: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  // persist: lưu token vào localStorage để giữ session
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      clearAuth: () =>
        set({ user: null, token: null, isAuthenticated: false }),

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    {
      name: 'mediscribe-auth',    // key trong localStorage
      storage: createJSONStorage(() => localStorage),
      // Chỉ persist những field cần thiết
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ─── Encounter Store ──────────────────────────────────────────────────────────

interface EncounterStore extends EncounterUIState {
  /** Transcript segments hiển thị realtime */
  transcriptSegments: TranscriptSegment[];
  /** Emergency log entries */
  emergencyLog: EmergencyLogEntry[];
  /** SOAP Note đang được chỉnh sửa */
  soapDraft: Partial<SOAPNote>;
  /** Lịch sử các agent commands trong phiên */
  agentCommands: AgentCommand[];

  // ── Actions ──
  setRecordingStatus: (status: EncounterUIState['recordingStatus']) => void;
  setRecordingSeconds: (seconds: number) => void;
  incrementRecordingSeconds: () => void;
  toggleEmergencyMode: () => void;
  setConsentConfirmed: (confirmed: boolean) => void;
  setSoapGenerationStatus: (status: EncounterUIState['soapGenerationStatus']) => void;

  /** Thêm segment mới vào transcript (gọi từ WebSocket handler) */
  addTranscriptSegment: (segment: TranscriptSegment) => void;
  /** Cập nhật segment cuối khi nhận final transcript */
  updateLastSegment: (text: string, isFinal: boolean) => void;

  /** Cập nhật SOAP draft field */
  updateSoapField: (field: keyof Pick<SOAPNote, 'subjective' | 'objective' | 'assessment' | 'plan'>, value: string) => void;
  /** Set toàn bộ SOAP từ AI response */
  setAiGeneratedSoap: (soap: Partial<SOAPNote>) => void;

  /** Thêm emergency log entry */
  addEmergencyLogEntry: (entry: EmergencyLogEntry) => void;

  /** Thêm agent command vào lịch sử */
  addAgentCommand: (cmd: AgentCommand) => void;
  /** Cập nhật kết quả của agent command */
  updateAgentCommand: (id: string, updates: Partial<AgentCommand>) => void;

  /** Reset toàn bộ encounter state khi bắt đầu ca mới */
  resetEncounter: () => void;
}

const initialEncounterState: Omit<
  EncounterStore,
  | 'setRecordingStatus' | 'setRecordingSeconds' | 'incrementRecordingSeconds'
  | 'toggleEmergencyMode' | 'setConsentConfirmed' | 'setSoapGenerationStatus'
  | 'addTranscriptSegment' | 'updateLastSegment'
  | 'updateSoapField' | 'setAiGeneratedSoap'
  | 'addEmergencyLogEntry' | 'addAgentCommand' | 'updateAgentCommand'
  | 'resetEncounter' | 'activeCommand'
> = {
  recordingStatus: 'idle',
  recordingSeconds: 0,
  isEmergencyMode: false,
  isConsentConfirmed: false,
  soapGenerationStatus: 'idle',
  transcriptSegments: [],
  emergencyLog: [],
  soapDraft: {},
  agentCommands: [],
};

export const useEncounterStore = create<EncounterStore>()((set) => ({
  ...initialEncounterState,
  activeCommand: null,

  setRecordingStatus: (status) => set({ recordingStatus: status }),
  setRecordingSeconds: (seconds) => set({ recordingSeconds: seconds }),
  incrementRecordingSeconds: () =>
    set((state) => ({ recordingSeconds: state.recordingSeconds + 1 })),

  toggleEmergencyMode: () =>
    set((state) => ({ isEmergencyMode: !state.isEmergencyMode })),

  setConsentConfirmed: (confirmed) => set({ isConsentConfirmed: confirmed }),
  setSoapGenerationStatus: (status) => set({ soapGenerationStatus: status }),

  addTranscriptSegment: (segment) =>
    set((state) => ({
      transcriptSegments: [...state.transcriptSegments, segment],
    })),

  updateLastSegment: (text, isFinal) =>
    set((state) => {
      const segments = [...state.transcriptSegments];
      if (segments.length > 0) {
        segments[segments.length - 1] = {
          ...segments[segments.length - 1],
          text,
          isFinal,
        };
      }
      return { transcriptSegments: segments };
    }),

  updateSoapField: (field, value) =>
    set((state) => ({
      soapDraft: { ...state.soapDraft, [field]: value },
    })),

  setAiGeneratedSoap: (soap) =>
    set((state) => ({
      soapDraft: { ...state.soapDraft, ...soap, status: 'ai-generated' },
      soapGenerationStatus: 'done',
    })),

  addEmergencyLogEntry: (entry) =>
    set((state) => ({
      emergencyLog: [...state.emergencyLog, entry],
    })),

  addAgentCommand: (cmd) =>
    set((state) => ({
      agentCommands: [...state.agentCommands, cmd],
      activeCommand: cmd,
    })),

  updateAgentCommand: (id, updates) =>
    set((state) => ({
      agentCommands: state.agentCommands.map((cmd) =>
        cmd.id === id ? { ...cmd, ...updates } : cmd
      ),
      activeCommand:
        state.activeCommand?.id === id
          ? { ...state.activeCommand, ...updates }
          : state.activeCommand,
    })),

  resetEncounter: () =>
    set({
      ...initialEncounterState,
      activeCommand: null,
    }),
}));

// ─── Notification Store ───────────────────────────────────────────────────────

export type NotifType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  message: string;
  type: NotifType;
}

interface NotifStore {
  notifications: Notification[];
  /** Hiển thị notification, tự xóa sau `duration` ms */
  showNotif: (message: string, type?: NotifType, duration?: number) => void;
  removeNotif: (id: string) => void;
}

export const useNotifStore = create<NotifStore>()((set, get) => ({
  notifications: [],

  showNotif: (message, type = 'info', duration = 3000) => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
    // Tự động xóa sau `duration` ms
    setTimeout(() => get().removeNotif(id), duration);
  },

  removeNotif: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));