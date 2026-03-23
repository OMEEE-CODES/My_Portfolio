"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Zap, Code2 } from "lucide-react";
import { portfolioData } from "@/lib/data";

function TypeWriter({ words }: { words: string[] }) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pausing, setPausing] = useState(false);

  useEffect(() => {
    if (pausing) return;
    const current = words[wordIdx];
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setPausing(true);
          setTimeout(() => { setPausing(false); setDeleting(true); }, 2200);
        } else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false); setCharIdx(0);
          setWordIdx(w => (w + 1) % words.length);
        } else setCharIdx(c => c - 1);
      }
    }, deleting ? 30 : 65);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, pausing]);

  return (
    <span style={{ color: "#a5b4fc" }}>
      {display}
      <span className="cursor-blink" style={{ color: "#818cf8", marginLeft: "1px" }}>|</span>
    </span>
  );
}

const stats = [
  { value: "6mo", label: "Experience" },
  { value: "50+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
];

export default function Hero() {
  const { name, taglines, email, github, linkedin } = portfolioData;

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden", padding: "120px 28px 80px"
    }}>
      {/* Glow orbs */}
      <div className="glow-orb" style={{ width: "600px", height: "600px", background: "rgba(99,102,241,0.12)", top: "-100px", left: "-100px" }} />
      <div className="glow-orb" style={{ width: "400px", height: "400px", background: "rgba(168,85,247,0.08)", bottom: "0", right: "-50px" }} />

      <div className="page-wrap" style={{ width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "center" }}>

          {/* Left content */}
          <div>
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: "28px" }}
            >
              <span className="badge">
                <span style={{
                  width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e",
                  display: "inline-block", boxShadow: "0 0 8px rgba(34,197,94,0.8)"
                }} />
                Available for new opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{
                fontSize: "clamp(48px, 7vw, 82px)", fontWeight: 900,
                lineHeight: 1.04, letterSpacing: "-3px", marginBottom: "20px"
              }}
            >
              <span style={{ color: "#f1f5f9" }}>Omkar</span>
              <br />
              <span className="gradient-text">More</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 500, marginBottom: "20px", minHeight: "32px" }}
            >
              <TypeWriter words={taglines} />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ color: "#475569", fontSize: "15px", lineHeight: "1.85", maxWidth: "520px", marginBottom: "40px" }}
            >
              Building complete, production-ready web applications — from responsive React.js frontends to Supabase & Firebase backends, with seamless Vercel deployment.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "48px" }}
            >
              <motion.a href="#projects" className="btn-primary"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                View Projects <ArrowRight size={15} />
              </motion.a>
              <motion.a href="#contact" className="btn-outline"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              {[
                { icon: Github, href: github, label: "GitHub" },
                { icon: Linkedin, href: linkedin, label: "LinkedIn" },
                { icon: Mail, href: `https://mail.google.com/mail/?view=cm&to=${email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  title={label}
                  whileHover={{ y: -2, scale: 1.08 }} whileTap={{ scale: 0.94 }}
                  style={{
                    width: "42px", height: "42px", borderRadius: "11px",
                    background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#64748b", textDecoration: "none", transition: "color 0.2s, border-color 0.2s, background 0.2s"
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#818cf8"; el.style.borderColor = "rgba(99,102,241,0.4)";
                    el.style.background = "rgba(99,102,241,0.12)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#64748b"; el.style.borderColor = "rgba(99,102,241,0.15)";
                    el.style.background = "rgba(99,102,241,0.07)";
                  }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
              <span style={{ width: "1px", height: "24px", background: "rgba(99,102,241,0.15)", margin: "0 6px" }} />
              <span style={{ color: "#334155", fontSize: "12px" }}>{email}</span>
            </motion.div>
          </div>

          {/* Right — stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "180px" }}
          >
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="card"
                style={{ padding: "22px 24px", textAlign: "center" }}
              >
                <div className="stat-number">{s.value}</div>
                <div style={{ color: "#475569", fontSize: "12px", marginTop: "4px" }}>{s.label}</div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="card"
              style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Zap size={15} style={{ color: "#818cf8" }} />
              </div>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: "11px", fontWeight: 700 }}>AI-Powered</div>
                <div style={{ color: "#334155", fontSize: "11px" }}>ChatGPT / Codex</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="card"
              style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Code2 size={15} style={{ color: "#22c55e" }} />
              </div>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: "11px", fontWeight: 700 }}>Full Stack</div>
                <div style={{ color: "#334155", fontSize: "11px" }}>React · Node · DB</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom shimmer line */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="shimmer-line"
          style={{ marginTop: "60px" }}
        />
      </div>
    </section>
  );
}
