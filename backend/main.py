from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import tasks, agents, websocket, security
from api.routes.health import router as health_router
from core.config import settings
from core.logger import logger

app = FastAPI(
    title="ARES - Autonomous Resilient Execution Swarm",
    description="Secure Multi-Agent AI Operating System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])
app.include_router(security.router, prefix="/api/security", tags=["security"])
app.include_router(health_router, tags=["health"])

@app.get("/health")
async def health():
    return {
        "status": "ARES is online",
        "version": "1.0.0",
        "microsoft_stack": {
            "azure_language": settings.use_azure_language,
            "azure_foundry": settings.use_azure_foundry,
            "azure_openai_ready": True
        }
    }

@app.get("/api/status")
async def status():
    from core.foundry import foundry_client
    return {
        "ares": "online",
        "version": "1.0.0",
        "agents": 7,
        "azure_language": settings.use_azure_language,
        "azure_foundry": foundry_client.get_workspace_info(),
        "github_copilot": "used in development",
        "groq_llama": settings.GROQ_MODEL
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
