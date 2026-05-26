from fastapi import APIRouter
from pydantic import BaseModel
from agents.security_agent import SecurityAgent
from core.logger import get_logger

router = APIRouter()
logger = get_logger("routes.security")

class ScanRequest(BaseModel):
    text: str

@router.post("/scan")
async def scan_input(request: ScanRequest):
    if not request.text.strip():
        return {"is_safe": True, "risk_level": "low", "threats_detected": [], "rule_based_flags": []}

    logger.info(f"Security scan requested for: {request.text[:50]}")
    agent = SecurityAgent()
    result = await agent.execute({"text": request.text})
    return result
