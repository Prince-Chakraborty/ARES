import React, { useEffect, useState } from "react";

interface StatsBarProps {
  isRunning: boolean;
  status: string;
  eventCount: number;
  subtaskCount: number;
  completedCount: number;
  score?: number;
  grade?: string;
}

export default function StatsBar({
  isRunning,
  status,
  eventCount,
  subtaskCount,
  completedCount,
  score,
  grade
}: StatsBarProps) {
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (isRunning && !startTime) {
      setStartTime(Date.now());
      setElapsed(0);
    }
    if (!isRunning && status === "idle") {
      setStartTime(null);
      setElapsed(0);
    }
  }, [isRunning, status]);

  useEffect(() => {
    if (!isRunning || !startTime) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const stats = [
    {
      label: "Status",
      value: isRunning ? "Running" : status === "completed" ? "Complete" : "Standby",
      color: isRunning ? "#60a5fa" : status === "completed" ? "#4ade80" : "#71717a"
    },
    {
      label: "Time Elapsed",
      value: `${elapsed}s`,
      color: "#a78bfa"
    },
    {
      label: "Events",
      value: eventCount,
      color: "#60a5fa"
    },
    {
      label: "Tasks",
      value: subtaskCount > 0 ? `${completedCount}/${subtaskCount}` : "—",
      color: "#fbbf24"
    },
    {
      label: "Quality Score",
      value: score !== undefined ? `${score}/10` : "—",
      color: "#4ade80"
    },
    {
      label: "Grade",
      value: grade || "—",
      color: "#f97316"
    }
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: "12px",
      background: "#18181b",
      border: "1px solid #27272a",
      borderRadius: "16px",
      padding: "16px 24px"
    }}>
      {stats.map((stat, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "20px",
            fontWeight: "700",
            color: stat.color,
            fontFamily: "monospace",
            marginBottom: "4px"
          }}>
            {stat.value}
          </div>
          <div style={{
            fontSize: "11px",
            color: "#52525b",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
