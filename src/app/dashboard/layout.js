'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) return <div style={{ padding: '40px' }}>Loading...</div>;

  return (
    <div className="dash-layout">
      <aside className="sidebar">
        <div style={{ padding: '12px', marginBottom: '4px' }}>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>{user.name}</div>
          <div className="badge badge-teal" style={{ marginTop: '4px' }}>
             Vai trò: {user.role}
          </div>
        </div>

        <Link href="/dashboard" className={`sidebar-item ${pathname === '/dashboard' ? 'active' : ''}`}>
          <i className="ti ti-layout-dashboard"></i> Tổng quan
        </Link>
        
        {/* Conditional Menu: Chỉ render menu Bác sĩ nếu là doctor */}
        {user.role === 'doctor' && (
          <>
            <Link href="/dashboard" className="sidebar-item">
              <i className="ti ti-stethoscope"></i> Ca khám hôm nay
            </Link>
            <div className="sidebar-section">Công cụ</div>
            <Link href="/dashboard/new-encounter" className="sidebar-item">
              <i className="ti ti-plus"></i> Ca khám mới
            </Link>
          </>
        )}
      </aside>
      
      <main className="dash-main">
        {children}
      </main>
    </div>
  );
}