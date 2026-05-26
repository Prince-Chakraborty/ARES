from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from orchestration.graph import AresOrchestrator
from core.logger import get_logger
import json

router = APIRouter()
logger = get_logger("routes.tasks")

class TaskRequest(BaseModel):
    goal: str

@router.post("/run")
async def run_task(request: TaskRequest):
    if not request.goal.strip():
        raise HTTPException(status_code=400, detail="Goal cannot be empty")

    logger.info(f"Received task: {request.goal}")

    try:
        orchestrator = AresOrchestrator()
        state = await orchestrator.run(goal=request.goal)

        return {
            "task_id": state.task_id,
            "status": state.status,
            "final_output": json.dumps(state.final_output) if not isinstance(state.final_output, str) else state.final_output,
            "subtasks": [t.dict() for t in state.subtasks],
            "events": [e.dict() for e in state.events],
            "security_flags": state.security_flags
        }
    except Exception as e:
        logger.error(f"Task execution failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{task_id}")
async def get_task_status(task_id: str):
    return {"task_id": task_id, "message": "Use WebSocket for live status"}
