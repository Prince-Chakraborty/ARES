from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from orchestration.graph import AresOrchestrator
from core.logger import get_logger
import json

router = APIRouter()
logger = get_logger("websocket")

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = {}

    async def connect(self, task_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[task_id] = websocket
        logger.info(f"WebSocket connected: {task_id}")

    def disconnect(self, task_id: str):
        self.active_connections.pop(task_id, None)
        logger.info(f"WebSocket disconnected: {task_id}")

    async def send(self, task_id: str, data: dict):
        ws = self.active_connections.get(task_id)
        if ws:
            await ws.send_text(json.dumps(data))

manager = ConnectionManager()

@router.websocket("/swarm/{task_id}")
async def swarm_websocket(websocket: WebSocket, task_id: str):
    await manager.connect(task_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            goal = payload.get("goal", "")

            if not goal:
                await manager.send(task_id, {"error": "No goal provided"})
                continue

            orchestrator = AresOrchestrator()

            async def broadcast(event: dict):
                await manager.send(task_id, event)

            logger.info(f"Starting swarm for task: {task_id}")
            state = await orchestrator.run(goal=goal, broadcast=broadcast)

            await manager.send(task_id, {
                "event_type": "final",
                "task_id": task_id,
                "status": state.status,
                "final_output": state.final_output,
                "subtasks": [t.dict() for t in state.subtasks],
                "security_flags": state.security_flags
            })

    except WebSocketDisconnect:
        manager.disconnect(task_id)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await manager.send(task_id, {"event_type": "error", "message": str(e)})
        manager.disconnect(task_id)
