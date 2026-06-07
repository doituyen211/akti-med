/**
 * Dashboard chính — hiển thị khác nhau theo role.
 * Bọc Sidebar + content area, quản lý active section.
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useNotifStore } from "../store";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsGrid from "@/components/dashboard/StatsGrid";
import EncounterTable from "@/components/dashboard/EncounterTable";
import ConsentModal from "@/components/shared/ConsentModal";
import Badge from "../../components/shared/Bagde";
import { DEMO_ENCOUNTERS } from "@/lib/constants";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { showNotif } = useNotifStore();

  const [activeKey, setActiveKey] = useState("overview");
  const [consentOpen, setConsentOpen] = useState(false);
  const [pendingEncounter, setPendingEncounter] = useState(null);

  // Guard: redirect về login nếu chưa authen
  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!user) return null;

  // ── Open encounter: show consent first ───────────────────────────────────────
  function handleOpenEncounter(enc) {
    if (enc.status === "completed") {
      // Xem lại SOAP — không cần consent
      router.push(`/dashboard/${enc.id}`);
      return;
    }
    // Cần consent trước khi ghi âm
    setPendingEncounter(enc);
    setConsentOpen(true);
  }

  function handleConsentConfirm() {
    setConsentOpen(false);
    if (pendingEncounter) {
      router.push(`/dashboard/${pendingEncounter.id}`);
    } else {
      // Ca mới — tạo encounter tạm
      router.push("/dashboard/new");
    }
  }

  function handleNewEncounter() {
    setPendingEncounter(null);
    setConsentOpen(true);
  }

  // ── Content theo role + section ───────────────────────────────────────────────
  function renderContent() {
    const role = user.role;

    if (role === "admin")
      return <AdminContent activeKey={activeKey} onNotif={showNotif} />;
    if (role === "doctor")
      return (
        <DoctorContent
          activeKey={activeKey}
          encounters={DEMO_ENCOUNTERS}
          onOpenEncounter={handleOpenEncounter}
          onNewEncounter={handleNewEncounter}
        />
      );
    if (role === "nurse") return <NurseContent />;
    if (role === "patient") return <PatientContent />;
    return null;
  }

  return (
    <>
      <ConsentModal
        isOpen={consentOpen}
        patientName={pendingEncounter?.patientName}
        onConfirm={handleConsentConfirm}
        onCancel={() => setConsentOpen(false)}
      />

      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        <Sidebar
          activeKey={activeKey}
          onNavigate={setActiveKey}
          onNewEncounter={handleNewEncounter}
        />
        <main style={{ flex: 1, overflowY: "auto", padding: 32 }}>
          {renderContent()}
        </main>
      </div>
    </>
  );
}

// ── Admin Dashboard Content ───────────────────────────────────────────────────
function AdminContent({ activeKey, onNotif }) {
  if (activeKey === "users") return <UsersSection onNotif={onNotif} />;
  if (activeKey === "analytics")
    return <PlaceholderSection title="Thống kê" icon="ti-chart-bar" />;
  if (activeKey === "settings")
    return <PlaceholderSection title="Cài đặt" icon="ti-settings" />;
  if (activeKey === "billing")
    return <PlaceholderSection title="Thanh toán" icon="ti-credit-card" />;

  // Default: overview
  return (
    <>
      <DashHeader title="Dashboard Admin" />
      <StatsGrid
        stats={[
          {
            label: "TỔNG NGƯỜI DÙNG",
            value: "248",
            sub: "↑ 12 tuần này",
            subColor: "#22c55e",
          },
          {
            label: "CA KHÁM HÔM NAY",
            value: "1,847",
            sub: "↑ 8.2%",
            subColor: "#22c55e",
          },
          { label: "SOAP NOTES TẠO", value: "94.3K", sub: "Tổng cộng" },
          {
            label: "DOANH THU T6",
            value: "₫284M",
            sub: "↑ 21%",
            subColor: "#22c55e",
          },
        ]}
      />

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Recent users table */}
        <Card title="Người dùng gần đây">
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
          >
            <thead>
              <tr>
                {["Tên", "Vai trò", "Bệnh viện", "Trạng thái", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#9a9a9a",
                      padding: "8px 12px",
                      borderBottom: "1px solid #e5e5e5",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "BS. Nguyễn Anh",
                  role: "Bác sĩ",
                  roleVariant: "teal",
                  hospital: "BV Bạch Mai",
                  status: "Hoạt động",
                  statusVariant: "success",
                },
                {
                  name: "Y tá Trần Lan",
                  role: "Y tá",
                  roleVariant: "info",
                  hospital: "BV Nhi TW",
                  status: "Hoạt động",
                  statusVariant: "success",
                },
                {
                  name: "BS. Lê Minh",
                  role: "Bác sĩ",
                  roleVariant: "teal",
                  hospital: "BV 108",
                  status: "Chờ duyệt",
                  statusVariant: "warning",
                },
              ].map((u) => (
                <tr key={u.name} style={{ cursor: "pointer" }}>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {u.name}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <Badge variant={u.roleVariant}>{u.role}</Badge>
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f0f0f0",
                      color: "#6a6a6a",
                    }}
                  >
                    {u.hospital}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <Badge variant={u.statusVariant}>{u.status}</Badge>
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <a
                      style={{
                        color: "#6a6a6a",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      Xem
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* API usage */}
        <Card title="Sử dụng API">
          <div
            style={{
              padding: "16px 0",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {[
              { label: "Whisper API", pct: 84, color: "#1a3a3a" },
              { label: "Llama-3 API", pct: 61, color: "#ff4d8b" },
              { label: "Storage", pct: 42, color: "#e8b94a" },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                    fontSize: 13,
                  }}
                >
                  <span>{item.label}</span>
                  <strong>{item.pct}%</strong>
                </div>
                <div
                  style={{ height: 6, background: "#f0f0f0", borderRadius: 3 }}
                >
                  <div
                    style={{
                      width: `${item.pct}%`,
                      height: "100%",
                      background: item.color,
                      borderRadius: 3,
                      transition: "width .3s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

// ── Doctor Dashboard Content ──────────────────────────────────────────────────
function DoctorContent({
  activeKey,
  encounters,
  onOpenEncounter,
  onNewEncounter,
}) {
  if (
    activeKey === "encounters" ||
    activeKey === "patients" ||
    activeKey === "soap-history"
  ) {
    return (
      <>
        <DashHeader
          title={
            {
              encounters: "Ca khám hôm nay",
              patients: "Danh sách bệnh nhân",
              "soap-history": "Lịch sử SOAP",
            }[activeKey]
          }
        />
        <EncounterTable encounters={encounters} onOpen={onOpenEncounter} />
      </>
    );
  }

  return (
    <>
      <DashHeader title="Dashboard Bác sĩ">
        <button
          onClick={onNewEncounter}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 40,
            padding: "0 20px",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            borderRadius: 12,
            background: "#0a0a0a",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <i className="ti ti-plus" /> Ca khám mới
        </button>
      </DashHeader>

      <StatsGrid
        stats={[
          { label: "CA KHÁM HÔM NAY", value: "12", sub: "3 còn lại" },
          { label: "SOAP NOTES", value: "847", sub: "Tổng cộng" },
          {
            label: "THỜI GIAN TIẾT KIỆM",
            value: "47h",
            sub: "Tháng này",
            subColor: "#22c55e",
          },
          {
            label: "ĐỘ CHÍNH XÁC",
            value: "97.2%",
            sub: "↑ SOAP Note",
            subColor: "#22c55e",
          },
        ]}
      />

      <EncounterTable encounters={encounters} onOpen={onOpenEncounter} />
    </>
  );
}

// ── Nurse Dashboard Content ───────────────────────────────────────────────────
function NurseContent() {
  return (
    <>
      <DashHeader title="Dashboard Y tá" />
      <StatsGrid
        stats={[
          { label: "BỆNH NHÂN HÔM NAY", value: "34" },
          { label: "CHỈ SỐ ĐÃ GHI", value: "28" },
          {
            label: "HÀNG ĐỢI",
            value: "6",
            sub: "Chờ khám",
            subColor: "#f59e0b",
          },
        ]}
      />
      <Card title="Hàng đợi hiện tại">
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
        >
          <thead>
            <tr>
              {["STT", "Bệnh nhân", "Chờ (phút)", "Triệu chứng", "Ưu tiên"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#9a9a9a",
                      padding: "8px 12px",
                      borderBottom: "1px solid #e5e5e5",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {[
              {
                stt: 1,
                name: "Nguyễn A",
                wait: 5,
                sx: "Sốt, ho",
                priority: "warning",
                label: "Bình thường",
              },
              {
                stt: 2,
                name: "Trần B",
                wait: 12,
                sx: "Đau ngực",
                priority: "error",
                label: "Ưu tiên cao",
              },
              {
                stt: 3,
                name: "Lê C",
                wait: 18,
                sx: "Tái khám",
                priority: "info",
                label: "Thấp",
              },
            ].map((r) => (
              <tr key={r.stt}>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {r.stt}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {r.name}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {r.wait} phút
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {r.sx}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Badge variant={r.priority}>{r.label}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

// ── Patient Dashboard Content ─────────────────────────────────────────────────
function PatientContent() {
  return (
    <>
      <DashHeader title="Hồ sơ của tôi" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
        <Card title="Thông tin cá nhân">
          <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#b8a4ed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
                color: "#fff",
                margin: "0 auto 10px",
              }}
            >
              BN
            </div>
            <div style={{ fontWeight: 600 }}>Bệnh nhân Demo</div>
            <div style={{ fontSize: 12, color: "#9a9a9a" }}>
              BHYT: DN4123456789
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginTop: 12,
            }}
          >
            {[
              ["Ngày sinh", "01/01/1990"],
              ["Nhóm máu", "O+"],
              ["Dị ứng", "Penicillin"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <span style={{ color: "#9a9a9a" }}>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Lịch sử khám gần đây">
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
          >
            <thead>
              <tr>
                {["Ngày", "Bác sĩ", "Chẩn đoán", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#9a9a9a",
                      padding: "8px 12px",
                      borderBottom: "1px solid #e5e5e5",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["01/06/2025", "BS. Nguyễn", "Cảm cúm thông thường"],
                ["15/05/2025", "BS. Trần", "Tăng huyết áp độ 1"],
                ["02/04/2025", "BS. Lê", "Viêm họng cấp"],
              ].map(([date, dr, dx]) => (
                <tr key={date}>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {date}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {dr}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {dx}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <a
                      style={{
                        color: "#6a6a6a",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      Xem SOAP
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}

// ── Users section (admin) ─────────────────────────────────────────────────────
function UsersSection({ onNotif }) {
  return (
    <>
      <DashHeader title="Quản lý người dùng">
        <button
          onClick={() => onNotif("Tính năng thêm người dùng", "info")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 40,
            padding: "0 20px",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            borderRadius: 12,
            background: "#0a0a0a",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <i className="ti ti-plus" /> Thêm mới
        </button>
      </DashHeader>
      <Card title="Tất cả người dùng (248)">
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
        >
          <thead>
            <tr>
              {["Tên", "Email", "Vai trò", "Gói", "Trạng thái", ""].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#9a9a9a",
                    padding: "8px 12px",
                    borderBottom: "1px solid #e5e5e5",
                    fontFamily: "Space Mono, monospace",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "BS. Nguyễn Anh",
                email: "nguyenanh@bvbachmai.vn",
                role: "Bác sĩ",
                rVariant: "teal",
                tier: "Pro",
                status: "Hoạt động",
                sVariant: "success",
              },
              {
                name: "Y tá Trần Lan",
                email: "tranlan@bvnhitw.vn",
                role: "Y tá",
                rVariant: "info",
                tier: "Clinic",
                status: "Hoạt động",
                sVariant: "success",
              },
              {
                name: "Admin BV 108",
                email: "admin@bv108.vn",
                role: "Admin",
                rVariant: "warning",
                tier: "Enterprise",
                status: "Hoạt động",
                sVariant: "success",
              },
            ].map((u) => (
              <tr key={u.name}>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {u.name}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                    color: "#9a9a9a",
                  }}
                >
                  {u.email}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Badge variant={u.rVariant}>{u.role}</Badge>
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {u.tier}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Badge variant={u.sVariant}>{u.status}</Badge>
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <a
                    style={{
                      color: "#6a6a6a",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    Sửa
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

// ── Shared small components ───────────────────────────────────────────────────
function DashHeader({ title, children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
      }}
    >
      <h1
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.5px",
        }}
      >
        {title}
      </h1>
      {children}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 16,
        fontFamily: "Space Mono, monospace",
        overflow: "hidden",
        marginBottom: 20,
      }}
    >
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #e5e5e5" }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function PlaceholderSection({ title, icon }) {
  return (
    <>
      <DashHeader title={title} />
      <div style={{ textAlign: "center", padding: 80, color: "#9a9a9a" }}>
        <i
          className={`ti ${icon}`}
          style={{ fontSize: 48, display: "block", marginBottom: 12 }}
        />
        Tính năng đang phát triển
      </div>
    </>
  );
}
