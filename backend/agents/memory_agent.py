from agents.base_agent import BaseAgent
from typing import Any, Dict, List
from core.llm import chat
import json

class MemoryAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Memory", role="Context storage and long-term workflow memory")
        self.short_term: List[Dict] = []
        self.long_term: Dict[str, Any] = {}

    def store(self, key: str, value: Any):
        self.long_term[key] = value
        self.short_term.append({"key": key, "value": value})
        if len(self.short_term) > 20:
            self.short_term.pop(0)
        self.logger.info(f"Stored memory key: {key}")

    def retrieve(self, key: str) -> Any:
        return self.long_term.get(key, None)

    def get_context_window(self) -> List[Dict]:
        return self.short_term[-10:]

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        action = input_data.get("action", "summarize")
        data = input_data.get("data", {})
        self.logger.info(f"Memory action: {action}")

        if action == "store":
            key = input_data.get("key", "default")
            self.store(key, data)
            return {"stored": True, "key": key}

        if action == "retrieve":
            key = input_data.get("key", "default")
            value = self.retrieve(key)
            return {"retrieved": True, "key": key, "value": value}

        prompt = f"""
You are an AI memory agent. Summarize and compress the following workflow data.

Data: {json.dumps(data)[:1000]}

Respond ONLY with valid JSON:
{{
  "memory_summary": "Compressed summary of all context",
  "key_facts": ["fact 1", "fact 2"],
  "agent_outputs": {{}},
  "recommended_context": "What future agents should know"
}}
"""
        raw = await chat([{"role": "user", "content": prompt}], temperature=0.2)
        result = json.loads(raw)
        self.store("latest_summary", result)
        return result
