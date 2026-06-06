/**
 * Toast notification stack — đọc từ useNotifStore.
 * Đặt trong root layout để hiển thị toàn app.
 */

"use client";

import { useNotifStore } from "@/app/store";

const TYPE_STYLES = {
  success: { background: "#0a1a1a", color: "#a4d4c5" },
  error: { background: "#7f1d1d", color: "#fca5a5" },
  warning: { background: "#78350f", color: "#fcd34d" },
  info: { background: "#0a0a0a", color: "#ffffff" },
};

export default function Notification() {
  const { notifications, removeNotif } = useNotifStore();

  if (!notifications.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {notifications.map((n) => {
        const style = TYPE_STYLES[n.type] || TYPE_STYLES.info;
        return (
          <div
            key={n.id}
            onClick={() => removeNotif(n.id)}
            style={{
              ...style,
              padding: "12px 20px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              animation: "slideUp 0.3s ease",
              maxWidth: 360,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {n.message}
          </div>
        );
      })}
    </div>
  );
}
