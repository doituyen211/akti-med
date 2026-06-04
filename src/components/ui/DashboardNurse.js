import React from 'react';

/**
 * Nurse dashboard. Provides a snapshot of daily workload including the
 * number of patients today, number of vitals recorded and the length of
 * the queue. A table lists patients currently waiting with their
 * priority status.
 */
export default function DashboardNurse() {
  const queue = [
    { idx: 1, name: 'Nguyễn A', wait: 5, reason: 'Sốt, ho', priority: 'Bình thường' },
    { idx: 2, name: 'Trần B', wait: 12, reason: 'Đau ngực', priority: 'Ưu tiên cao' },
    { idx: 3, name: 'Lê C', wait: 18, reason: 'Tái khám', priority: 'Thấp' },
  ];
  const badgeStyles = {
    'Bình thường': { bg: 'rgba(245,158,11,.1)', color: '#92400e' },
    'Ưu tiên cao': { bg: 'rgba(239,68,68,.1)', color: '#991b1b' },
    Thấp: { bg: 'rgba(59,130,246,.1)', color: '#1d4ed8' },
  };
  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>Dashboard Y tá</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 6 }}>BỆNH NHÂN HÔM NAY</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>34</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 6 }}>CHỈ SỐ ĐÃ GHI</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>28</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 6 }}>HÀNG ĐỢI</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>6</div>
          <div style={{ fontSize: 12, color: '#f59e0b', marginTop: 4 }}>Chờ khám</div>
        </div>
      </div>
      <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e5e5' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Hàng đợi hiện tại</div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>STT</th>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Bệnh nhân</th>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Chờ (phút)</th>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Triệu chứng</th>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Ưu tiên</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((row, idx) => {
              const badge = badgeStyles[row.priority];
              return (
                <tr key={idx} style={{ borderBottom: idx === queue.length - 1 ? 'none' : '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 16px' }}>{row.idx}</td>
                  <td style={{ padding: '12px 16px' }}>{row.name}</td>
                  <td style={{ padding: '12px 16px' }}>{row.wait}</td>
                  <td style={{ padding: '12px 16px' }}>{row.reason}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: badge.bg, color: badge.color, padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>{row.priority}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}