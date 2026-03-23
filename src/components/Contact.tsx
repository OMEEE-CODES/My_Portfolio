"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { portfolioData } from "@/lib/data";

interface FormState { name: string; email: string; subject: string; message: string; }

export default function Contact() {
  const { email, phone, linkedin } = portfolioData;
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [aiReply, setAiReply] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { setStatus("success"); setAiReply(data.autoReply); setCategory(data.category); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(6,8,16,0.6)",
    border: "1px solid rgba(99,102,241,0.15)",
    borderRadius: "10px", padding: "11px 15px",
    color: "#e2e8f0", fontSize: "13px", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "inherit",
  };

  const categoryLabel: Record<string, string> = {
    job_opportunity: "💼 Job Opportunity", collaboration: "🤝 Collaboration",
    project_inquiry: "💡 Project Inquiry", general: "📬 General",
  };

  const contacts = [
    { icon: Mail, label: "Email", value: email, href: `https://mail.google.com/mail/?view=cm&to=${email}`, color: "#818cf8" },
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone}`, color: "#c084fc" },
    { icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: linkedin, color: "#38bdf8" },
  ];

  return (
    <section id="contact" className="section">
      <div className="glow-orb" style={{ width: "500px", height: "500px", background: "rgba(99,102,241,0.08)", top: "50%", right: "-100px", transform: "translateY(-50%)", position: "absolute" }} />

      <div className="page-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "56px", textAlign: "center" }}>
          <span className="badge">Get In Touch</span>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900, color: "#f1f5f9", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "12px" }}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p style={{ color: "#334155", fontSize: "14px" }}>Have an opportunity or project in mind? I'd love to hear from you.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "24px", alignItems: "start" }}>

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {contacts.map(({ icon: Icon, label, value, href, color }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                style={{ textDecoration: "none" }}
              >
                <div className="card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${color}12`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <p style={{ color: "#334155", fontSize: "11px", marginBottom: "2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                    <p style={{ color: "#64748b", fontSize: "13px" }}>{value}</p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* AI badge */}
            <div className="card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "16px" }}>🤖</span>
                <span style={{ color: "#818cf8", fontSize: "12px", fontWeight: 700 }}>AI-Powered Form</span>
              </div>
              <p style={{ color: "#334155", fontSize: "12px", lineHeight: "1.7" }}>
                This form uses AI to classify your message and generate a personalised auto-reply instantly.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="card" style={{ padding: "32px" }}>
              {status === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "24px 0" }}>
                  <CheckCircle style={{ color: "#34d399", margin: "0 auto 16px" }} size={40} />
                  <h3 style={{ color: "#f1f5f9", fontWeight: 700, marginBottom: "8px", fontSize: "18px" }}>Message Sent!</h3>
                  {category && <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: "999px", background: "rgba(99,102,241,0.1)", color: "#818cf8", fontSize: "12px", marginBottom: "14px", border: "1px solid rgba(99,102,241,0.2)" }}>{categoryLabel[category]}</span>}
                  <p style={{ color: "#475569", fontSize: "13px", lineHeight: "1.75" }}>{aiReply}</p>
                  <button onClick={() => { setStatus("idle"); setAiReply(""); }} className="btn-outline" style={{ marginTop: "20px" }}>Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    {[{ name: "name", label: "Your Name", placeholder: "Omkar More", type: "text" }, { name: "email", label: "Email", placeholder: "hello@example.com", type: "email" }].map(f => (
                      <div key={f.name}>
                        <label style={{ display: "block", color: "#475569", fontSize: "12px", marginBottom: "7px", fontWeight: 600 }}>{f.label}</label>
                        <input type={f.type} name={f.name} value={form[f.name as keyof FormState]} onChange={handleChange} placeholder={f.placeholder} required style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = "rgba(99,102,241,0.45)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)"; }}
                          onBlur={e => { e.target.style.borderColor = "rgba(99,102,241,0.15)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#475569", fontSize: "12px", marginBottom: "7px", fontWeight: 600 }}>Subject</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "rgba(99,102,241,0.45)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(99,102,241,0.15)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#475569", fontSize: "12px", marginBottom: "7px", fontWeight: 600 }}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." required rows={5}
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={e => { e.target.style.borderColor = "rgba(99,102,241,0.45)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(99,102,241,0.15)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  {status === "error" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f87171", fontSize: "13px", background: "rgba(248,113,113,0.08)", padding: "10px 14px", borderRadius: "9px", border: "1px solid rgba(248,113,113,0.15)" }}>
                      <AlertCircle size={14} /> Something went wrong. Please try again.
                    </div>
                  )}
                  <motion.button type="submit" disabled={status === "loading"} className="btn-primary"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    style={{ justifyContent: "center", opacity: status === "loading" ? 0.7 : 1 }}
                  >
                    {status === "loading" ? <><Loader2 size={14} className="spin" /> Sending...</> : <><Send size={14} /> Send Message</>}
                  </motion.button>
                  <p style={{ color: "#1e293b", fontSize: "11px", textAlign: "center" }}>🤖 AI classifies & auto-replies to your message</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
