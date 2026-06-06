/**
 * Reusable badge/chip component.
 * variant: 'pink' | 'teal' | 'success' | 'warning' | 'error' | 'info' | 'lavender'
 */

"use client";

const VARIANT_STYLES = {
  pink: { background: "rgba(255,77,139,.1)", color: "#c0256d" },
  teal: { background: "rgba(26,58,58,.1)", color: "#1a3a3a" },
  success: { background: "rgba(34,197,94,.1)", color: "#15803d" },
  warning: { background: "rgba(245,158,11,.1)", color: "#92400e" },
  error: { background: "rgba(239,68,68,.1)", color: "#991b1b" },
  info: { background: "rgba(59,130,246,.1)", color: "#1d4ed8" },
  lavender: { background: "rgba(184,164,237,.2)", color: "#5b21b6" },
  muted: { background: "#f0f0f0", color: "#6a6a6a" },
  dark: { background: "rgba(255,255,255,.2)", color: "#fff" },
  mint: { background: "#a4d4c5", color: "#1a3a3a" },
};

export default function Badge({
  children,
  variant = "muted",
  icon,
  style: extraStyle,
}) {
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.muted;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: 9999,
        letterSpacing: "0.2px",
        ...styles,
        ...extraStyle,
      }}
    >
      {icon && <i className={`ti ${icon}`} style={{ fontSize: 11 }} />}
      {children}
    </span>
  );
}
