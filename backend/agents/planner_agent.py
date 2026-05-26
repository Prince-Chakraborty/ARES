from agents.base_agent import BaseAgent
from typing import Any, Dict
from core.llm import chat
import json
import uuid

class PlannerAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Planner", role="Task decomposition and execution graph creation")

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        goal = input_data.get("goal", "")
        self.logger.info(f"Planning for goal: {goal}")

        prompt = f"""
You are an expert AI task planner. Break down the following goal into 4-6 clear subtasks.
Each subtask must be assigned to one of these agents: research, executor, validator, memory, critic.

Goal: {goal}

Respond ONLY with valid JSON:
{{
  "subtasks": [
    {{
      "id": "task_1",
      "title": "Short task title",
      "assigned_agent": "research",
      "depends_on": [],
      "input_hint": "What this task needs to do"
    }}
  ],
  "execution_summary": "One line summary of the plan"
}}
"""
        raw = await chat([{"role": "user", "content": prompt}], temperature=0.3)
        parsed = json.loads(raw)

        for task in parsed["subtasks"]:
            task["id"] = f"task_{uuid.uuid4().hex[:8]}"

        self.logger.info(f"Plan created with {len(parsed['subtasks'])} subtasks")
        return parsed
