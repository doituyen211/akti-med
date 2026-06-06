/**
 * Ô nhập lệnh agent — bác sĩ gõ hoặc bấm voice để gọi tool.
 */

"use client";

import { useState } from "react";
import { useAgent } from "@/hooks/useAgent";

export default function LiveCommandBox({ encounterId }) {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { runCommand, startVoiceCommand } = useAgent(encounterId);

  async function handleRun() {
    const text = inputText.trim();
    if (!text) return;
    setIsLoading(true);
    setResult("");
    const res = await runCommand(text);
    setResult(res);
    setInputText("");
    setIsLoading(false);
  }

  function handleVoice() {
    startVoiceCommand((text) => {
      setInputText(text);
    });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleRun();
    }
  }

  return (
    <div
      style={{
        padding: "12px 20px",
        borderTop: "1px solid #e5e5e5",
        background: "#faf5e8",
      }}
    >
      {/* Label */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "1px",
          color: "#9a9a9a",
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        <i className="ti ti-robot" style={{ marginRight: 4 }} />
        Lệnh Agent
      </div>

      {/* Input row */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='VD: "Tìm lịch sử bệnh án", "Kiểm tra BHYT"...'
          style={{
            flex: 1,
            border: "1px solid #e5e5e5",
            borderRadius: 9999,
            padding: "8px 16px",
            fontSize: 13,
            fontFamily: "Inter, sans-serif",
            background: "#fff",
            outline: "none",
            color: "#0a0a0a",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#0a0a0a")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e5e5")}
        />

        {/* Send */}
        <button
          onClick={handleRun}
          disabled={isLoading || !inputText.trim()}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid #e5e5e5",
            background: "transparent",
            cursor: isLoading || !inputText.trim() ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6a6a6a",
            opacity: isLoading || !inputText.trim() ? 0.5 : 1,
          }}
        >
          <i
            className={`ti ${isLoading ? "ti-loader-2" : "ti-send"}`}
            style={isLoading ? { animation: "spin 1s linear infinite" } : {}}
          />
        </button>

        {/* Voice */}
        <button
          onClick={handleVoice}
          title="Lệnh giọng nói"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid #e5e5e5",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6a6a6a",
          }}
        >
          <i className="ti ti-microphone" />
        </button>
      </div>

      {/* Result */}
      {result && (
        <div
          style={{
            marginTop: 8,
            padding: "8px 12px",
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 8,
            fontSize: 13,
            color: "#1a1a1a",
            lineHeight: 1.5,
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}
