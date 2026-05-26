from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import tasks, agents, websocket
from core.config import settings
from core.logger import logger

app = FastAPI(
    title="ARES - Autonomous Resilient Execution Swarm",
    description="Secure Multi-Agent AI Operating System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])

@app.get("/health")
async def health():
    return {"status": "ARES is online", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
