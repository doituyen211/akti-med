/**
 * Hằng số toàn app: role config, demo data, agent command map.
 */

// ─── Role config ──────────────────────────────────────────────────────────────

export const ROLES = {
  admin: { label: "Admin", icon: "ti-crown", color: "#e8b94a", bg: "#1a3a3a" },
  doctor: {
    label: "Bác sĩ",
    icon: "ti-stethoscope",
    color: "#fff",
    bg: "#1a3a3a",
  },
  nurse: { label: "Y tá", icon: "ti-nurse", color: "#0a0a0a", bg: "#b8a4ed" },
  patient: {
    label: "Bệnh nhân",
    icon: "ti-user",
    color: "#0a0a0a",
    bg: "#a4d4c5",
  },
};

export const ROLE_DASHBOARD_TITLES = {
  admin: "Dashboard Admin",
  doctor: "Dashboard Bác sĩ",
  nurse: "Dashboard Y tá",
  patient: "Hồ sơ của tôi",
};

// ─── Sidebar navigation per role ─────────────────────────────────────────────

export const SIDEBAR_NAV = {
  admin: [
    { key: "overview", label: "Tổng quan", icon: "ti-layout-dashboard" },
    { key: "users", label: "Quản lý người dùng", icon: "ti-users" },
    { key: "analytics", label: "Thống kê", icon: "ti-chart-bar" },
    {
      key: "settings",
      label: "Cài đặt",
      icon: "ti-settings",
      section: "Hệ thống",
    },
    { key: "billing", label: "Thanh toán", icon: "ti-credit-card" },
  ],
  doctor: [
    { key: "overview", label: "Tổng quan", icon: "ti-layout-dashboard" },
    { key: "encounters", label: "Ca khám hôm nay", icon: "ti-stethoscope" },
    { key: "patients", label: "Danh sách bệnh nhân", icon: "ti-users" },
    { key: "soap-history", label: "Lịch sử SOAP", icon: "ti-notes-medical" },
    {
      key: "new-encounter",
      label: "Ca khám mới",
      icon: "ti-plus",
      section: "Công cụ",
      isAction: true,
    },
  ],
  nurse: [
    { key: "overview", label: "Tổng quan", icon: "ti-layout-dashboard" },
    { key: "vitals", label: "Ghi chỉ số", icon: "ti-heartbeat" },
    { key: "queue", label: "Hàng đợi", icon: "ti-list" },
  ],
  patient: [
    { key: "overview", label: "Của tôi", icon: "ti-layout-dashboard" },
    { key: "my-records", label: "Hồ sơ bệnh án", icon: "ti-file-medical" },
    { key: "appointments", label: "Lịch hẹn", icon: "ti-calendar" },
  ],
};

// ─── Pricing tiers ────────────────────────────────────────────────────────────

export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    priceVnd: 0,
    period: "Mãi mãi miễn phí",
    description: "Cho phòng khám nhỏ",
    features: [
      "50 ca khám/tháng",
      "SOAP Note cơ bản",
      "1 bác sĩ",
      "Lưu trữ 7 ngày",
    ],
    isFeatured: false,
    ctaLabel: "Bắt đầu",
  },
  {
    id: "pro",
    name: "Pro",
    priceVnd: 1200000,
    period: "/tháng/bác sĩ",
    description: "Cho phòng khám trung bình",
    features: [
      "Không giới hạn ca khám",
      "SOAP Note nâng cao",
      "5 bác sĩ",
      "Lưu trữ 1 năm",
      "Agent đa tác vụ",
    ],
    isFeatured: true,
    ctaLabel: "Dùng thử 30 ngày",
  },
  {
    id: "clinic",
    name: "Clinic",
    priceVnd: 4500000,
    period: "/tháng",
    description: "Cho bệnh viện nhỏ",
    features: [
      "Không giới hạn ca khám",
      "Tất cả tính năng Pro",
      "20 bác sĩ",
      "Tích hợp HIS/EMR",
      "API riêng",
    ],
    isFeatured: false,
    ctaLabel: "Liên hệ",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceVnd: null,
    period: "Tuỳ chỉnh theo nhu cầu",
    description: "Cho bệnh viện lớn",
    features: [
      "Không giới hạn người dùng",
      "Triển khai on-premise",
      "SLA 99.9%",
      "Hỗ trợ 24/7",
      "Training tùy chỉnh",
    ],
    isFeatured: false,
    ctaLabel: "Tư vấn ngay",
  },
];

// ─── Agent command keyword map ────────────────────────────────────────────────
// Dùng để match lệnh ngôn ngữ tự nhiên → tool response (mock khi chưa có API)

