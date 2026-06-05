"use client";
import React, { createContext, useState, useContext } from "react";

/**
 * Notification context. Components can use the `useNotification` hook to
 * trigger toast messages globally. Toasts disappear automatically after
 * three seconds. This is a simplified implementation and should be
 * extended for production use.
 */
const NotificationContext = createContext({ show: () => {} });

export function useNotification() {
  return useContext(NotificationContext);
}

export default function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);
  const show = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };
  return (
    <NotificationContext.Provider value={{ show }}>
      {children}
      {message && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "#0a0a0a",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: 8,
            fontSize: 14,
            zIndex: 300,
            opacity: 0.95,
          }}
        >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}
