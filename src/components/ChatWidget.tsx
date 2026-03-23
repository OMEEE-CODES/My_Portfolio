"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const starters = [
  "What are Omkar's main skills?",
  "Tell me about his projects",
  "Is he open to work?",
  "What's his experience?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm Omkar's AI assistant. Ask me anything about his skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message || "Sorry, I couldn't process that." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Oops! Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              width: "340px",
              maxHeight: "480px",
              borderRadius: "20px",
              background: "rgba(5, 10, 20, 0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 245, 255, 0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0,245,255,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{ padding: "14px 16px", background: "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(155,93,229,0.08))", borderBottom: "1px solid rgba(0,245,255,0.1)", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #00f5ff, #9b5de5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={16} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: 600, margin: 0 }}>Omkar's AI Assistant</p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  <span style={{ color: "#4ade80", fontSize: "11px" }}>Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px", maxHeight: "280px" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: msg.role === "assistant" ? "linear-gradient(135deg, #00f5ff, #9b5de5)" : "#334155", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {msg.role === "assistant" ? <Bot size={12} color="white" /> : <User size={12} color="#cbd5e1" />}
                  </div>
                  <div style={{ maxWidth: "78%", padding: "8px 12px", borderRadius: "12px", fontSize: "12px", lineHeight: "1.6", background: msg.role === "assistant" ? "rgba(0,245,255,0.05)" : "rgba(51,65,85,0.8)", border: msg.role === "assistant" ? "1px solid rgba(0,245,255,0.12)" : "none", color: "#cbd5e1" }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, #00f5ff, #9b5de5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Bot size={12} color="white" />
                  </div>
                  <div style={{ padding: "8px 12px", borderRadius: "12px", background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.12)" }}>
                    <Loader2 size={13} color="#00f5ff" style={{ animation: "spin 1s linear infinite" }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick starters */}
            {messages.length === 1 && (
              <div style={{ padding: "0 12px 10px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {starters.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    style={{ padding: "4px 10px", borderRadius: "999px", background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.18)", color: "#00f5ff", fontSize: "11px", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,245,255,0.12)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,245,255,0.05)")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(0,245,255,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about Omkar..."
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#cbd5e1", fontSize: "13px" }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: !input.trim() || loading ? 0.3 : 1 }}
              >
                <Send size={13} color="#00f5ff" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI chat"
        style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #00f5ff, #9b5de5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,245,255,0.3), 0 4px 12px rgba(0,0,0,0.4)" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} color="white" />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={20} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
