from agents.base_agent import BaseAgent
from typing import Any, Dict
from core.config import settings
from groq import AsyncGroq
import json

class ExecutorAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Executor", role="Workflow execution and API orchestration")
        self.client = AsyncGroq(api_key=settings.GROQ_API_KEY)

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        task = input_data.get("input_hint", input_data.get("goal", ""))
        context = input_data.get("context", {})
        self.logger.info(f"Executing task: {task}")

        prompt = f"""
You are an expert AI executor agent. Execute the following task
using the provided context from previous agents.

Task: {task}
Context: {json.dumps(context)[:1000]}

Respond ONLY with valid JSON:
{{
  "executed_action": "What was done",
  "output": "The actual result or content produced",
  "artifacts": ["artifact 1", "artifact 2"],
  "next_steps": ["recommended next step 1", "recommended next step 2"],
  "execution_status": "success"
}}
"""
        response = await self.client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5
        )

        raw = response.choices[0].message.content.strip()
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        result = json.loads(raw.strip())
        self.logger.info(f"Execution complete. Status: {result.get('execution_status')}")
        return result
