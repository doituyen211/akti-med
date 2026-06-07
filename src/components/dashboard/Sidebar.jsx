/**
 * Sidebar điều hướng trong dashboard — hiển thị khác nhau theo role.
 */

"use client";

import { useAuth } from "@/hooks/useAuth";
import { SIDEBAR_NAV, ROLES } from "@/lib/constants";

export default function Sidebar({ activeKey, onNavigate, onNewEncounter }) {
  const { user } = useAuth();
  const role = user?.role || "doctor";
  const navItems = SIDEBAR_NAV[role] || SIDEBAR_NAV.doctor;
  const roleConfig = ROLES[role];

  return (
    <aside
      style={{
        width: 240,
        background: "#faf5e8",
        borderRight: "1px solid #e5e5e5",
        padding: 20,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minHeight: "calc(100vh - 64px)",
        fontFamily: "Space Mono, monospace",
      }}
    >
      {/* User info block */}
      <div style={{ padding: "12px 12px 16px", marginBottom: 4 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
          {user?.name}
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 9999,
            background: roleConfig?.bg || "#e5e5e5",
            color: roleConfig?.color || "#0a0a0a",
            fontFamily: "Space Mono, monospace",
          }}
        >
          <i className={`ti ${roleConfig?.icon}`} style={{ fontSize: 11 }} />
          {roleConfig?.label}
        </span>
        {user?.hospital && (
          <div style={{ fontSize: 12, color: "#9a9a9a", marginTop: 4 }}>
            {user.hospital}
          </div>
        )}
      </div>

      {/* Nav items */}
      {navItems.map((item) => {
        // Section divider
        if (item.section) {
          return (
            <div key={`section-${item.key}`}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#9a9a9a",
                  padding: "16px 12px 6px",
                  marginTop: 8,
                  fontFamily: "Space Mono, monospace",
                }}
              >
                {item.section}
              </div>
              <SidebarItem
                item={item}
                isActive={activeKey === item.key}
                onClick={() =>
                  item.isAction ? onNewEncounter?.() : onNavigate(item.key)
                }
              />
            </div>
          );
        }

        return (
          <SidebarItem
            key={item.key}
            item={item}
            isActive={activeKey === item.key}
            onClick={() =>
              item.isAction ? onNewEncounter?.() : onNavigate(item.key)
            }
          />
        );
      })}
    </aside>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────
function SidebarItem({ item, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "10px 12px",
        borderRadius: 12,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 500,
        border: "none",
        textAlign: "left",
        background: isActive ? "#0a0a0a" : "transparent",
        fontFamily: "Space Mono, monospace",
        color: isActive ? "#fff" : "#6a6a6a",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "#f5f0e0";
          e.currentTarget.style.color = "#0a0a0a";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#6a6a6a";
        }
      }}
    >
      <i className={`ti ${item.icon}`} style={{ fontSize: 18 }} />
      {item.label}
    </button>
  );
}
