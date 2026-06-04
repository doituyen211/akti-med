import React from 'react';

/**
 * Testimonials section. Shows quotes from doctors to build trust with
 * prospective users. The avatars are represented by initials on coloured
 * backgrounds similar to the original design.
 */
export default function Testimonials() {
  const testimonials = [
    {
      quote: '"MediScribeAI giúp tôi tiết kiệm 45 phút mỗi ngày. Trước đây tôi phải gõ SOAP note thủ công sau mỗi ca khám."',
      name: 'Nguyễn Văn A',
      role: 'Bác sĩ Nội khoa, BV Bạch Mai',
      color: '#1a3a3a',
      initials: 'NV',
    },
    {
      quote: '"Tính năng phân biệt giọng bác sĩ và bệnh nhân rất chính xác. SOAP note xuất ra gần như không cần chỉnh sửa."',
      name: 'Trần Thị H',
      role: 'Bác sĩ Nhi khoa, BV Nhi TW',
      color: '#ff4d8b',
      initials: 'TH',
    },
    {
      quote: '"Chế độ cấp cứu thực sự hữu ích. Khi có ca khẩn, chỉ cần bật switch là hệ thống log ngay mà không ảnh hưởng công việc."',
      name: 'Lê Minh K',
      role: 'Bác sĩ Cấp cứu, BV 108',
      color: '#e8b94a',
      initials: 'LM',
    },
  ];
  return (
    <section style={{ padding: '96px 32px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6a6a6a', marginBottom: 16 }}>Phản hồi</div>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 40, fontWeight: 700, letterSpacing: -1, marginBottom: 48 }}>Bác sĩ tin dùng</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {testimonials.map(({ quote, name, role, color, initials }, idx) => (
          <div key={idx} style={{ background: '#f5f0e0', borderRadius: 16, padding: 24 }}>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#1a1a1a', fontStyle: 'italic', marginBottom: 16 }}>{quote}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#ffffff' }}>{initials}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
                <div style={{ fontSize: 12, color: '#6a6a6a' }}>{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}