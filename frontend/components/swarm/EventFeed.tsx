import React, { useEffect, useRef } from "react";
import { AgentEvent } from "@/hooks/useSwarm";

interface EventFeedProps {
  events: AgentEvent[];
}

const eventIcons: Record<string, string> = {
  start: "⚡",
  running: "⚙",
  completed: "✓",
  failed: "✕",
  blocked: "⊘",
  final: "◎"
};

export default function EventFeed({ events }: EventFeedProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  return (
    <div className="panel">
      <div className="panel-label">Live Agent Feed</div>
      <div className="event-feed">
        {events.length === 0 && (
          <div className="feed-empty">Awaiting swarm activation...</div>
        )}
        {events.map((event, index) => (
          <div key={index} className="feed-row">
            <span className="feed-index">
              {String(index + 1).padStart(3, "0")}
            </span>
            <span className="feed-icon">
              {eventIcons[event.event_type] || "•"}
            </span>
            <span className={`feed-agent ${event.agent}`}>
              [{event.agent}]
            </span>
            <span className="feed-message">{event.message}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
