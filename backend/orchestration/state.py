from typing import Any, Dict, List, Optional
from pydantic import BaseModel
from enum import Enum

class TaskStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    BLOCKED = "blocked"

class AgentEvent(BaseModel):
    agent_name: str
    event_type: str
    message: str
    data: Optional[Dict[str, Any]] = None
    timestamp: Optional[str] = None

class SubTask(BaseModel):
    id: str
    title: str
    assigned_agent: str
    status: TaskStatus = TaskStatus.PENDING
    input_data: Optional[Dict[str, Any]] = None
    output_data: Optional[Dict[str, Any]] = None
    depends_on: List[str] = []
    retries: int = 0

class SwarmState(BaseModel):
    task_id: str
    original_goal: str
    subtasks: List[SubTask] = []
    events: List[AgentEvent] = []
    final_output: Optional[str] = None
    status: TaskStatus = TaskStatus.PENDING
    security_flags: List[str] = []
    memory: Dict[str, Any] = {}

    def add_event(self, agent: str, event_type: str, message: str, data: Optional[Dict] = None):
        from datetime import datetime
        self.events.append(AgentEvent(
            agent_name=agent,
            event_type=event_type,
            message=message,
            data=data,
            timestamp=datetime.utcnow().isoformat()
        ))

    def get_pending_tasks(self) -> List[SubTask]:
        return [t for t in self.subtasks if t.status == TaskStatus.PENDING]

    def get_completed_tasks(self) -> List[SubTask]:
        return [t for t in self.subtasks if t.status == TaskStatus.COMPLETED]

    def all_completed(self) -> bool:
        return all(t.status == TaskStatus.COMPLETED for t in self.subtasks)
