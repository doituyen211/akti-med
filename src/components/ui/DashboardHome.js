import React from 'react';

/**
 * Fallback dashboard for unknown roles. Displays a simple message
 * instructing the user to select a valid role. This component acts
 * primarily as a safety net and should rarely be rendered.
 */
export default function DashboardHome({ user }) {
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Dashboard</h1>
      <p style={{ fontSize: 14, color: '#6a6a6a' }}>Xin chào {user?.name || 'bạn'}, hiện chưa có dashboard dành cho vai trò này.</p>
    </div>
  );
}