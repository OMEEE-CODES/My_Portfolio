"use client";
import { motion } from "framer-motion";
import { Code2, Server, CreditCard, GitBranch, Brain, Rocket } from "lucide-react";
import { portfolioData } from "@/lib/data";

const highlights = [
  { icon: Code2, label: "Frontend", desc: "React.js · TypeScript · Tailwind CSS", color: "#818cf8", bg: "rgba(129,140,248,0.1)" },
  { icon: Server, label: "Backend", desc: "Supabase · Firebase · REST APIs", color: "#c084fc", bg: "rgba(192,132,252,0.1)" },
  { icon: CreditCard, label: "Payments", desc: "Razorpay gateway integration", color: "#fb923c", bg: "rgba(251,146,60,0.1)" },
  { icon: GitBranch, label: "DevOps", desc: "Vercel · Git · GitHub workflows", color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  { icon: Brain, label: "AI Tools", desc: "ChatGPT · Codex · AI-accelerated dev", color: "#f472b6", bg: "rgba(244,114,182,0.1)" },
  { icon: Rocket, label: "Deployment", desc: "Production-ready Vercel hosting", color: "#38bdf8", bg: "rgba(56,189,248,0.1)" },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }) };

export default function About() {
  return (
    <section id="about" className="section">
      {/* Glow */}
      <div className="glow-orb" style={{ width: "400px", height: "400px", background: "rgba(99,102,241,0.07)", top: "50%", right: "-100px", transform: "translateY(-50%)", position: "absolute" }} />

      <div className="page-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "56px" }}>
          <span className="badge">About Me</span>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900, color: "#f1f5f9", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            Full Stack{" "}
            <span className="gradient-text">Developer</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="card" style={{ padding: "36px" }}
          >
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.9", marginBottom: "24px" }}>
                {portfolioData.summary}
              </p>
              <div className="shimmer-line" style={{ marginBottom: "24px" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {["React.js", "JavaScript", "TypeScript", "Tailwind CSS", "Supabase", "Firebase", "Razorpay", "REST APIs", "Git", "Vercel", "Angular", "OOP"].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {highlights.map(({ icon: Icon, label, desc, color, bg }, i) => (
              <motion.div key={label}
                custom={i} initial="hidden" whileInView="show" variants={fadeUp}
                viewport={{ once: true }}
                className="card"
                style={{ padding: "20px" }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: bg, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>{label}</p>
                <p style={{ color: "#475569", fontSize: "11px", lineHeight: "1.6" }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
