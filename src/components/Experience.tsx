"use client";
import { motion } from "framer-motion";
import { ExternalLink, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="glow-orb" style={{ width: "500px", height: "500px", background: "rgba(168,85,247,0.06)", top: "50%", left: "-150px", transform: "translateY(-50%)", position: "absolute" }} />

      <div className="page-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "56px" }}>
          <span className="badge">Work Experience</span>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900, color: "#f1f5f9", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            Where I've{" "}
            <span className="gradient-text">Worked</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: "22px", top: "0", bottom: "0", width: "1px", background: "linear-gradient(180deg, rgba(99,102,241,0.4), rgba(99,102,241,0.1))", zIndex: 0 }} />

          {portfolioData.experience.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              style={{ paddingLeft: "60px", position: "relative", marginBottom: "24px" }}
            >
              {/* Timeline dot */}
              <div style={{
                position: "absolute", left: "14px", top: "28px",
                width: "17px", height: "17px", borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                boxShadow: "0 0 16px rgba(99,102,241,0.5)",
                zIndex: 1
              }} />

              <div className="card" style={{ padding: "36px" }}>
                {/* Header */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "28px" }}>
                  <div>
                    <h3 style={{ color: "#f1f5f9", fontWeight: 800, fontSize: "20px", marginBottom: "8px", letterSpacing: "-0.5px" }}>{exp.role}</h3>
                    <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#818cf8", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#c084fc")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#818cf8")}
                    >
                      {exp.company} <ExternalLink size={12} />
                    </a>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "12px" }}>
                      <Calendar size={12} /> {exp.duration}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "12px" }}>
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>
                </div>

                <div className="shimmer-line" style={{ marginBottom: "24px" }} />

                {/* Points */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {exp.points.map((point, j) => (
                    <motion.div key={j}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: j * 0.06 }}
                      style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
                    >
                      <CheckCircle2 size={14} style={{ color: "#818cf8", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ color: "#64748b", fontSize: "13px", lineHeight: "1.7" }}>{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
