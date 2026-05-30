import React from "react";

export default function HeroSection() {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(59,130,246,0.08) 50%, rgba(239,68,68,0.08) 100%)",
      border: "1px solid rgba(124,58,237,0.2)",
      borderRadius: "20px",
      padding: "40px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: "-50px", left: "50%",
        transform: "translateX(-50%)", width: "400px", height: "200px",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        background: "rgba(0,120,212,0.1)", border: "1px solid rgba(0,120,212,0.3)",
        borderRadius: "20px", padding: "4px 14px", fontSize: "11px",
        color: "#60a5fa", marginBottom: "20px"
      }}>
        <span>☁️</span>
        <span>Microsoft Build AI Hackathon 2026 — Agent Swarms + Security in the Agentic Future</span>
      </div>

      <h1 style={{
        fontSize: "42px", fontWeight: "800",
        background: "linear-gradient(135deg, #a78bfa, #60a5fa, #4ade80)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", marginBottom: "16px",
        letterSpacing: "-1px", lineHeight: "1.1"
      }}>
        The Future of AI is a Swarm
      </h1>

      <p style={{
        fontSize: "18px", color: "#e4e4e7", fontWeight: "600",
        maxWidth: "700px", margin: "0 auto 8px", lineHeight: "1.5"
      }}>
        Enterprise teams waste 4+ hours on research and strategy.
        ARES does it in 10 seconds — with 7 AI agents and zero security risks.
      </p>

      <p style={{
        fontSize: "14px", color: "#71717a",
        maxWidth: "600px", margin: "0 auto 28px", lineHeight: "1.6"
      }}>
        Powered by Microsoft Azure AI — the only multi-agent system with built-in
        prompt injection detection, hallucination prevention, and real-time quality scoring.
      </p>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "16px",
        maxWidth: "700px", margin: "0 auto 28px", alignItems: "center"
      }}>
        <div style={{
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: "12px", padding: "16px"
        }}>
          <div style={{ color: "#f87171", fontWeight: "600", fontSize: "12px", marginBottom: "8px" }}>
            ❌ WITHOUT ARES
          </div>
          {[
            "4+ hours manual research",
            "Single agent hallucinations",
            "No security layer",
            "No output validation",
            "No autonomous recovery"
          ].map((item, i) => (
            <div key={i} style={{ color: "#71717a", fontSize: "11px", marginBottom: "4px" }}>• {item}</div>
          ))}
        </div>

        <div style={{ color: "#52525b", fontSize: "24px", fontWeight: "300" }}>→</div>

        <div style={{
          background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: "12px", padding: "16px"
        }}>
          <div style={{ color: "#4ade80", fontWeight: "600", fontSize: "12px", marginBottom: "8px" }}>
            ✅ WITH ARES
          </div>
          {[
            "10 second AI-powered analysis",
            "7 agents validate each other",
            "Azure AI security scanning",
            "Hallucination detection",
            "Auto-retry fault tolerance"
          ].map((item, i) => (
            <div key={i} style={{ color: "#71717a", fontSize: "11px", marginBottom: "4px" }}>• {item}</div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
        {[
          { value: "7", label: "Specialized Agents" },
          { value: "3x", label: "Security Layers" },
          { value: "10s", label: "Avg Execution Time" },
          { value: "A", label: "Avg Quality Grade" },
          { value: "100%", label: "Threat Detection" },
          { value: "$47B", label: "AI Agent Market 2027" }
        ].map((metric, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "24px", fontWeight: "800",
              background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {metric.value}
            </div>
            <div style={{ fontSize: "11px", color: "#52525b", marginTop: "2px" }}>
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
