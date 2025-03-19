
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/AnimatedCard";
import { Calendar, Clock, UserCircle2 } from "lucide-react";

interface SessionCardProps {
  session: any;
  onViewDetails: (session: any) => void;
  onAcceptSession: (sessionId: number) => void;
}

export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "upcoming":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>;
    case "pending":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending</Badge>;
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    default:
      return null;
  }
};

const SessionCard: React.FC<SessionCardProps> = ({ 
  session, 
  onViewDetails, 
  onAcceptSession 
}) => {
  return (
    <AnimatedCard 
      key={session.id} 
      delayIndex={0}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-4 mb-4 sm:mb-0">
        <div className="p-2 bg-secondary rounded-full hidden sm:flex">
          <UserCircle2 className="h-10 w-10 text-muted-foreground" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium">{session.studentName}</h3>
            <StatusBadge status={session.status} />
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            {session.subject} - {session.topic}
          </p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {session.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {session.time}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {session.status === "pending" && (
          <Button 
            size="sm" 
            onClick={() => onAcceptSession(session.id)}
          >
            Accept
          </Button>
        )}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(session)}
        >
          View Details
        </Button>
      </div>
    </AnimatedCard>
  );
};

export default SessionCard;
