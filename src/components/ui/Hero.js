import React from 'react';
import Link from 'next/link';

/**
 * Hero section for the home page. Introduces MediScribeAI with a headline,
 * supporting description and two primary call‑to‑action buttons. The design
 * is adapted from the provided single page and simplified for clarity.
 */
export default function Hero() {
  return (
    <section style={{ padding: '96px 32px', maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: 1, minWidth: 300 }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#c0256d', marginBottom: 16 }}>AI hỗ trợ y tế</div>
        <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 56, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
          Ghi âm → <span style={{ color: '#ff4d8b' }}>SOAP Note</span>
          <br />trong vài giây
        </h1>
        <p style={{ fontSize: 18, color: '#3a3a3a', lineHeight: 1.6, marginBottom: 32 }}>
          Nền tảng AI agent y tế đầu tiên tại Việt Nam, giúp bác sĩ chuyển cuộc trò chuyện thành hồ sơ lâm sàng chuẩn mực một cách tự động.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/login" style={{ background: '#0a0a0a', color: '#ffffff', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Bắt đầu miễn phí
          </Link>
          <Link href="/docs" style={{ border: '1px solid #e5e5e5', color: '#0a0a0a', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Xem tài liệu
          </Link>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: '#6a6a6a' }}>✓ Không cần thẻ tín dụng &nbsp; ✓ Cài đặt trong 5 phút</p>
      </div>
      <div style={{ flex: 1, minWidth: 300, background: '#faf5e8', borderRadius: 24, padding: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#6a6a6a', marginBottom: 12 }}>Đang ghi âm trực tiếp</div>
        <div style={{ height: 40, display: 'flex', alignItems: 'flex-end', gap: 3, marginBottom: 12 }}>
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 8 + Math.random() * 32,
                background: i % 2 === 0 ? '#ff4d8b' : '#b8a4ed',
                borderRadius: 2,
                animation: 'wave 1s ease-in-out infinite',
                animationDelay: `${i * 0.06}s`,
              }}
            />
          ))}
        </div>
        <div style={{ background: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: '#6a6a6a', marginBottom: 8 }}>Phụ đề thời gian thực</div>
          <div style={{ fontSize: 13, color: '#3a3a3a', marginBottom: 4 }}><b>BS:</b> Bạn đang có triệu chứng gì vậy?</div>
          <div style={{ fontSize: 13, color: '#3a3a3a', marginBottom: 4 }}><b>BN:</b> Tôi bị đau đầu và sốt 2 ngày rồi.</div>
          <div style={{ fontSize: 13, color: '#3a3a3a' }}><b>BS:</b> Nhiệt độ cao nhất bao nhiêu? <span style={{ display: 'inline-block', width: 8, height: 14, background: '#ff4d8b', borderRadius: 1, animation: 'blink 0.8s step-end infinite', verticalAlign: 'middle' }}></span></div>
        </div>
        <div style={{ background: '#ffffff', borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: '#6a6a6a', marginBottom: 8 }}>SOAP Note tự động</div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: '#3a3a3a' }}>
            <b style={{ color: '#1a3a3a' }}>S:</b> Đau đầu, sốt 2 ngày...<br />
            <b style={{ color: '#1a3a3a' }}>O:</b> Nhiệt độ đang ghi nhận...<br />
            <b style={{ color: '#1a3a3a' }}>A:</b> Đang phân tích...<br />
            <b style={{ color: '#1a3a3a' }}>P:</b> Đề xuất điều trị...
          </div>
        </div>
      </div>
    </section>
  );
}