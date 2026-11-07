"use client";

import { useState } from "react";
import { FaPaperPlane, FaTimes, FaRobot } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { useChatbot } from "../../hooks/useChatbot";
import TypingDots from "../ui/TypingDots";

/**
 * ChatWidget Component
 * Floating chatbot overlay for study assistance
 */
export default function ChatWidget({ metaData, selectedSubtopic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { askChatbot, loading } = useChatbot({ metaData, selectedSubtopic });

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = async () => {
    if (!message.trim() || !selectedSubtopic) return;

    const userMessage = message.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setMessage("");

    try {
      const botReply = await askChatbot(userMessage);
      const botText =
        typeof botReply === "string"
          ? botReply
          : botReply?.text || botReply?.content || "⚠️ Empty response.";

      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <>
      {/* Floating Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <FaTimes className="text-lg" />
        ) : (
          <div className="relative">
            <FaRobot className="text-xl" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-600 rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Overlay */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-slate-100 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <FaRobot className="text-base" />
              </div>
              <div>
                <h2 className="font-bold text-sm text-slate-900">Study Assistant</h2>
                <p className="text-[11px] text-slate-500 truncate max-w-[170px]">
                  {selectedSubtopic?.title || selectedSubtopic?.name || "General Topic"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="text-xs text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Clear chat"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={toggleChat}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                title="Close"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50/60 space-y-3">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-3">
                  <FaRobot className="text-xl text-indigo-600" />
                </div>
                <h3 className="font-bold text-sm text-slate-800 mb-1">
                  How can I help you today?
                </h3>
                <p className="text-xs text-slate-500 mb-4 max-w-xs">
                  Ask conceptual doubts, formulas, or step-by-step explanations for this chapter.
                </p>
                <div className="text-[11px] text-slate-500 bg-white border border-slate-200/80 px-3 py-2 rounded-xl">
                  Try: "Explain this concept simply" or "Give me a practice example"
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed transition-all shadow-2xs ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-none font-medium"
                        : "bg-white text-slate-800 rounded-bl-none border border-slate-200/80"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <div className="prose prose-sm max-w-none text-slate-800">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))
            )}

            {loading && <TypingDots />}
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-3 bg-white">
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask about this topic..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                disabled={!selectedSubtopic}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !message.trim() || !selectedSubtopic}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-xs"
                aria-label="Send message"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </div>
            {!selectedSubtopic && (
              <p className="text-[11px] text-amber-600 mt-1.5 text-center">
                Please select a unit or subtopic from the curriculum to chat.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
