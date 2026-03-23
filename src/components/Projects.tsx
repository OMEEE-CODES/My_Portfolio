"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data";

const accent = ["#818cf8", "#c084fc", "#34d399", "#fb923c"];

export default function Projects() {
  const { projects } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? projects : projects.filter(p => p.featured);

  return (
    <section id="projects" className="section">
      <div className="glow-orb" style={{ width: "500px", height: "500px", background: "rgba(99,102,241,0.07)", bottom: "-100px", right: "-100px", position: "absolute" }} />

      <div className="page-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "56px", textAlign: "center" }}>
          <span className="badge">Personal Projects</span>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900, color: "#f1f5f9", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "12px" }}>
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p style={{ color: "#334155", fontSize: "14px" }}>A selection of projects that showcase my skills</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          <AnimatePresence>
            {displayed.map((project, i) => (
              <motion.div key={project.title}
                layout
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="card"
                style={{ padding: "28px", display: "flex", flexDirection: "column" }}
              >
                {/* Top bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  {/* Icon */}
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: `linear-gradient(135deg, ${accent[i % accent.length]}20, ${accent[(i + 1) % accent.length]}15)`,
                    border: `1px solid ${accent[i % accent.length]}25`,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <span style={{ color: accent[i % accent.length], fontSize: "17px", fontWeight: 800 }}>
                      {project.title[0]}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {project.featured && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#fbbf24", fontSize: "11px", fontWeight: 600, background: "rgba(251,191,36,0.08)", padding: "3px 10px", borderRadius: "999px", border: "1px solid rgba(251,191,36,0.15)" }}>
                        <Star size={9} fill="currentColor" /> Featured
                      </span>
                    )}
                    <span style={{ color: "#1e293b", fontSize: "11px", fontWeight: 500 }}>{project.year}</span>
                  </div>
                </div>

                <h3 style={{ color: "#f1f5f9", fontWeight: 800, fontSize: "17px", marginBottom: "5px", letterSpacing: "-0.3px" }}>{project.title}</h3>
                <p style={{ color: accent[i % accent.length], fontSize: "11px", fontWeight: 600, marginBottom: "14px", letterSpacing: "0.04em", textTransform: "uppercase" }}>{project.type}</p>
                <p style={{ color: "#475569", fontSize: "13px", lineHeight: "1.8", marginBottom: "18px", flexGrow: 1 }}>{project.description}</p>

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "20px" }}>
                  {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>

                {/* Links */}
                {(project.demo || project.repo) && (
                  <>
                    <div style={{ height: "1px", background: "rgba(99,102,241,0.1)", marginBottom: "18px" }} />
                    <div style={{ display: "flex", gap: "16px" }}>
                      {project.demo && (
                        <motion.a href={project.demo} target="_blank" rel="noopener noreferrer"
                          whileHover={{ x: 2 }}
                          style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#475569", textDecoration: "none", fontWeight: 600, transition: "color 0.15s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#818cf8")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                        >
                          <ExternalLink size={13} /> Live Demo <ArrowUpRight size={11} />
                        </motion.a>
                      )}
                      {project.repo && (
                        <motion.a href={project.repo} target="_blank" rel="noopener noreferrer"
                          whileHover={{ x: 2 }}
                          style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#475569", textDecoration: "none", fontWeight: 600, transition: "color 0.15s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#818cf8")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                        >
                          <Github size={13} /> Source Code
                        </motion.a>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: "center", marginTop: "36px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          {!showAll && projects.length > displayed.length && (
            <motion.button onClick={() => setShowAll(true)} className="btn-outline"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Show All Projects ({projects.length - displayed.length} more)
            </motion.button>
          )}
          <p style={{ color: "#334155", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#6366f1", fontSize: "14px", fontWeight: 700 }}>50+</span>
            projects built in total — these are the highlighted ones 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
