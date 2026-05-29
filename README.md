# ARES - Autonomous Resilient Execution Swarm

Secure Multi-Agent AI Operating System for Autonomous Task Execution
Microsoft Build AI Hackathon 2026 - Agent Swarms + Security in the Agentic Future

## Team
- Prince Chakraborty - Full Stack Engineer and AI Systems Architect
- University of Engineering and Management, Kolkata, India

## Problem
Single-agent AI systems fail at complex enterprise tasks. No validation, no security, no autonomous recovery. Enterprises need coordinated AI intelligence, not isolated assistants. Manual research and strategy work takes hours. ARES does it in seconds with full security.

## Solution
ARES deploys 7 specialized AI agents that collaborate autonomously to plan, research, execute, validate, secure, memorize, and critique complex real-world tasks with minimal human supervision.

## Live Demo
URL: Coming soon - deploying now

## Architecture Overview
User Goal Input
      |
      v
Security Agent - Azure AI Language + LLM + Rule-based scanning
      |
      v
Planner Agent - Task decomposition into execution graph
      |
      v
Agent Swarm - Research, Executor, Validator, Memory, Critic
      |
      v
Memory Agent - Context compression and storage
      |
      v
Critic Agent - Quality review, scoring 0-10, grade A-F
      |
      v
Final Output - Validated, Scored, Professional Grade

## Agent Swarm
- Planner - Decomposes goals into execution graphs
- Research - Gathers information and performs deep reasoning
- Executor - Executes workflows and produces outputs
- Validator - Verifies outputs and detects hallucinations
- Security - Triple-layer threat detection with Azure AI
- Memory - Stores context and maintains workflow memory
- Critic - Reviews final output quality and assigns grade

## Microsoft AI Stack
- Azure AI Language Service - sentiment analysis and threat detection on every input
- Azure Resource Group - ares-rg deployed in centralindia
- GitHub Copilot - used throughout development for code assistance
- Architecture ready for Azure Container Apps and Azure OpenAI production deployment

## Security Architecture - Triple Layer
Layer 1 - Microsoft Azure AI Language Service - real-time sentiment and threat analysis
Layer 2 - LLM-based threat classification - identifies injection patterns semantically
Layer 3 - Rule-based scanning - 12 known attack vector patterns detected instantly

## AI Tools Used
- Groq LLaMA 3.3 70B - primary agent reasoning engine
- Azure AI Language Service - Microsoft native security scanning
- GitHub Copilot - development assistance throughout the project

## Tech Stack
- Frontend: Next.js 16, TypeScript, TailwindCSS, WebSocket
- Backend: FastAPI, Python 3.11, Uvicorn, Pydantic
- AI: Groq LLaMA 3.3 70B, Azure AI Language Service
- Infrastructure: Docker, Redis, docker-compose
- CI/CD: GitHub Actions
- Security: Triple-layer threat detection pipeline

## Open Source Libraries Used
- FastAPI - MIT License
- Next.js - MIT License
- LangGraph - Apache 2.0
- Groq Python SDK - Apache 2.0
- Azure AI Text Analytics SDK - MIT License
- Pydantic - MIT License
- TailwindCSS - MIT License

## Setup Instructions

Requirements: Python 3.11, Node.js 20, Docker

Backend:
cd backend
pip install -r requirements.txt
cp .env.example .env
Add GROQ_API_KEY to .env
Add AZURE_LANGUAGE_KEY to .env
Add AZURE_LANGUAGE_ENDPOINT to .env
python main.py

Frontend:
cd frontend
npm install
npm run dev

Docker:
docker-compose up --build

Open http://localhost:3000

## Key Features
- 7 specialized AI agents working in coordination
- Real-time WebSocket event streaming
- Live security threat detection with Azure AI
- Hallucination detection via Validator agent
- Quality scoring and grading via Critic agent
- Responsible AI principles implemented
- Full audit trail for every agent decision
- Docker containerized and CI/CD ready

## Responsible AI
- Microsoft Responsible AI principles fully implemented
- Full audit trail for every agent decision visible in UI
- Hallucination detection via dedicated Validator agent
- Privacy: no user data stored post-session
- Security: triple-layer threat detection on every input
- Transparency: all agent decisions visible in real-time feed
- Fairness: no demographic assumptions in task execution

## License
MIT
