
import React from "react";
import SessionCard from "./SessionCard";
import { Session } from "@/types/sessions";

interface SessionListProps {
  sessions: Session[];
  onViewSession: (session: Session) => void;
  onAcceptSession: (sessionId: string) => void;
}

const SessionList: React.FC<SessionListProps> = ({ 
  sessions, 
  onViewSession, 
  onAcceptSession 
}) => {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No sessions found matching your criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onViewDetails={onViewSession}
          onAcceptSession={onAcceptSession}
        />
      ))}
    </div>
  );
};

export default SessionList;
