"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { sendMessage } from "../../lib/api";
import { FiSend, FiBookOpen, FiCpu } from "react-icons/fi";

const TypewriterText = ({ text, speed = 10 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const cleanedText = text.replace(/^\*/, "");
    let i = 0;
    setDisplayedText("");

    const timer = setInterval(() => {
      if (i < cleanedText.length) {
        setDisplayedText((prev) => prev + cleanedText.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className="ai-prose text-slate-800 text-sm sm:text-base leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {displayedText}
      </ReactMarkdown>
    </div>
  );
};

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: "initial",
      text: "Hello! I'm your SmartPrep AI assistant. Ask me any question about your course material, concepts, or exam prep.",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      id: Date.now() + Math.random(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const currentPrompt = inputMessage;
    setInputMessage("");
    setLoading(true);

    try {
      const result = await sendMessage(currentPrompt);

      const botMessage = {
        id: Date.now() + Math.random(),
        text: result.success
          ? result.data
          : "Sorry, I couldn't process that. Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat Error:", err);
      const errorMessage = {
        id: Date.now() + Math.random(),
        text: "Network error. Please check your backend connection.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[calc(100vh-7rem)] overflow-hidden">
        
        {/* HEADER */}
        <header className="px-6 py-4 bg-white border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <FiCpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">AI Study Assistant</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-slate-500 font-medium">Context-Aware Doubt Resolver</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600">
            <FiBookOpen className="w-3.5 h-3.5 text-indigo-600" /> +2 Science & Entrance Prep
          </div>
        </header>

        {/* MESSAGES VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none font-medium shadow-sm"
                      : "bg-white text-slate-900 border border-slate-200/80 rounded-bl-none shadow-sm"
                  }`}
                >
                  {message.sender === "bot" && message.id !== "initial" ? (
                    <TypewriterText text={message.text} />
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  )}

                  <div
                    className={`text-[10px] mt-2 font-medium ${
                      message.sender === "user" ? "text-indigo-200 text-right" : "text-slate-400 text-left"
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-xs font-semibold text-slate-500">Generating response...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </main>

        {/* INPUT FOOTER */}
        <footer className="p-4 bg-white border-t border-slate-200/80">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question about your study material..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-sm"
            >
              <FiSend className="w-4 h-4" /> <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}