import React from "react";
import { SubTask } from "@/hooks/useSwarm";

interface TaskPipelineProps {
  subtasks: SubTask[];
}

const statusIcons: Record<string, string> = {
  pending: "○",
  running: "◉",
  completed: "●",
  failed: "✕",
  blocked: "⊘"
};

export default function TaskPipeline({ subtasks }: TaskPipelineProps) {
  return (
    <div className="panel">
      <div className="panel-label">Execution Pipeline</div>
      <div className="pipeline-list">
        {subtasks.length === 0 && (
          <div className="pipeline-empty">
            Pipeline will appear after planning
          </div>
        )}
        {subtasks.map((task, index) => (
          <div key={task.id} className={`pipeline-item ${task.status}`}>
            <div className="pipeline-left">
              <span className="pipeline-icon">
                {statusIcons[task.status] || "○"}
              </span>
              <span className="pipeline-title">{task.title}</span>
            </div>
            <div className="pipeline-right">
              <span className={`agent-tag ${task.assigned_agent}`}>
                {task.assigned_agent}
              </span>
              <span className="pipeline-num">#{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
