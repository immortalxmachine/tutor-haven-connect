
import React from "react";
import SessionCard from "./SessionCard";

interface SessionListProps {
  sessions: any[];
  onViewSession: (session: any) => void;
  onAcceptSession: (sessionId: number) => void;
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
      {sessions.map((session, index) => (
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
