from typing import Any, Dict
from orchestration.state import SwarmState, TaskStatus, SubTask
from agents.planner_agent import PlannerAgent
from agents.research_agent import ResearchAgent
from agents.executor_agent import ExecutorAgent
from agents.validator_agent import ValidatorAgent
from agents.security_agent import SecurityAgent
from agents.memory_agent import MemoryAgent
from agents.critic_agent import CriticAgent
from core.logger import get_logger
import uuid

logger = get_logger("orchestration.graph")

class AresOrchestrator:
    def __init__(self):
        self.planner = PlannerAgent()
        self.research = ResearchAgent()
        self.executor = ExecutorAgent()
        self.validator = ValidatorAgent()
        self.security = SecurityAgent()
        self.memory = MemoryAgent()
        self.critic = CriticAgent()
        self.agent_map = {
            "research": self.research,
            "executor": self.executor,
            "validator": self.validator,
            "security": self.security,
            "memory": self.memory,
            "critic": self.critic
        }

    async def run(self, goal: str, broadcast=None) -> SwarmState:
        task_id = uuid.uuid4().hex[:12]
        state = SwarmState(task_id=task_id, original_goal=goal)
        state.status = TaskStatus.RUNNING

        async def emit(agent: str, event_type: str, message: str, data=None):
            state.add_event(agent, event_type, message, data)
            if broadcast:
                await broadcast({
                    "agent": agent,
                    "event_type": event_type,
                    "message": message,
                    "data": data,
                    "task_id": task_id
                })

        await emit("System", "start", f"ARES swarm activated for task: {task_id}")

        # Step 1: Security scan
        await emit("Security", "running", "Scanning input for threats")
        sec_result = await self.security.execute({"text": goal})
        if not sec_result.get("is_safe", True):
            state.status = TaskStatus.BLOCKED
            state.security_flags = sec_result.get("threats_detected", [])
            await emit("Security", "blocked", "Task blocked due to security threat", sec_result)
            return state
        await emit("Security", "completed", "Input cleared. No threats detected", sec_result)

        # Step 2: Plan
        await emit("Planner", "running", "Decomposing goal into subtasks")
        plan = await self.planner.execute({"goal": goal})
        for t in plan["subtasks"]:
            state.subtasks.append(SubTask(
                id=t["id"],
                title=t["title"],
                assigned_agent=t["assigned_agent"],
                depends_on=t.get("depends_on", []),
                input_data={"input_hint": t.get("input_hint", ""), "goal": goal}
            ))
        await emit("Planner", "completed", f"Plan ready: {plan.get('execution_summary')}", plan)

        # Step 3: Execute subtasks
        completed_outputs = {}
        for subtask in state.subtasks:
            agent = self.agent_map.get(subtask.assigned_agent)
            if not agent:
                continue
            await emit(subtask.assigned_agent.capitalize(), "running", f"Working on: {subtask.title}")
            subtask.status = TaskStatus.RUNNING
            try:
                input_data = subtask.input_data or {}
                input_data["context"] = completed_outputs
                result = await agent.execute(input_data)
                subtask.output_data = result
                subtask.status = TaskStatus.COMPLETED
                completed_outputs[subtask.id] = result
                await emit(subtask.assigned_agent.capitalize(), "completed", f"Done: {subtask.title}", result)
            except Exception as e:
                subtask.status = TaskStatus.FAILED
                await emit(subtask.assigned_agent.capitalize(), "failed", f"Failed: {subtask.title} — {str(e)}")

        # Step 4: Memory
        await emit("Memory", "running", "Compressing workflow context")
        memory_result = await self.memory.execute({"action": "summarize", "data": completed_outputs})
        await emit("Memory", "completed", "Context stored", memory_result)

        # Step 5: Critic
        await emit("Critic", "running", "Reviewing final output quality")
        critic_result = await self.critic.execute({
            "original_goal": goal,
            "final_output": str(completed_outputs),
            "agent_outputs": completed_outputs
        })
        state.final_output = critic_result.get("refined_output", "")
        await emit("Critic", "completed", f"Quality score: {critic_result.get('overall_score')}/10", critic_result)

        state.status = TaskStatus.COMPLETED
        await emit("System", "completed", "ARES swarm execution complete")
        return state
