"use client";

export default function Architecture() {
  return (
    <main>
      <header className="ares-header">
        <div className="ares-logo">
          <div className="ares-logo-icon">A</div>
          <div>
            <h1>ARES</h1>
            <p>System Architecture</p>
          </div>
        </div>
      </header>

      <div className="main-content">

        {/* Microsoft Stack Banner */}
        <div style={{
          background: "rgba(0,120,212,0.08)",
          border: "1px solid rgba(0,120,212,0.3)",
          borderRadius: "14px", padding: "16px 24px",
          display: "flex", alignItems: "center", gap: "12px"
        }}>
          <span style={{ fontSize: "24px" }}>☁️</span>
          <div>
            <div style={{ color: "#60a5fa", fontWeight: "700", fontSize: "15px" }}>
              Microsoft Azure AI Stack
            </div>
            <div style={{ color: "#71717a", fontSize: "12px", marginTop: "2px" }}>
              Azure AI Language Service • Azure AI Foundry Ready • GitHub Copilot • Azure Container Apps
            </div>
          </div>
        </div>

        {/* System Flow */}
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "16px", padding: "24px" }}>
          <div className="panel-label">System Architecture — Data Flow</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", marginTop: "16px" }}>

            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block", background: "#27272a", border: "1px solid #3f3f46", borderRadius: "12px", padding: "12px 32px", color: "#fff", fontWeight: "600" }}>
                👤 User Goal Input — Natural Language
              </div>
            </div>

            <div style={{ textAlign: "center", color: "#52525b", fontSize: "20px" }}>↓</div>

            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "12px 32px", color: "#f87171", fontWeight: "600" }}>
                🔒 Security Agent — Azure AI Language + LLM + Rule-based scanning
              </div>
            </div>

            <div style={{ textAlign: "center", color: "#52525b", fontSize: "20px" }}>↓</div>

            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "12px", padding: "12px 32px", color: "#a78bfa", fontWeight: "600" }}>
                🧠 Planner Agent — Task Decomposition + Execution Graph
              </div>
            </div>

            <div style={{ textAlign: "center", color: "#52525b", fontSize: "20px" }}>↓</div>

            <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: "12px", padding: "20px" }}>
              <div style={{ textAlign: "center", color: "#71717a", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
                Agent Swarm — Autonomous Parallel Execution
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { name: "🔍 Research Agent", desc: "Deep information gathering", color: "#60a5fa", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)" },
                  { name: "⚙️ Executor Agent", desc: "Workflow execution", color: "#4ade80", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)" },
                  { name: "✅ Validator Agent", desc: "Hallucination detection", color: "#fbbf24", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
                  { name: "💾 Memory Agent", desc: "Context storage", color: "#2dd4bf", bg: "rgba(20,184,166,0.1)", border: "rgba(20,184,166,0.3)" },
                  { name: "🎯 Critic Agent", desc: "Quality review A-F", color: "#fb923c", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)" },
                  { name: "🔒 Security Agent", desc: "Continuous monitoring", color: "#f87171", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)" },
                ].map((agent, i) => (
                  <div key={i} style={{ background: agent.bg, border: `1px solid ${agent.border}`, borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                    <div style={{ color: agent.color, fontWeight: "600", fontSize: "13px", marginBottom: "4px" }}>{agent.name}</div>
                    <div style={{ color: "#71717a", fontSize: "11px" }}>{agent.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", color: "#52525b", fontSize: "20px" }}>↓</div>

            <div style={{ background: "rgba(0,120,212,0.08)", border: "1px solid rgba(0,120,212,0.3)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ textAlign: "center", color: "#60a5fa", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
                Microsoft Azure Stack
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                {[
                  { name: "Azure AI Language", desc: "Security scanning", status: "✅ Live" },
                  { name: "Azure AI Foundry", desc: "Model management", status: "🔜 Production" },
                  { name: "GitHub Copilot", desc: "Dev assistance", status: "✅ Used" },
                  { name: "Azure Container Apps", desc: "Deployment", status: "🔜 Production" },
                ].map((service, i) => (
                  <div key={i} style={{ background: "rgba(0,120,212,0.1)", border: "1px solid rgba(0,120,212,0.2)", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ color: "#93c5fd", fontWeight: "600", fontSize: "12px", marginBottom: "2px" }}>{service.name}</div>
                    <div style={{ color: "#71717a", fontSize: "11px", marginBottom: "4px" }}>{service.desc}</div>
                    <div style={{ color: "#4ade80", fontSize: "10px" }}>{service.status}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", color: "#52525b", fontSize: "20px" }}>↓</div>

            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "12px", padding: "12px 32px", color: "#4ade80", fontWeight: "600" }}>
                🎯 Final Output — Validated • Quality Scored • Grade A
              </div>
            </div>

          </div>
        </div>

        {/* Security Architecture */}
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "16px", padding: "24px" }}>
          <div className="panel-label">Security Architecture — Triple Layer</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "16px" }}>
            {[
              { layer: "Layer 1", name: "Microsoft Azure AI", desc: "Azure AI Language Service performs real-time sentiment analysis and threat scoring on every input", color: "#60a5fa", icon: "☁️" },
              { layer: "Layer 2", name: "LLM Threat Analysis", desc: "Groq LLaMA 3.3 70B classifies inputs for prompt injection, jailbreak attempts, and adversarial patterns", color: "#a78bfa", icon: "🧠" },
              { layer: "Layer 3", name: "Rule-Based Scanner", desc: "12 known attack vector patterns detected instantly with zero latency before any AI processing", color: "#f87171", icon: "🔒" },
            ].map((layer, i) => (
              <div key={i} style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: "12px", padding: "20px" }}>
                <div style={{ color: "#52525b", fontSize: "11px", marginBottom: "8px" }}>{layer.layer}</div>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{layer.icon}</div>
                <div style={{ color: layer.color, fontWeight: "700", fontSize: "14px", marginBottom: "8px" }}>{layer.name}</div>
                <div style={{ color: "#71717a", fontSize: "12px", lineHeight: "1.5" }}>{layer.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "16px", padding: "24px" }}>
          <div className="panel-label">Tech Stack</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginTop: "16px" }}>
            {[
              { layer: "Frontend", items: ["Next.js 16", "TypeScript", "TailwindCSS", "WebSocket"], color: "#a78bfa" },
              { layer: "Backend", items: ["FastAPI", "Python 3.11", "Uvicorn", "Pydantic"], color: "#60a5fa" },
              { layer: "AI Layer", items: ["Azure AI Language", "Groq LLaMA 3.3 70B", "GitHub Copilot", "LangGraph"], color: "#4ade80" },
              { layer: "Infrastructure", items: ["Docker", "Redis", "GitHub Actions", "Render + Vercel"], color: "#fbbf24" },
            ].map((stack, i) => (
              <div key={i} style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: "10px", padding: "16px" }}>
                <div style={{ color: stack.color, fontWeight: "700", fontSize: "13px", marginBottom: "10px" }}>{stack.layer}</div>
                {stack.items.map((item, j) => (
                  <div key={j} style={{ color: "#a1a1aa", fontSize: "12px", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: stack.color, fontSize: "8px" }}>●</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Market Opportunity */}
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "16px", padding: "24px" }}>
          <div className="panel-label">Market Opportunity</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginTop: "16px" }}>
            {[
              { value: "$47B", label: "AI Agent Market 2027", color: "#a78bfa" },
              { value: "73%", label: "Enterprises adopting AI agents", color: "#60a5fa" },
              { value: "$4.5T", label: "Productivity gains by 2030", color: "#4ade80" },
              { value: "300%", label: "YoY growth in AI security", color: "#f87171" },
            ].map((stat, i) => (
              <div key={i} style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "800", color: stat.color, marginBottom: "8px" }}>{stat.value}</div>
                <div style={{ fontSize: "12px", color: "#71717a" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
