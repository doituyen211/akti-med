/**
 * Grid hiển thị KPI cards — dùng ở tất cả role dashboards.
 */

"use client";

/**
 * @param {{ stats: Array<{ label: string, value: string, sub?: string, subColor?: string }> }} props
 */
export default function StatsGrid({ stats }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
        gap: 16,
        marginBottom: 28,
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#9a9a9a",
              letterSpacing: "0.5px",
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            {s.label}
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: 28,
              fontWeight: 700,
              color: "#0a0a0a",
            }}
          >
            {s.value}
          </div>
          {s.sub && (
            <div
              style={{
                fontSize: 12,
                color: s.subColor || "#9a9a9a",
                marginTop: 4,
              }}
            >
              {s.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
