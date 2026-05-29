import { useState, useRef, useCallback } from "react";

export interface AgentEvent {
  agent: string;
  event_type: string;
  message: string;
  data?: any;
  task_id?: string;
}

export interface SubTask {
  id: string;
  title: string;
  assigned_agent: string;
  status: string;
  output_data?: any;
}

export interface SwarmState {
  task_id: string;
  status: string;
  events: AgentEvent[];
  subtasks: SubTask[];
  final_output: string;
  security_flags: string[];
  is_running: boolean;
}

const initialState: SwarmState = {
  task_id: "",
  status: "idle",
  events: [],
  subtasks: [],
  final_output: "",
  security_flags: [],
  is_running: false
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const WS_URL = BACKEND_URL.replace("https://", "wss://").replace("http://", "ws://");

export function useSwarm() {
  const [state, setState] = useState<SwarmState>(initialState);
  const wsRef = useRef<WebSocket | null>(null);

  const runSwarm = useCallback((goal: string) => {
    const taskId = Math.random().toString(36).substring(2, 14);

    setState({
      ...initialState,
      task_id: taskId,
      status: "running",
      is_running: true
    });

    const ws = new WebSocket(`${WS_URL}/ws/swarm/${taskId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ goal }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event_type === "final") {
        setState(prev => ({
          ...prev,
          status: data.status,
          final_output: data.final_output || "",
          subtasks: data.subtasks || [],
          security_flags: data.security_flags || [],
          is_running: false
        }));
        return;
      }

      if (data.event_type === "error") {
        setState(prev => ({
          ...prev,
          status: "failed",
          is_running: false
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        events: [...prev.events, data]
      }));
    };

    ws.onerror = () => {
      setState(prev => ({ ...prev, status: "failed", is_running: false }));
    };

    ws.onclose = () => {
      setState(prev => ({ ...prev, is_running: false }));
    };
  }, []);

  const reset = useCallback(() => {
    wsRef.current?.close();
    setState(initialState);
  }, []);

  return { state, runSwarm, reset };
}
