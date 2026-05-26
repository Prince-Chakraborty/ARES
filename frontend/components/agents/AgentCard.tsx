import React from "react";

interface AgentCardProps {
  name: string;
  role: string;
  status: "idle" | "running" | "completed" | "failed";
  color: string;
}

const statusIcons: Record<string, string> = {
  idle: "○",
  running: "◉",
  completed: "●",
  failed: "✕"
};

export default function AgentCard({ name, role, status, color }: AgentCardProps) {
  return (
    <div className={`agent-card ${color} ${status}`}>
      <div className="agent-header">
        <span className="agent-name">{name}</span>
        <span className={`agent-status-pill ${status}`}>
          <span className={`agent-dot ${status}`}></span>
          {status}
        </span>
      </div>
      <p className="agent-role">{role}</p>
    </div>
  );
}
