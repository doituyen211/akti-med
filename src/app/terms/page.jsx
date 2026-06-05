import React from 'react';

/**
 * Terms of Service page. Contains legal statements written in Vietnamese.
 * The content is adapted directly from the provided single page.
 */
export default function TermsPage() {
  return (
    <div style={{ padding: '64px 32px', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 9999, background: 'rgba(26,58,58,.1)', color: '#1a3a3a', marginBottom: 16 }}>Pháp lý</div>
      <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 40, fontWeight: 700, marginBottom: 8 }}>Điều khoản Dịch vụ</h1>
      <p style={{ color: '#6a6a6a', marginBottom: 32 }}>Cập nhật lần cuối: 01/06/2025</p>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, margin: '32px 0 12px' }}>1. Điều kiện sử dụng</h2>
      <p style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.7 }}>Bằng cách sử dụng MediScribeAI, bạn đồng ý tuân theo các điều khoản và điều kiện được nêu trong tài liệu này. Dịch vụ chỉ dành cho các chuyên gia y tế có đăng ký hành nghề hợp lệ.</p>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, margin: '32px 0 12px' }}>2. Mục đích hỗ trợ</h2>
      <p style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.7 }}>MediScribeAI là công cụ hỗ trợ ghi chép. Mọi quyết định lâm sàng phải do bác sĩ có trách nhiệm đưa ra. AI không thay thế được phán đoán y khoa chuyên nghiệp.</p>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, margin: '32px 0 12px' }}>3. Bảo mật dữ liệu</h2>
      <p style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.7 }}>Chúng tôi cam kết bảo vệ dữ liệu bệnh nhân theo tiêu chuẩn cao nhất. Dữ liệu được mã hóa AES‑256 và chỉ được truy cập bởi người dùng được ủy quyền.</p>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, margin: '32px 0 12px' }}>4. Đồng thuận ghi âm</h2>
      <p style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.7 }}>Người dùng có trách nhiệm đảm bảo bệnh nhân đã đồng ý ghi âm trước khi sử dụng tính năng này. MediScribeAI cung cấp công cụ xác nhận đồng thuận tích hợp.</p>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, margin: '32px 0 12px' }}>5. Giới hạn trách nhiệm</h2>
      <p style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.7 }}>MediScribeAI không chịu trách nhiệm về các quyết định lâm sàng được đưa ra dựa trên nội dung được tạo bởi AI. Người dùng hoàn toàn chịu trách nhiệm về việc sử dụng dịch vụ.</p>
    </div>
  );
}