from agents.base_agent import BaseAgent
from typing import Any, Dict
from core.config import settings
from groq import AsyncGroq
import json

class ValidatorAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Validator", role="Output verification and hallucination detection")
        self.client = AsyncGroq(api_key=settings.GROQ_API_KEY)

    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        output_to_validate = input_data.get("output", "")
        original_task = input_data.get("original_task", "")
        self.logger.info(f"Validating output for task: {original_task}")

        prompt = f"""
You are an expert AI validator. Verify the following output
for accuracy, completeness, hallucinations, and logical consistency.

Original Task: {original_task}
Output to Validate: {str(output_to_validate)[:1000]}

Respond ONLY with valid JSON:
{{
  "is_valid": true,
  "confidence_score": 0.9,
  "hallucination_detected": false,
  "issues_found": [],
  "corrections": [],
  "validation_summary": "One line summary of validation result"
}}
"""
        response = await self.client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )

        raw = response.choices[0].message.content.strip()
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        result = json.loads(raw.strip())
        self.logger.info(f"Validation complete. Valid: {result.get('is_valid')}")
        return result
