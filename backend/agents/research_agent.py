from agents.base_agent import BaseAgent
from typing import Any, Dict
from core.config import settings
from groq import AsyncGroq
import json

class ResearchAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Research", role="Information gathering and web reasoning")
        self.client = AsyncGroq(api_key=settings.GROQ_API_KEY)

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        topic = input_data.get("input_hint", input_data.get("goal", ""))
        self.logger.info(f"Researching: {topic}")

        prompt = f"""
You are an expert AI research agent. Perform deep research on the following topic.
Provide structured, factual, and comprehensive findings.

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
        response = await self.client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4
        )

        raw = response.choices[0].message.content.strip()
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        result = json.loads(raw.strip())
        self.logger.info(f"Research complete. Confidence: {result.get('confidence_score')}")
        return result
