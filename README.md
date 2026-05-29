# ARES - Autonomous Resilient Execution Swarm

Secure Multi-Agent AI Operating System for Autonomous Task Execution
Built for Microsoft Build AI Hackathon 2026

## Team
- Prince Chakraborty - Full Stack Engineer and AI Systems Architect
- University of Engineering and Management, Kolkata

## Problem
Single-agent AI systems fail at complex tasks. No validation, no security, no recovery.

## Solution
ARES deploys 7 specialized AI agents that collaborate autonomously to plan, research, execute, validate, secure, memorize, and critique complex real-world tasks in seconds.

## Microsoft Azure Integration
- Azure AI Language Service - sentiment analysis and threat detection
- Azure Resource Group - ares-rg centralindia
- Architecture ready for Azure Container Apps deployment

## Agent Swarm
- Planner - Decomposes goals into execution graphs
- Research - Gathers information and performs reasoning
- Executor - Executes workflows and produces outputs
- Validator - Verifies outputs and detects hallucinations
- Security - Triple-layer threat detection with Azure AI
- Memory - Stores context and maintains workflow memory
- Critic - Reviews final output quality and refines results

## Security Architecture
Three layers of protection on every input:
1. Microsoft Azure AI Language Service
2. LLM-based threat classification
3. Rule-based scanning with 12 attack vector patterns

## Tech Stack
- Frontend: Next.js 16, TypeScript, TailwindCSS, WebSocket
- Backend: FastAPI, Python 3.11
- AI: Groq LLaMA 3.3 70B, Azure AI Language Service
- Infrastructure: Docker, Redis, docker-compose
- CI/CD: GitHub Actions

## Quick Start
cd backend && pip install -r requirements.txt && python main.py
cd frontend && npm install && npm run dev

## License
MIT
