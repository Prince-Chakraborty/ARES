from agents.base_agent import BaseAgent
from typing import Any, Dict
from core.llm import chat
import json

class ExecutorAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Executor", role="Workflow execution and API orchestration")

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
        raw = await chat([{"role": "user", "content": prompt}], temperature=0.5)
        result = json.loads(raw)
        self.logger.info(f"Execution complete. Status: {result.get('execution_status')}")
        return result
