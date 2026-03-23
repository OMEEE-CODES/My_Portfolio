"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const links = ["About", "Experience", "Projects", "Skills", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "64px",
        background: scrolled ? "rgba(6,8,16,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.1)" : "none",
        transition: "all 0.35s ease",
      }}
    >
      <div style={{
        maxWidth: "1000px", margin: "0 auto", padding: "0 28px",
        height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              width: "34px", height: "34px", borderRadius: "9px",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(99,102,241,0.4)"
            }}
          >
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "12px", letterSpacing: "-0.5px" }}>OM</span>
          </motion.div>
          <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "14px", letterSpacing: "-0.2px" }}>
            Omkar <span style={{ color: "#818cf8" }}>More</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onMouseEnter={() => setActive(l)} onMouseLeave={() => setActive("")}
              style={{
                position: "relative", padding: "7px 15px", borderRadius: "8px",
                color: active === l ? "#e2e8f0" : "#64748b",
                fontSize: "13px", fontWeight: 500, textDecoration: "none",
                transition: "color 0.2s",
                background: active === l ? "rgba(99,102,241,0.08)" : "transparent",
              }}
            >{l}</a>
          ))}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              marginLeft: "12px", padding: "8px 20px", borderRadius: "9px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", fontSize: "13px", fontWeight: 600, textDecoration: "none",
              boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <Sparkles size={12} /> Hire Me
          </motion.a>
        </nav>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} style={{
          display: "none", width: "38px", height: "38px", borderRadius: "9px",
          border: "1px solid rgba(99,102,241,0.2)", background: "rgba(99,102,241,0.06)",
          color: "#94a3b8", cursor: "pointer", alignItems: "center", justifyContent: "center"
        }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{
              background: "rgba(6,8,16,0.97)", borderBottom: "1px solid rgba(99,102,241,0.1)",
              backdropFilter: "blur(20px)"
            }}
          >
            <div style={{ padding: "12px 24px 16px", display: "flex", flexDirection: "column", gap: "2px" }}>
              {links.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                  style={{ padding: "11px 14px", borderRadius: "9px", color: "#64748b", fontSize: "14px", textDecoration: "none", transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#64748b"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >{l}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
