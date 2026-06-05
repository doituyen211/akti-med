/**
 * Trang Chính sách Riêng tư.
 */

import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Chính sách Riêng tư — MediScribeAI",
};

export default function PrivacyPage() {
  return (
    <>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 32px" }}>
        {/* Header */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 9999,
            background: "rgba(59,130,246,.1)",
            color: "#1d4ed8",
            marginBottom: 16,
          }}
        >
          Riêng tư
        </span>
        <h1
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: 8,
          }}
        >
          Chính sách Riêng tư
        </h1>
        <p style={{ fontSize: 14, color: "#9a9a9a", marginBottom: 48 }}>
          Cập nhật lần cuối: 01/06/2025
        </p>

        <Section title="Dữ liệu chúng tôi thu thập">
          <p style={pStyle}>
            Chúng tôi chỉ thu thập những dữ liệu cần thiết để cung cấp dịch vụ:
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong>Thông tin tài khoản:</strong> tên, email, chứng chỉ hành
              nghề, tên bệnh viện/phòng khám.
            </li>
            <li style={liStyle}>
              <strong>Dữ liệu âm thanh:</strong> được mã hóa ngay khi upload,
              xóa sau 24 giờ theo mặc định.
            </li>
            <li style={liStyle}>
              <strong>Transcript và SOAP Note:</strong> lưu theo thời hạn gói
              đăng ký, chỉ bác sĩ phụ trách mới truy cập được.
            </li>
            <li style={liStyle}>
              <strong>Dữ liệu sử dụng ẩn danh:</strong> thống kê tổng hợp (không
              chứa thông tin cá nhân) để cải thiện mô hình AI.
            </li>
            <li style={liStyle}>
              <strong>Cookie kỹ thuật:</strong> session token (hết hạn sau 24
              giờ) và cookie tuỳ chọn.
            </li>
          </ul>
        </Section>

        <Section title="Cách chúng tôi bảo vệ dữ liệu">
          <p style={pStyle}>
            Tất cả dữ liệu được mã hóa <strong>AES-256</strong> khi lưu trữ và{" "}
            <strong>TLS 1.3</strong> khi truyền tải. Server đặt tại Việt Nam
            (Viettel IDC), tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá
            nhân.
          </p>
          <p style={pStyle}>
            Dữ liệu bệnh nhân không bao giờ được dùng để huấn luyện mô hình AI
            của bên thứ ba. Mọi truy cập vào dữ liệu đều được ghi log và audit
            định kỳ.
          </p>
        </Section>

        <Section title="Ai có thể truy cập dữ liệu">
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong>Bác sĩ phụ trách ca khám:</strong> xem toàn bộ transcript
              và SOAP Note của ca đó.
            </li>
            <li style={liStyle}>
              <strong>Admin bệnh viện:</strong> xem thống kê tổng hợp, không xem
              nội dung cụ thể.
            </li>
            <li style={liStyle}>
              <strong>Đội kỹ thuật MediScribeAI:</strong> chỉ truy cập khi cần
              debug, có sự đồng ý của khách hàng và được ghi log.
            </li>
            <li style={liStyle}>
              <strong>Bên thứ ba:</strong> chúng tôi không bán hoặc chia sẻ dữ
              liệu cá nhân với bên thứ ba.
            </li>
          </ul>
        </Section>

        <Section title="Quyền của bạn">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                right: "Quyền truy cập",
                desc: "Xem và tải về tất cả dữ liệu của bạn bất kỳ lúc nào qua Dashboard → Cài đặt → Export dữ liệu.",
              },
              {
                right: "Quyền chỉnh sửa",
                desc: "Cập nhật thông tin cá nhân hoặc yêu cầu chỉnh sửa dữ liệu không chính xác.",
              },
              {
                right: "Quyền xóa",
                desc: "Yêu cầu xóa toàn bộ dữ liệu cá nhân và dữ liệu ca khám. Xử lý trong vòng 30 ngày làm việc.",
              },
              {
                right: "Quyền hạn chế",
                desc: "Hạn chế việc xử lý dữ liệu trong khi khiếu nại được giải quyết.",
              },
              {
                right: "Quyền chuyển dữ liệu",
                desc: "Xuất dữ liệu theo định dạng JSON hoặc FHIR R4 để chuyển sang hệ thống khác.",
              },
            ].map(({ right, desc }) => (
              <div
                key={right}
                style={{
                  padding: "14px 16px",
                  background: "#faf5e8",
                  borderRadius: 12,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                  ✓ {right}
                </div>
                <div
                  style={{ fontSize: 14, color: "#6a6a6a", lineHeight: 1.6 }}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Cookie">
          <p style={pStyle}>Chúng tôi sử dụng 2 loại cookie:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong>Cookie cần thiết:</strong> session token để duy trì đăng
              nhập. Không thể tắt.
            </li>
            <li style={liStyle}>
              <strong>Cookie phân tích (tuỳ chọn):</strong> đo lường hiệu suất
              ứng dụng (ẩn danh). Có thể tắt trong Cài đặt.
            </li>
          </ul>
        </Section>

        <Section title="Thay đổi chính sách">
          <p style={pStyle}>
            Nếu có thay đổi quan trọng trong chính sách này, chúng tôi sẽ thông
            báo qua email trước ít nhất 30 ngày và hiển thị banner thông báo khi
            bạn đăng nhập.
          </p>
        </Section>

        {/* Contact */}
        <div
          style={{
            marginTop: 48,
            padding: 24,
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            fontSize: 15,
          }}
        >
          <strong
            style={{ color: "#0a0a0a", display: "block", marginBottom: 8 }}
          >
            Liên hệ về quyền riêng tư:
          </strong>
          <div style={{ color: "#6a6a6a", lineHeight: 1.7 }}>
            Email: privacy@mediscribe.ai
            <br />
            DPO (Data Protection Officer): dpo@mediscribe.ai
            <br />
            Hotline: 1800 6868 (miễn phí, 8:00–18:00 T2–T6)
            <br />
            Địa chỉ: Tầng 12, Tòa nhà FPT, Đống Đa, Hà Nội
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: "Sora, sans-serif",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 14,
          color: "#0a0a0a",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

const pStyle = {
  fontSize: 15,
  color: "#3a3a3a",
  lineHeight: 1.7,
  marginBottom: 12,
};
const ulStyle = {
  paddingLeft: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};
const liStyle = {
  fontSize: 15,
  color: "#3a3a3a",
  lineHeight: 1.6,
  paddingLeft: 20,
  position: "relative",
};
