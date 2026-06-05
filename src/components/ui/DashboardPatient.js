import React from 'react';

/**
 * Patient dashboard. Displays the patient's basic information and a table
 * summarising recent visits. In a full application this would fetch
 * data from a backend; here it is static for demonstration.
 */
export default function DashboardPatient() {
  const visits = [
    { date: '01/06/2025', doctor: 'BS. Nguyễn', diagnosis: 'Cảm cúm thông thường' },
    { date: '15/05/2025', doctor: 'BS. Trần', diagnosis: 'Tăng huyết áp độ 1' },
    { date: '02/04/2025', doctor: 'BS. Lê', diagnosis: 'Viêm họng cấp' },
  ];
  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>Hồ sơ của tôi</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Thông tin cá nhân</div>
          </div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ textAlign: 'center', padding: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', fontSize: 24, background: '#b8a4ed', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>BN</div>
              <div style={{ fontWeight: 600 }}>Bệnh nhân Demo</div>
              <div style={{ fontSize: 12, color: '#6a6a6a' }}>BHYT: DN4123456789</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#6a6a6a' }}>Ngày sinh</span>
              <span>01/01/1990</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#6a6a6a' }}>Nhóm máu</span>
              <span>O+</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#6a6a6a' }}>Dị ứng</span>
              <span>Penicillin</span>
            </div>
          </div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: 16 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Lịch sử khám gần đây</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>
                <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Ngày</th>
                <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Bác sĩ</th>
                <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#6a6a6a' }}>Chẩn đoán</th>
                <th style={{ padding: '8px 16px' }}></th>
              </tr>
            </thead>
            <tbody>
              {visits.map((v, idx) => (
                <tr key={idx} style={{ borderBottom: idx === visits.length - 1 ? 'none' : '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 16px' }}>{v.date}</td>
                  <td style={{ padding: '12px 16px' }}>{v.doctor}</td>
                  <td style={{ padding: '12px 16px' }}>{v.diagnosis}</td>
                  <td style={{ padding: '12px 16px' }}><a style={{ color: '#6a6a6a', cursor: 'pointer', fontSize: 14 }}>Xem SOAP</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}