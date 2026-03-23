"use client";
import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";

const catConfig: Record<string, { color: string; bg: string; dot: string }> = {
  Frontend:  { color: "#818cf8", bg: "rgba(129,140,248,0.08)", dot: "#818cf8" },
  Tools:     { color: "#c084fc", bg: "rgba(192,132,252,0.08)", dot: "#c084fc" },
  Concepts:  { color: "#34d399", bg: "rgba(52,211,153,0.08)",  dot: "#34d399" },
  Backend:   { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  dot: "#fb923c" },
  "AI Tools":{ color: "#f472b6", bg: "rgba(244,114,182,0.08)", dot: "#f472b6" },
};

export default function Skills() {
  const entries = Object.entries(portfolioData.skills);

  return (
    <section id="skills" className="section">
      <div className="glow-orb" style={{ width: "600px", height: "600px", background: "rgba(168,85,247,0.05)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", position: "absolute" }} />

      <div className="page-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "56px", textAlign: "center" }}>
          <span className="badge">Technical Skills</span>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900, color: "#f1f5f9", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            My <span className="gradient-text">Toolkit</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
          {entries.map(([cat, items], i) => {
            const cfg = catConfig[cat] || { color: "#818cf8", bg: "rgba(129,140,248,0.08)", dot: "#818cf8" };
            return (
              <motion.div key={cat}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="card"
                style={{ padding: "22px", borderColor: `${cfg.color}15` }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "16px", paddingBottom: "14px", borderBottom: `1px solid ${cfg.color}15` }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: cfg.dot, display: "inline-block", boxShadow: `0 0 10px ${cfg.dot}80` }} />
                  <span style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{cat}</span>
                </div>
                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {items.map(s => (
                    <motion.span key={s}
                      whileHover={{ scale: 1.06 }}
                      className="tag"
                      style={{ cursor: "default", borderColor: `${cfg.color}15` }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = cfg.color; el.style.borderColor = `${cfg.color}40`; el.style.background = cfg.bg; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = ""; el.style.borderColor = ""; el.style.background = ""; }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
