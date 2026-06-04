import React from 'react';
import Link from 'next/link';

/**
 * Admin dashboard. Shows high level statistics, a list of recently created
 * users and a simple API usage chart. The layout follows a two column
 * grid similar to the provided single page, using minimal styling and
 * semantic HTML.
 */
export default function DashboardAdmin({ user }) {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>Dashboard Admin</h1>
        <span style={{ fontSize: 13, color: '#6a6a6a' }}>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 6 }}>TỔNG NGƯỜI DÙNG</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>248</div>
          <div style={{ fontSize: 12, color: '#22c55e', marginTop: 4 }}>↑ 12 tuần này</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 6 }}>CA KHÁM HÔM NAY</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>1,847</div>
          <div style={{ fontSize: 12, color: '#22c55e', marginTop: 4 }}>↑ 8.2%</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 6 }}>SOAP NOTES TẠO</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>94.3K</div>
          <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 4 }}>Tổng cộng</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 6 }}>DOANH THU T6</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>₫284M</div>
          <div style={{ fontSize: 12, color: '#22c55e', marginTop: 4 }}>↑ 21%</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Người dùng gần đây</div>
            <Link href="/dashboard" style={{ fontSize: 13, color: '#6a6a6a', textDecoration: 'none' }}>Xem tất cả →</Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>
                <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Tên</th>
                <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Vai trò</th>
                <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Bệnh viện</th>
                <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Trạng thái</th>
                <th style={{ padding: '8px 16px' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 16px' }}>BS. Nguyễn Anh</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: 'rgba(26,58,58,.1)', color: '#1a3a3a', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>Bác sĩ</span></td>
                <td style={{ padding: '12px 16px' }}>BV Bạch Mai</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: 'rgba(34,197,94,.1)', color: '#15803d', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>Hoạt động</span></td>
                <td style={{ padding: '12px 16px' }}><a style={{ color: '#6a6a6a', cursor: 'pointer', fontSize: 14 }}>Xem</a></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 16px' }}>Y tá Trần Lan</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: 'rgba(59,130,246,.1)', color: '#1d4ed8', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>Y tá</span></td>
                <td style={{ padding: '12px 16px' }}>BV Nhi TW</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: 'rgba(34,197,94,.1)', color: '#15803d', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>Hoạt động</span></td>
                <td style={{ padding: '12px 16px' }}><a style={{ color: '#6a6a6a', cursor: 'pointer', fontSize: 14 }}>Xem</a></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 16px' }}>BS. Lê Minh</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: 'rgba(26,58,58,.1)', color: '#1a3a3a', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>Bác sĩ</span></td>
                <td style={{ padding: '12px 16px' }}>BV 108</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: 'rgba(245,158,11,.1)', color: '#92400e', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>Chờ duyệt</span></td>
                <td style={{ padding: '12px 16px' }}><a style={{ color: '#6a6a6a', cursor: 'pointer', fontSize: 14 }}>Duyệt</a></td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px' }}>BS. Phạm Thu</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: 'rgba(26,58,58,.1)', color: '#1a3a3a', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>Bác sĩ</span></td>
                <td style={{ padding: '12px 16px' }}>BV Việt Đức</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: 'rgba(34,197,94,.1)', color: '#15803d', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>Hoạt động</span></td>
                <td style={{ padding: '12px 16px' }}><a style={{ color: '#6a6a6a', cursor: 'pointer', fontSize: 14 }}>Xem</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Sử dụng API</div>
          </div>
          <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13 }}>Whisper API</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>84%</span>
              </div>
              <div style={{ height: 6, background: '#e5e5e5', borderRadius: 3 }}>
                <div style={{ width: '84%', height: '100%', background: '#1a3a3a', borderRadius: 3 }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13 }}>Llama‑3 API</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>61%</span>
              </div>
              <div style={{ height: 6, background: '#e5e5e5', borderRadius: 3 }}>
                <div style={{ width: '61%', height: '100%', background: '#ff4d8b', borderRadius: 3 }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13 }}>Storage</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>42%</span>
              </div>
              <div style={{ height: 6, background: '#e5e5e5', borderRadius: 3 }}>
                <div style={{ width: '42%', height: '100%', background: '#e8b94a', borderRadius: 3 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}