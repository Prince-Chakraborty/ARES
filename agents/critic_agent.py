from agents.base_agent import BaseAgent
from typing import Any, Dict
from core.config import settings
from groq import AsyncGroq
import json

class CriticAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Critic", role="Final output quality review and refinement")
        self.client = AsyncGroq(api_key=settings.GROQ_API_KEY)

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        final_output = input_data.get("final_output", "")
        original_goal = input_data.get("original_goal", "")
        agent_outputs = input_data.get("agent_outputs", {})
        self.logger.info("Critic reviewing final output")

        prompt = f"""
You are an elite AI critic agent. Review the final output
of a multi-agent swarm and provide a professional quality assessment.

Original Goal: {original_goal}
Final Output: {str(final_output)[:1000]}

Respond ONLY with valid JSON:
{{
  "overall_score": 8,
  "quality_grade": "A",
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1"],
  "missing_elements": [],
  "refined_output": "Improved and polished version of the final output in detail",
  "critic_summary": "One paragraph professional assessment"
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
        result = json.loads(raw.strip())
        self.logger.info(f"Critic review complete. Score: {result.get('overall_score')}/10")
        return result