export const AGENT_RESPONSES = {
  "lịch sử bệnh án":
    "📋 Đã tìm thấy 12 lần khám trước. Bệnh mãn tính: Không có. Dị ứng: Không ghi nhận.",
  "lịch sử":
    "📋 Đã tìm thấy 12 lần khám trước. Chẩn đoán gần nhất: Cảm cúm (J11.1).",
  bhyt: "🏥 BHYT hợp lệ đến 31/12/2025. Mức hưởng: 80%. Số thẻ: DN4123456789.",
  "bảo hiểm": "🏥 BHYT hợp lệ đến 31/12/2025. Mức hưởng: 80%.",
  "x-quang":
    "📡 Đã tạo yêu cầu chụp X-Quang ngực. Số yêu cầu: XQ2025-847. Gửi Phòng CĐHA.",
  "xét nghiệm":
    "🧪 Đã tạo phiếu xét nghiệm máu (CBC, CRP, Glucose). Gửi Phòng XN tầng 2.",
  xn: "🧪 Đã tạo phiếu xét nghiệm. Gửi Phòng XN tầng 2.",
  "in giấy": "🖨️ Đang chuẩn bị giấy ra viện. Lệnh in gửi tới máy P-201.",
  "giấy ra viện": "🖨️ Đang tạo giấy ra viện. Lệnh in đã được gửi.",
  thuốc: "💊 Đang tra cứu toa thuốc phù hợp với chẩn đoán...",
  "dị ứng": "⚠️ Bệnh nhân dị ứng: Penicillin. Không kê nhóm Beta-lactam.",
  "chuyển khoa": "🏥 Đang tạo phiếu chuyển khoa. Vui lòng chọn khoa nhận.",
};

// ─── Demo transcript lines (dùng khi chưa có WebSocket thật) ─────────────────

export const DEMO_TRANSCRIPT = [
  {
    role: "doctor",
    text: "Chào buổi sáng! Bạn đang có triệu chứng gì hôm nay?",
  },
  {
    role: "patient",
    text: "Dạ bác sĩ ơi, tôi bị đau đầu và sốt từ tối qua, khoảng 38.5 độ.",
  },
  {
    role: "doctor",
    text: "Ngoài sốt và đau đầu, bạn có ho hay chảy nước mũi không?",
  },
  {
    role: "patient",
    text: "Dạ có, tôi ho ít và chảy nước mũi trong suốt, không có màu.",
  },
  {
    role: "doctor",
    text: "Bạn có tiếp xúc với người bị cảm cúm gần đây không?",
  },
  {
    role: "patient",
    text: "Dạ hôm qua tôi đi họp với đồng nghiệp, anh ấy đang bị ho.",
  },
  {
    role: "doctor",
    text: "Được, tôi sẽ khám để đánh giá. Bạn có dị ứng thuốc nào không?",
  },
  { role: "patient", text: "Dạ không, tôi không có dị ứng thuốc." },
];

// ─── Demo SOAP from transcript ────────────────────────────────────────────────

export const DEMO_SOAP = {
  subjective:
    "Bệnh nhân tự mô tả: đau đầu và sốt từ tối qua (38.5°C), ho ít, chảy nước mũi trong. Có tiếp xúc với người bị cảm cúm ngày hôm trước. Không có dị ứng thuốc.",
  objective:
    "Nhiệt độ: 38.5°C\nMạch: đang khám\nHuyết áp: đang khám\nSPO2: đang khám\nHọng: đỏ nhẹ, không xuất tiết mủ\nPhổi: thông khí đều 2 bên",
  assessment:
    "Nghi ngờ: Cảm cúm thông thường (J11.1)\nChẩn đoán phân biệt: Viêm mũi họng cấp (J06.9), COVID-19 cần loại trừ",
  plan: "Điều trị triệu chứng:\n• Paracetamol 500mg × 3 lần/ngày (khi sốt ≥38°C)\n• Vitamin C 1000mg × 1 lần/ngày\n• Xịt mũi NaCl 0.9% × 3-4 lần/ngày\nNghỉ ngơi, uống đủ nước (2-3L/ngày)\nTái khám sau 3 ngày nếu không cải thiện hoặc sốt cao hơn.",
  status: "ai-generated",
};

// ─── Demo encounters ──────────────────────────────────────────────────────────

export const DEMO_ENCOUNTERS = [
  {
    id: "2025-001",
    patientName: "Nguyễn Văn B",
    age: 35,
    gender: "Nam",
    time: "09:00",
    complaint: "Cảm cúm, sốt",
    status: "completed",
  },
  {
    id: "2025-002",
    patientName: "Trần Thị C",
    age: 28,
    gender: "Nữ",
    time: "10:30",
    complaint: "Đau bụng",
    status: "in-progress",
  },
  {
    id: "2025-003",
    patientName: "Lê Văn D",
    age: 52,
    gender: "Nam",
    time: "11:00",
    complaint: "Tái khám huyết áp",
    status: "waiting",
  },
  {
    id: "2025-004",
    patientName: "Phạm Thị E",
    age: 67,
    gender: "Nữ",
    time: "14:00",
    complaint: "Tiểu đường type 2",
    status: "waiting",
  },
];

// ─── Status badge config ──────────────────────────────────────────────────────

export const STATUS_BADGE = {
  completed: { label: "Hoàn thành", class: "badge-success" },
  "in-progress": { label: "Đang khám", class: "badge-warning" },
  waiting: { label: "Chờ", class: "badge-info" },
  emergency: { label: "🚨 Cấp cứu", class: "badge-error" },
  draft: { label: "Đang soạn", class: "badge-warning" },
  "ai-generated": { label: "AI đã điền", class: "badge-success" },
  finalized: { label: "Đã lưu", class: "badge-teal" },
};
