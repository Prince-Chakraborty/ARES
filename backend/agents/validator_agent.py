from agents.base_agent import BaseAgent
from typing import Any, Dict
from core.llm import chat
import json

class ValidatorAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Validator", role="Output verification and hallucination detection")

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
        raw = await chat([{"role": "user", "content": prompt}], temperature=0)
        result = json.loads(raw)
        self.logger.info(f"Validation complete. Valid: {result.get('is_valid')}")
        return result
