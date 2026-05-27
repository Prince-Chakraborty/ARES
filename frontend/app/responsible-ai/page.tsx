"use client";

export default function ResponsibleAI() {
  return (
    <main>
      <header className="ares-header">
        <div className="ares-logo">
          <div className="ares-logo-icon">A</div>
          <div>
            <h1>ARES</h1>
            <p>Responsible AI</p>
          </div>
        </div>
      </header>

      <div className="main-content">

        {/* Header */}
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🛡️</div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
            Responsible AI Commitment
          </h2>
          <p style={{ color: "#71717a", fontSize: "14px", maxWidth: "600px", margin: "0 auto" }}>
            ARES is built on Microsoft Responsible AI principles — fairness, reliability, privacy, security, inclusiveness, transparency, and accountability.
          </p>
        </div>

        {/* Principles Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            {
              icon: "⚖️",
              title: "Fairness",
              color: "#a78bfa",
              border: "rgba(124,58,237,0.3)",
              bg: "rgba(124,58,237,0.08)",
              points: [
                "Agents are prompted to avoid bias in research and analysis",
                "Validator agent cross-checks outputs for logical consistency",
                "No demographic assumptions in task execution",
                "Equal treatment across all user inputs"
              ]
            },
            {
              icon: "🔒",
              title: "Security & Safety",
              color: "#f87171",
              border: "rgba(239,68,68,0.3)",
              bg: "rgba(239,68,68,0.08)",
              points: [
                "Security agent scans every input for prompt injection",
                "Rule-based pattern matching for known attack vectors",
                "LLM-based threat analysis for novel attacks",
                "Automatic task blocking on threat detection"
              ]
            },
            {
              icon: "🔍",
              title: "Transparency",
              color: "#60a5fa",
              border: "rgba(59,130,246,0.3)",
              bg: "rgba(59,130,246,0.08)",
              points: [
                "Full agent execution log visible in real time",
                "Every agent decision is traceable and auditable",
                "Security scan results are shown to users",
                "Quality scores and grades are always displayed"
              ]
            },
            {
              icon: "🧠",
              title: "Reliability",
              color: "#4ade80",
              border: "rgba(34,197,94,0.3)",
              bg: "rgba(34,197,94,0.08)",
              points: [
                "Validator agent detects hallucinations in outputs",
                "Retry mechanism for failed agent executions",
                "Critic agent scores output quality 0-10",
                "Fault-tolerant orchestration graph"
              ]
            },
            {
              icon: "🌍",
              title: "Inclusiveness",
              color: "#2dd4bf",
              border: "rgba(20,184,166,0.3)",
              bg: "rgba(20,184,166,0.08)",
              points: [
                "Accessible dark UI with high contrast",
                "Plain language output formatting",
                "No technical knowledge required to use",
                "Supports any domain or industry goal"
              ]
            },
            {
              icon: "👤",
              title: "Privacy",
              color: "#fbbf24",
              border: "rgba(245,158,11,0.3)",
              bg: "rgba(245,158,11,0.08)",
              points: [
                "No user data stored permanently",
                "Task memory is session-scoped only",
                "No PII collected or transmitted",
                "API keys stored securely in environment variables"
              ]
            }
          ].map((principle, i) => (
            <div key={i} style={{ background: principle.bg, border: `1px solid ${principle.border}`, borderRadius: "14px", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span style={{ fontSize: "22px" }}>{principle.icon}</span>
                <span style={{ color: principle.color, fontWeight: "700", fontSize: "15px" }}>{principle.title}</span>
              </div>
              {principle.points.map((point, j) => (
                <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ color: principle.color, fontSize: "10px", marginTop: "4px" }}>●</span>
                  <span style={{ color: "#a1a1aa", fontSize: "12px", lineHeight: "1.5" }}>{point}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Microsoft Alignment */}
        <div style={{ background: "rgba(0,120,212,0.08)", border: "1px solid rgba(0,120,212,0.3)", borderRadius: "16px", padding: "24px" }}>
          <div className="panel-label">Microsoft Responsible AI Alignment</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "16px" }}>
            {[
              { check: "✅", text: "Follows Microsoft Responsible AI Standard v2" },
              { check: "✅", text: "Security agent implements AI red-teaming principles" },
              { check: "✅", text: "Validator agent mitigates hallucination risks" },
              { check: "✅", text: "Full audit trail for every agent decision" },
              { check: "✅", text: "No sensitive data retention post-session" },
              { check: "✅", text: "Human oversight via quality scoring and grading" }
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "14px" }}>{item.check}</span>
                <span style={{ color: "#a1a1aa", fontSize: "13px" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
