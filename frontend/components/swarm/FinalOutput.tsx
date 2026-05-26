import React, { useState } from "react";

interface FinalOutputProps {
  output: any;
  score?: number;
  grade?: string;
  security_flags: string[];
}

function renderValue(value: any, depth = 0): React.ReactNode {
  if (typeof value === "string") return <span style={{ color: "#d4d4d8" }}>{value}</span>;
  if (typeof value === "number") return <span style={{ color: "#60a5fa" }}>{value}</span>;
  if (typeof value === "boolean") return <span style={{ color: "#f59e0b" }}>{value.toString()}</span>;
  if (Array.isArray(value)) {
    return (
      <ul style={{ paddingLeft: "16px", margin: "4px 0" }}>
        {value.map((item, i) => (
          <li key={i} style={{ margin: "4px 0", color: "#d4d4d8", listStyle: "none", display: "flex", gap: "8px" }}>
            <span style={{ color: "#4ade80" }}>▸</span>
            {renderValue(item, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }
  if (typeof value === "object" && value !== null) {
    return (
      <div style={{ paddingLeft: depth > 0 ? "16px" : "0" }}>
        {Object.entries(value).map(([k, v]) => (
          <div key={k} style={{ margin: "8px 0" }}>
            <span style={{ color: "#a78bfa", fontWeight: 600, textTransform: "capitalize" }}>
              {k.replace(/_/g, " ")}
            </span>
            <span style={{ color: "#52525b", margin: "0 6px" }}>→</span>
            {renderValue(v, depth + 1)}
          </div>
        ))}
      </div>
    );
  }
  return <span style={{ color: "#d4d4d8" }}>{String(value)}</span>;
}

export default function FinalOutput({ output, score, grade, security_flags }: FinalOutputProps) {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"pretty" | "raw">("pretty");

  const outputText = typeof output === "string"
    ? (() => { try { return JSON.parse(output); } catch { return output; } })()
    : output;

  const rawText = typeof output === "string"
    ? output
    : JSON.stringify(output, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!output && security_flags.length === 0) return null;

  if (security_flags.length > 0) {
    return (
      <div className="output-panel blocked">
        <div className="output-header">
          <div className="output-title">
            <span>🚫</span>
            <span>Task Blocked by Security Agent</span>
          </div>
        </div>
        <p style={{ color: "#fca5a5", fontSize: "13px", marginBottom: "12px" }}>
          Threats detected in your input:
        </p>
        <div className="security-flags">
          {security_flags.map((flag, i) => (
            <div key={i} className="security-flag">
              <span>⚠</span><span>{flag}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="output-panel">
      <div className="output-header">
        <div className="output-title">
          <span>🎯</span>
          <span>ARES Final Output</span>
          {grade && <span className="grade-badge">Grade: {grade}</span>}
          {score !== undefined && <span className="score-badge">Score: {score}/10</span>}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="btn-copy"
            onClick={() => setView(view === "pretty" ? "raw" : "pretty")}
          >
            {view === "pretty" ? "Raw" : "Pretty"}
          </button>
          <button className="btn-copy" onClick={handleCopy}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="output-body">
        {view === "pretty" && typeof outputText === "object"
          ? renderValue(outputText)
          : <pre style={{ whiteSpace: "pre-wrap", color: "#d4d4d8" }}>{rawText}</pre>
        }
      </div>
    </div>
  );
}
