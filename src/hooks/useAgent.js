/**
 * Gửi lệnh ngôn ngữ tự nhiên tới Agent, xử lý response.
 * Mock response khi backend chưa sẵn sàng.
 */

"use client";

import { useCallback } from "react";
import { useEncounterStore } from "../app/store";
import { useNotifStore } from "../app/store";
import { runAgentCommand } from "@/lib/api";
import { AGENT_RESPONSES } from "@/lib/constants";

export function useAgent(encounterId) {
  const { addAgentCommand, updateAgentCommand, isEmergencyMode } =
    useEncounterStore();
  const { showNotif } = useNotifStore();

  /**
   * Tìm mock response phù hợp từ AGENT_RESPONSES map
   * @param {string} text - lệnh lowercase
   */
  function findMockResponse(text) {
    for (const [keyword, response] of Object.entries(AGENT_RESPONSES)) {
      if (text.includes(keyword)) return response;
    }
    return null;
  }

  /**
   * Gửi lệnh text tới agent
   * @param {string} commandText
   * @returns {Promise<string>} - kết quả agent trả về
   */
  const runCommand = useCallback(
    async (commandText) => {
      if (!commandText.trim()) return "";

      // Emergency mode → không gọi tool calling, chỉ log
      if (isEmergencyMode) {
        showNotif("🚨 Chế độ cấp cứu: lệnh đã được log", "warning");
        return "⚠️ Emergency mode: lệnh đã được ghi vào blackbox log.";
      }

      const cmdId = Date.now().toString();
      const lowerCmd = commandText.toLowerCase();

      // Thêm command vào store với status pending
      addAgentCommand({
        id: cmdId,
        encounterId,
        rawText: commandText,
        toolName: "unknown",
        parameters: {},
        status: "pending",
      });

      try {
        // Thử gọi API thật
        const data = await runAgentCommand(encounterId, commandText);
        const result = data.result || "Agent đã thực hiện thành công.";

        updateAgentCommand(cmdId, {
          status: "completed",
          result,
          toolName: data.toolName,
        });
        showNotif("Agent đã phản hồi", "success");
        return result;
      } catch {
        // Backend chưa có → mock response
        const mockResult =
          findMockResponse(lowerCmd) ||
          `🤖 Agent: Đã nhận lệnh "${commandText}". Đang thực thi... (API chưa kết nối)`;

        updateAgentCommand(cmdId, { status: "completed", result: mockResult });
        showNotif("Agent đã phản hồi (demo)", "info");
        return mockResult;
      }
    },
    [
      encounterId,
      isEmergencyMode,
      addAgentCommand,
      updateAgentCommand,
      showNotif,
    ],
  );

  /**
   * Giả lập nhận lệnh giọng nói (thay bằng Web Speech API sau)
   * @param {(text: string) => void} onResult - callback khi nhận được text
   */
  const startVoiceCommand = useCallback(
    (onResult) => {
      showNotif("🎤 Đang nghe lệnh giọng nói...", "info");

      // Web Speech API (nếu trình duyệt hỗ trợ)
      if (
        typeof window !== "undefined" &&
        "webkitSpeechRecognition" in window
      ) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "vi-VN";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          onResult(text);
        };
        recognition.onerror = () => {
          // Fallback demo
          setTimeout(() => onResult("Kiểm tra BHYT bệnh nhân"), 1000);
        };
        recognition.start();
      } else {
        // Demo fallback
        setTimeout(() => {
          onResult("Kiểm tra BHYT bệnh nhân");
          showNotif("Nhận được lệnh giọng nói (demo)", "info");
        }, 1500);
      }
    },
    [showNotif],
  );

  return { runCommand, startVoiceCommand };
}
