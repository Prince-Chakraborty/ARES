from agents.base_agent import BaseAgent
from typing import Any, Dict
from core.config import settings
from groq import AsyncGroq
import json
import uuid

class PlannerAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Planner", role="Task decomposition and execution graph creation")
        self.client = AsyncGroq(api_key=settings.GROQ_API_KEY)

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        goal = input_data.get("goal", "")
        self.logger.info(f"Planning for goal: {goal}")

        prompt = f"""
You are an expert AI task planner. Break down the following goal into 4-6 clear subtasks.
Each subtask must be assigned to one of these agents: research, executor, validator, memory, critic.

Goal: {goal}

Respond ONLY with valid JSON in this exact format:
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
        response = await self.client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )

        raw = response.choices[0].message.content.strip()
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        parsed = json.loads(raw.strip())

        for task in parsed["subtasks"]:
            task["id"] = f"task_{uuid.uuid4().hex[:8]}"

        self.logger.info(f"Plan created with {len(parsed['subtasks'])} subtasks")
        return parsed
