import React from 'react';
import Link from 'next/link';

/**
 * A call to action encouraging users to try the product. Positioned near
 * the bottom of the home page, it reinforces the value proposition and
 * prompts a free sign‑up.
 */
export default function CallToAction() {
  return (
    <section style={{ padding: '96px 32px 0', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ background: '#1a3a3a', borderRadius: 24, padding: 80, display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 16 }}>Bắt đầu hôm nay</div>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 40, fontWeight: 700, letterSpacing: -1, color: '#ffffff', marginBottom: 12 }}>Chuyển đổi phòng khám của bạn với AI</h2>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 16 }}>Dùng thử miễn phí 30 ngày. Không cần thẻ tín dụng.</p>
        </div>
        <Link href="/login" style={{ background: '#fffaf0', color: '#0a0a0a', borderRadius: 8, padding: '12px 32px', fontSize: 15, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Bắt đầu miễn phí →
        </Link>
      </div>
    </section>
  );
}