"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Heart } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function Footer() {
  const { name, email, phone, github, linkedin } = portfolioData;

  return (
    <footer style={{ padding: "64px 28px 36px", position: "relative", zIndex: 1 }}>
      {/* Top shimmer */}
      <div className="shimmer-line" style={{ marginBottom: "48px" }} />

      <div className="page-wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "40px", alignItems: "start", marginBottom: "40px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "11px",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(99,102,241,0.35)"
              }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: "13px" }}>OM</span>
              </div>
              <div>
                <p style={{ color: "#f1f5f9", fontWeight: 800, fontSize: "16px", margin: 0, letterSpacing: "-0.3px" }}>{name}</p>
                <p style={{ color: "#475569", fontSize: "12px", margin: "2px 0 0" }}>Full Stack Developer</p>
              </div>
            </div>
            <p style={{ color: "#334155", fontSize: "13px", lineHeight: "1.75", maxWidth: "280px" }}>
              Building end-to-end web apps with React, Supabase, Firebase and a passion for clean, performant code.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href={`https://mail.google.com/mail/?view=cm&to=${email}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "13px", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#818cf8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
              >
                <Mail size={13} /> {email}
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#334155", fontSize: "13px" }}>
                <Phone size={13} /> {phone}
              </div>
            </div>
          </div>

          {/* Socials */}
          <div>
            <p style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}>Follow</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { icon: Github, href: github },
                { icon: Linkedin, href: linkedin },
                { icon: Mail, href: `https://mail.google.com/mail/?view=cm&to=${email}` },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.08 }}
                  style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#475569", textDecoration: "none", transition: "all 0.15s"
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#818cf8"; el.style.borderColor = "rgba(99,102,241,0.4)"; el.style.background = "rgba(99,102,241,0.12)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#475569"; el.style.borderColor = "rgba(99,102,241,0.15)"; el.style.background = "rgba(99,102,241,0.07)"; }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: "rgba(99,102,241,0.08)", marginBottom: "20px" }} />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}>
          <p style={{ color: "#1e293b", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
