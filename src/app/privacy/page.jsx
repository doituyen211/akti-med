import React from 'react';

/**
 * Privacy Policy page. Outlines what data is collected, how it is
 * protected and the rights of users. Adapted from the single page
 * example provided by the user.
 */
export default function PrivacyPage() {
  return (
    <div style={{ padding: '64px 32px', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 9999, background: 'rgba(59,130,246,.1)', color: '#1d4ed8', marginBottom: 16 }}>Riêng tư</div>
      <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 40, fontWeight: 700, marginBottom: 8 }}>Chính sách Riêng tư</h1>
      <p style={{ color: '#6a6a6a', marginBottom: 32 }}>Cập nhật lần cuối: 01/06/2025</p>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, margin: '32px 0 12px' }}>Dữ liệu chúng tôi thu thập</h2>
      <ul style={{ margin: '0 0 16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <li style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.6 }}>Thông tin tài khoản (tên, email, chứng chỉ hành nghề)</li>
        <li style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.6 }}>Dữ liệu âm thanh được mã hóa (xóa sau 24h theo mặc định)</li>
        <li style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.6 }}>Transcript và SOAP Note (lưu theo gói đăng ký)</li>
        <li style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.6 }}>Dữ liệu sử dụng ẩn danh để cải thiện sản phẩm</li>
      </ul>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, margin: '32px 0 12px' }}>Cách chúng tôi bảo vệ dữ liệu</h2>
      <p style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.7 }}>Tất cả dữ liệu được mã hóa end‑to‑end với AES‑256. Server đặt tại Việt Nam, tuân thủ Nghị định 13/2023/NĐ‑CP về bảo vệ dữ liệu cá nhân.</p>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, margin: '32px 0 12px' }}>Quyền của bạn</h2>
      <ul style={{ margin: '0 0 16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <li style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.6 }}>Quyền truy cập: Xem tất cả dữ liệu của bạn bất kỳ lúc nào</li>
        <li style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.6 }}>Quyền xóa: Yêu cầu xóa toàn bộ dữ liệu</li>
        <li style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.6 }}>Quyền chuyển: Xuất dữ liệu theo định dạng chuẩn</li>
      </ul>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, margin: '32px 0 12px' }}>Liên hệ</h2>
      <p style={{ fontSize: 15, color: '#3a3a3a', lineHeight: 1.7 }}>privacy@mediscribe.ai | Hotline: 1800 6868</p>
    </div>
  );
}