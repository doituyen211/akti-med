// /**
//  * types/index.ts
//  * Định nghĩa toàn bộ TypeScript types/interfaces cho ứng dụng.
//  * Các type này mapping với Pydantic models ở FastAPI backend.
//  */

// // ─── Auth & Roles ────────────────────────────────────────────────────────────

// /** 4 vai trò hệ thống — mỗi role có UI riêng biệt */
// export type UserRole = 'admin' | 'doctor' | 'nurse' | 'patient';

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: UserRole;
//   avatar?: string;
//   /** Chứng chỉ hành nghề (bắt buộc với doctor/nurse) */
//   licenseNumber?: string;
//   hospital?: string;
//   department?: string;
//   createdAt: string;
// }

// export interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
// }

// export interface LoginCredentials {
//   email: string;
//   password: string;
//   role: UserRole;
// }

// export interface LoginResponse {
//   user: User;
//   accessToken: string;
//   refreshToken: string;
// }

// // ─── Patient & Encounter ─────────────────────────────────────────────────────

// export interface Patient {
//   id: string;
//   fullName: string;
//   dateOfBirth: string;
//   gender: 'male' | 'female' | 'other';
//   phone?: string;
//   address?: string;
//   /** Mã số bảo hiểm y tế */
//   bhytCode?: string;
//   bhytExpiry?: string;
//   bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
//   allergies?: string[];
//   chronicConditions?: string[];
// }

// export type EncounterStatus = 'waiting' | 'in-progress' | 'completed' | 'emergency';

// export interface Encounter {
//   id: string;
//   patientId: string;
//   patient?: Patient;
//   doctorId: string;
//   doctor?: User;
//   status: EncounterStatus;
//   chiefComplaint: string;
//   scheduledAt: string;
//   startedAt?: string;
//   endedAt?: string;
//   /** Consent đã được xác nhận trước khi ghi âm */
//   consentConfirmed: boolean;
//   soapNote?: SOAPNote;
//   transcriptId?: string;
//   isEmergency: boolean;
//   createdAt: string;
// }

// // ─── SOAP Note ───────────────────────────────────────────────────────────────

// /**
//  * Cấu trúc SOAP Note — mapping với SOAPNote Pydantic model ở backend.
//  * Llama-3-70B sẽ tạo ra đúng format JSON này.
//  */
// export interface SOAPNote {
//   id?: string;
//   encounterId: string;
//   /** Subjective: triệu chứng bệnh nhân tự mô tả */
//   subjective: string;
//   /** Objective: kết quả khám lâm sàng, chỉ số sinh tồn */
//   objective: {
//     vitals?: {
//       temperature?: number;  // °C
//       bloodPressure?: string; // "120/80"
//       heartRate?: number;    // bpm
//       respiratoryRate?: number;
//       spo2?: number;         // %
//       weight?: number;       // kg
//       height?: number;       // cm
//     };
//     physicalExam?: string;
//     labResults?: string;
//   };
//   /** Assessment: chẩn đoán sơ bộ và phân biệt */
//   assessment: string;
//   /** Plan: phác đồ điều trị, kê đơn, xét nghiệm */
//   plan: string;
//   /** Mã ICD-10 được gợi ý bởi AI */
//   icd10Codes?: string[];
//   /** Trạng thái của SOAP Note */
//   status: 'draft' | 'ai-generated' | 'reviewed' | 'finalized';
//   aiConfidence?: number;    // 0-1
//   createdAt?: string;
//   updatedAt?: string;
// }

// // ─── Transcript ──────────────────────────────────────────────────────────────

// export type SpeakerRole = 'doctor' | 'patient' | 'unknown';

// export interface TranscriptSegment {
//   id: string;
//   speaker: SpeakerRole;
//   text: string;
//   /** Timestamp tính từ đầu ghi âm (giây) */
//   startTime: number;
//   endTime: number;
//   confidence: number;  // 0-1, từ Whisper
//   isFinal: boolean;
// }

// export interface Transcript {
//   id: string;
//   encounterId: string;
//   segments: TranscriptSegment[];
//   language: string;
//   totalDuration: number;  // giây
//   createdAt: string;
// }

// // ─── Agent Commands ───────────────────────────────────────────────────────────

// export type AgentToolName =
//   | 'search_medical_history'
//   | 'check_bhyt_status'
//   | 'create_lab_order'
//   | 'create_radiology_order'
//   | 'update_emr_status'
//   | 'generate_discharge_doc'
//   | 'mock_print_service';

// export interface AgentCommand {
//   id: string;
//   encounterId: string;
//   rawText: string;    // Lệnh gốc từ bác sĩ
//   toolName: AgentToolName;
//   parameters: Record<string, unknown>;
//   status: 'pending' | 'executing' | 'completed' | 'failed';
//   result?: string;
//   executedAt?: string;
// }

// // ─── Emergency Log ────────────────────────────────────────────────────────────

// export interface EmergencyLogEntry {
//   id: string;
//   encounterId: string;
//   timestamp: string;
//   speaker: SpeakerRole;
//   text: string;
//   /** Y lệnh khẩn cấp được bác sĩ đưa ra */
//   isCommand: boolean;
// }

// // ─── Dashboard Stats ─────────────────────────────────────────────────────────

// export interface DashboardStats {
//   totalEncountersToday: number;
//   completedEncounters: number;
//   pendingEncounters: number;
//   totalSoapNotes: number;
//   timeSavedHours: number;
//   soapAccuracy: number;  // %
//   apiUsage?: {
//     whisper: number;  // %
//     llama: number;    // %
//     storage: number;  // %
//   };
// }

// // ─── API Response wrappers ────────────────────────────────────────────────────

// export interface ApiResponse<T> {
//   data: T;
//   message?: string;
//   success: boolean;
// }

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
//   page: number;
//   pageSize: number;
//   totalPages: number;
// }

// export interface ApiError {
//   message: string;
//   code?: string;
//   statusCode: number;
// }

// // ─── UI State types ───────────────────────────────────────────────────────────

// export type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped' | 'processing';

// export interface EncounterUIState {
//   recordingStatus: RecordingStatus;
//   recordingSeconds: number;
//   isEmergencyMode: boolean;
//   isConsentConfirmed: boolean;
//   soapGenerationStatus: 'idle' | 'generating' | 'done' | 'error';
//   activeCommand: AgentCommand | null;
// }

// // ─── Pricing ─────────────────────────────────────────────────────────────────

// export interface PricingTier {
//   id: string;
//   name: string;
//   priceVnd: number | null;  // null = "Liên hệ"
//   period: string;
//   description: string;
//   features: string[];
//   isFeatured: boolean;
//   ctaLabel: string;
// }