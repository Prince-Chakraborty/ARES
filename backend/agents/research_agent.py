from agents.base_agent import BaseAgent
from typing import Any, Dict
from core.llm import chat
import json

class ResearchAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Research", role="Information gathering and web reasoning")

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        topic = input_data.get("input_hint", input_data.get("goal", ""))
        self.logger.info(f"Researching: {topic}")

        prompt = f"""
You are an expert AI research agent. Perform deep research on the following topic.

Topic: {topic}

Respond ONLY with valid JSON:
{{
  "summary": "2-3 sentence overview",
  "key_findings": ["finding 1", "finding 2", "finding 3"],
  "data_points": ["specific stat or fact 1", "specific stat or fact 2"],
  "sources_consulted": ["domain/type of source used"],
  "confidence_score": 0.85
}}
"""
        raw = await chat([{"role": "user", "content": prompt}], temperature=0.4)
        result = json.loads(raw)
        self.logger.info(f"Research complete. Confidence: {result.get('confidence_score')}")
        return result
