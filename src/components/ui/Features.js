import React from 'react';

/**
 * Features section. Displays a grid of feature cards describing the core
 * capabilities of MediScribeAI. Colours and wording are adapted from
 * the provided single page for a consistent feel.
 */
export default function Features() {
  const features = [
    {
      title: 'Ghi âm thời gian thực',
      desc: 'Chuyển giọng nói thành văn bản tức thì với Whisper Large v3 qua Groq API, độ chính xác 98%.',
      color: '#ff4d8b',
    },
    {
      title: 'SOAP Note tự động',
      desc: 'Llama‑3‑70B phân tích cuộc trò chuyện và tạo SOAP Note chuẩn y khoa trong vài giây.',
      color: '#1a3a3a',
      textColor: '#ffffff',
    },
    {
      title: 'Phân biệt người nói',
      desc: 'Silero VAD nhận diện và phân biệt giọng bác sĩ và bệnh nhân theo màu sắc riêng biệt.',
      color: '#b8a4ed',
    },
    {
      title: 'Chế độ cấp cứu',
      desc: 'Chuyển sang log y lệnh khẩn cấp ngay lập tức, ẩn form SOAP để tập trung vào cấp cứu.',
      color: '#ffb084',
    },
    {
      title: 'Agent đa tác vụ',
      desc: 'Gọi agent qua lệnh giọng nói để tra cứu BHYT, lịch sử bệnh án, đặt lịch xét nghiệm.',
      color: '#e8b94a',
    },
    {
      title: 'Bảo mật y tế',
      desc: 'Mã hóa end‑to‑end, tuân thủ quy định bảo mật dữ liệu y tế Việt Nam và HIPAA.',
      color: '#f5f0e0',
    },
  ];
  return (
    <section style={{ padding: '96px 32px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6a6a6a', marginBottom: 16 }}>Tính năng</div>
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 40, fontWeight: 700, letterSpacing: -1, marginBottom: 48 }}>Tất cả trong một nền tảng</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {features.map(({ title, desc, color, textColor = '#0a0a0a' }, idx) => (
          <div
            key={idx}
            style={{
              background: color,
              color: textColor,
              borderRadius: 24,
              padding: 32,
            }}
          >
            <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
            <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.5 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}