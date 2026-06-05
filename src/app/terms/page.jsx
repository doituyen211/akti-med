/**
 * Trang Điều khoản Dịch vụ.
 */

import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Điều khoản Dịch vụ — MediScribeAI",
};

const SECTIONS = [
  {
    title: "1. Điều kiện sử dụng",
    content: `Bằng cách sử dụng MediScribeAI, bạn đồng ý tuân theo các điều khoản và điều kiện được nêu trong tài liệu này. Dịch vụ chỉ dành cho các chuyên gia y tế có đăng ký hành nghề hợp lệ tại Việt Nam hoặc các quốc gia có quy định tương đương.`,
  },
  {
    title: "2. Mục đích hỗ trợ, không thay thế",
    content: `MediScribeAI là công cụ hỗ trợ ghi chép lâm sàng. Mọi quyết định chẩn đoán và điều trị phải do bác sĩ có chuyên môn đưa ra sau khi đã review output của AI. AI không thay thế được phán đoán y khoa chuyên nghiệp. Chúng tôi không chịu trách nhiệm về các quyết định lâm sàng được đưa ra dựa trên nội dung AI tạo ra mà không qua review.`,
  },
  {
    title: "3. Xác nhận đồng thuận ghi âm",
    content: `Người dùng có trách nhiệm đảm bảo bệnh nhân đã được thông báo đầy đủ và đồng ý ghi âm cuộc trò chuyện trước khi sử dụng tính năng này. MediScribeAI cung cấp công cụ xác nhận đồng thuận tích hợp và lưu lại log xác nhận. Người dùng vi phạm nghĩa vụ này hoàn toàn chịu trách nhiệm pháp lý theo quy định của pháp luật.`,
  },
  {
    title: "4. Bảo mật dữ liệu y tế",
    content: `Chúng tôi cam kết bảo vệ dữ liệu bệnh nhân theo tiêu chuẩn cao nhất. Dữ liệu được mã hóa AES-256 và chỉ được truy cập bởi người dùng được ủy quyền. Chúng tôi tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và các quy định y tế liên quan.`,
  },
  {
    title: "5. Lưu trữ và xóa dữ liệu",
    content: `Dữ liệu âm thanh được xóa tự động sau 24 giờ theo mặc định (có thể cấu hình). Transcript và SOAP Note được lưu trữ theo thời hạn của gói đăng ký. Bạn có quyền yêu cầu xóa toàn bộ dữ liệu bất kỳ lúc nào thông qua trang Cài đặt hoặc email support@mediscribe.ai.`,
  },
  {
    title: "6. Giới hạn trách nhiệm",
    content: `MediScribeAI không chịu trách nhiệm về các thiệt hại trực tiếp, gián tiếp hoặc hậu quả phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ. Giới hạn trách nhiệm tối đa của chúng tôi không vượt quá khoản phí bạn đã thanh toán trong 3 tháng gần nhất.`,
  },
  {
    title: "7. Thay đổi điều khoản",
    content: `Chúng tôi có thể cập nhật các điều khoản này theo thời gian. Bạn sẽ được thông báo qua email trước ít nhất 30 ngày đối với các thay đổi quan trọng. Việc tiếp tục sử dụng dịch vụ sau ngày có hiệu lực đồng nghĩa với việc bạn chấp nhận các điều khoản mới.`,
  },
  {
    title: "8. Pháp luật áp dụng",
    content: `Các điều khoản này được điều chỉnh và giải thích theo pháp luật Việt Nam. Mọi tranh chấp sẽ được giải quyết tại Tòa án nhân dân thành phố Hà Nội.`,
  },
];

export default function TermsPage() {
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
            background: "rgba(26,58,58,.1)",
            color: "#1a3a3a",
            marginBottom: 16,
          }}
        >
          Pháp lý
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
          Điều khoản Dịch vụ
        </h1>
        <p style={{ fontSize: 14, color: "#9a9a9a", marginBottom: 48 }}>
          Cập nhật lần cuối: 01/06/2025
        </p>

        {/* Intro */}
        <div
          style={{
            background: "#faf5e8",
            borderRadius: 16,
            padding: 24,
            marginBottom: 40,
            fontSize: 15,
            color: "#3a3a3a",
            lineHeight: 1.7,
          }}
        >
          Vui lòng đọc kỹ các điều khoản này trước khi sử dụng MediScribeAI.
          Bằng cách tạo tài khoản hoặc sử dụng bất kỳ tính năng nào của dịch vụ,
          bạn xác nhận đã đọc, hiểu và đồng ý bị ràng buộc bởi các điều khoản
          này.
        </div>

        {/* Sections */}
        {SECTIONS.map((s) => (
          <div key={s.title} style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 10,
                color: "#0a0a0a",
              }}
            >
              {s.title}
            </h2>
            <p style={{ fontSize: 15, color: "#3a3a3a", lineHeight: 1.7 }}>
              {s.content}
            </p>
          </div>
        ))}

        {/* Contact */}
        <div
          style={{
            marginTop: 48,
            padding: 24,
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            fontSize: 15,
            color: "#6a6a6a",
          }}
        >
          <strong style={{ color: "#0a0a0a" }}>Liên hệ:</strong>{" "}
          legal@mediscribe.ai · Hotline: 1800 6868 (miễn phí, 8:00–18:00 T2–T6)
        </div>
      </div>

      <Footer />
    </>
  );
}
