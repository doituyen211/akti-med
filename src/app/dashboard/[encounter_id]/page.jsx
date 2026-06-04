import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../../../components/ui/UserContext";

/**
 * Encounter detail page. Displays a split view with transcript on the left
 * and a SOAP note editor on the right. A real application would stream
 * transcript data from a recorder; here we provide a simple form where
 * clinicians can enter subjective, objective, assessment and plan notes.
 */
export default function EncounterPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [assessment, setAssessment] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleSave = () => {
    if (!subjective) {
      alert("Vui lòng điền ít nhất phần Subjective");
      return;
    }
    alert("SOAP Note đã được lưu");
    router.push("/dashboard");
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
      <div
        style={{
          flex: 1,
          borderRight: "1px solid #e5e5e5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid #e5e5e5",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6a6a6a",
            }}
          >
            &larr; Quay lại
          </button>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>
              Bệnh nhân: Không tên
            </div>
            <div style={{ fontSize: 12, color: "#6a6a6a" }}>
              CA KHÁM #{Date.now().toString().slice(-4)}
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 12,
                padding: "4px 8px",
                borderRadius: 12,
                background: "rgba(34,197,94,.1)",
                color: "#15803d",
              }}
            >
              Đang soạn
            </span>
            <button
              onClick={handleSave}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                background: "#0a0a0a",
                color: "#fff",
                border: "none",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Lưu
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          <p style={{ fontSize: 14, color: "#6a6a6a" }}>
            Khu vực transcript sẽ hiển thị nội dung cuộc trò chuyện ở đây...
          </p>
        </div>
      </div>
      <div
        style={{
          width: 420,
          background: "#faf5e8",
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid #e5e5e5",
        }}
      >
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid #e5e5e5",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 18, color: "#1a3a3a" }}>📝</span>
          <span style={{ fontWeight: 600, fontSize: 15 }}>SOAP Note</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: 16, borderBottom: "1px solid #e5e5e5" }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
              S – Triệu chứng
            </div>
            <textarea
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              placeholder="Bệnh nhân mô tả triệu chứng, lý do đến khám..."
              style={{
                width: "100%",
                minHeight: 80,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e5e5",
                background: "#fff",
                resize: "vertical",
              }}
            />
          </div>
          <div style={{ padding: 16, borderBottom: "1px solid #e5e5e5" }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
              O – Khám lâm sàng
            </div>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="Kết quả khám: nhiệt độ, huyết áp, mạch, SpO2..."
              style={{
                width: "100%",
                minHeight: 80,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e5e5",
                background: "#fff",
                resize: "vertical",
              }}
            />
          </div>
          <div style={{ padding: 16, borderBottom: "1px solid #e5e5e5" }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
              A – Chẩn đoán
            </div>
            <textarea
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Chẩn đoán sơ bộ, chẩn đoán phân biệt..."
              style={{
                width: "100%",
                minHeight: 80,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e5e5",
                background: "#fff",
                resize: "vertical",
              }}
            />
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
              P – Kế hoạch điều trị
            </div>
            <textarea
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="Phác đồ điều trị, xét nghiệm cần làm, kê đơn..."
              style={{
                width: "100%",
                minHeight: 80,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e5e5",
                background: "#fff",
                resize: "vertical",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
