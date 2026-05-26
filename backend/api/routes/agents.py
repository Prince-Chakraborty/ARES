from fastapi import APIRouter
from core.logger import get_logger

router = APIRouter()
logger = get_logger("routes.agents")

AGENTS = [
    {
        "name": "Planner",
        "role": "Task decomposition and execution graph creation",
        "status": "idle",
        "color": "purple"
    },
    {
        "name": "Research",
        "role": "Information gathering and web reasoning",
        "status": "idle",
        "color": "blue"
    },
    {
        "name": "Executor",
        "role": "Workflow execution and API orchestration",
        "status": "idle",
        "color": "green"
    },
    {
        "name": "Validator",
        "role": "Output verification and hallucination detection",
        "status": "idle",
        "color": "amber"
    },
    {
        "name": "Security",
        "role": "Prompt injection detection and trust validation",
        "status": "idle",
        "color": "red"
    },
    {
        "name": "Memory",
        "role": "Context storage and long-term workflow memory",
        "status": "idle",
        "color": "teal"
    },
    {
        "name": "Critic",
        "role": "Final output quality review and refinement",
        "status": "idle",
        "color": "coral"
    }
]

@router.get("/")
async def list_agents():
    return {"agents": AGENTS, "total": len(AGENTS)}

@router.get("/{agent_name}")
async def get_agent(agent_name: str):
    agent = next((a for a in AGENTS if a["name"].lower() == agent_name.lower()), None)
    if not agent:
        return {"error": f"Agent {agent_name} not found"}
    return agent
