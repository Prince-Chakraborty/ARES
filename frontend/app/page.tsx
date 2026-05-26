"use client";
import { useState, useEffect } from "react";
import { useSwarm } from "@/hooks/useSwarm";
import AgentCard from "@/components/agents/AgentCard";
import EventFeed from "@/components/swarm/EventFeed";
import TaskPipeline from "@/components/swarm/TaskPipeline";
import FinalOutput from "@/components/swarm/FinalOutput";
import StatsBar from "@/components/swarm/StatsBar";

const AGENTS = [
  { name: "Planner", role: "Task decomposition and execution graph", color: "purple" },
  { name: "Research", role: "Information gathering and reasoning", color: "blue" },
  { name: "Executor", role: "Workflow execution and API calls", color: "green" },
  { name: "Validator", role: "Output verification and hallucination detection", color: "amber" },
  { name: "Security", role: "Prompt injection and trust validation", color: "red" },
  { name: "Memory", role: "Context storage and workflow memory", color: "teal" },
  { name: "Critic", role: "Final output quality review", color: "coral" }
];

export default function Home() {
  const [goal, setGoal] = useState("");
  const [score, setScore] = useState<number | undefined>(undefined);
  const [grade, setGrade] = useState<string | undefined>(undefined);
  const { state, runSwarm, reset } = useSwarm();

  useEffect(() => {
    const criticEvent = state.events.findLast(
      e => e.agent === "Critic" && e.event_type === "completed" && e.data?.overall_score
    );
    if (criticEvent) {
      setScore(criticEvent.data?.overall_score);
      setGrade(criticEvent.data?.quality_grade);
    }
  }, [state.events]);

  const getAgentStatus = (name: string) => {
    const events = state.events.filter(e => e.agent === name);
    if (events.length === 0) return "idle";
    const last = events[events.length - 1];
    if (last.event_type === "completed") return "completed";
    if (last.event_type === "failed") return "failed";
    if (last.event_type === "running") return "running";
    return "idle";
  };

  const completedCount = state.subtasks.filter(t => t.status === "completed").length;

  const handleRun = () => {
    if (!goal.trim() || state.is_running) return;
    setScore(undefined);
    setGrade(undefined);
    runSwarm(goal);
  };

  const handleReset = () => {
    reset();
    setGoal("");
    setScore(undefined);
    setGrade(undefined);
  };

  const overallStatus = state.is_running
    ? "running"
    : state.status === "completed"
    ? "completed"
    : "idle";

  return (
    <main>
      <header className="ares-header">
        <div className="ares-logo">
          <div className="ares-logo-icon">A</div>
          <div>
            <h1>ARES</h1>
            <p>Autonomous Resilient Execution Swarm</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className={`status-badge ${overallStatus}`}>
            <span className={`status-dot ${overallStatus}`}></span>
            {state.is_running
              ? "Swarm Active"
              : state.status === "completed"
              ? "Completed"
              : "Standby"}
          </div>
          {state.task_id && (
            <span className="task-id">#{state.task_id}</span>
          )}
        </div>
      </header>

      <div className="main-content">
        <div className="goal-panel">
          <div className="panel-label">Mission Goal</div>
          <textarea
            className="goal-textarea"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="e.g. Analyze the AI startup market, compare top competitors, generate a GTM strategy, identify risks, and summarize actionable insights..."
            rows={3}
            disabled={state.is_running}
          />
          <div className="btn-row">
            <button
              className="btn-primary"
              onClick={handleRun}
              disabled={!goal.trim() || state.is_running}
            >
              {state.is_running ? "⚙ Swarm Running..." : "⚡ Activate Swarm"}
            </button>
            {state.status !== "idle" && (
              <button
                className="btn-secondary"
                onClick={handleReset}
                disabled={state.is_running}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <StatsBar
          isRunning={state.is_running}
          status={state.status}
          eventCount={state.events.length}
          subtaskCount={state.subtasks.length}
          completedCount={completedCount}
          score={score}
          grade={grade}
        />

        <div className="agents-grid">
          {AGENTS.map(agent => (
            <AgentCard
              key={agent.name}
              name={agent.name}
              role={agent.role}
              color={agent.color}
              status={getAgentStatus(agent.name) as any}
            />
          ))}
        </div>

        <div className="bottom-grid">
          <EventFeed events={state.events} />
          <TaskPipeline subtasks={state.subtasks} />
        </div>

        <FinalOutput
          output={state.final_output}
          score={score}
          grade={grade}
          security_flags={state.security_flags}
        />
      </div>
    </main>
  );
}
