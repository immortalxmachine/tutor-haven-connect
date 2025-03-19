
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { StatusBadge } from "./SessionCard";

interface SessionDetailsProps {
  session: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAcceptSession: (sessionId: number) => void;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({
  session,
  open,
  onOpenChange,
  onAcceptSession,
}) => {
  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
          <DialogDescription>
            View complete information about this tutoring session.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Session Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">{session.subject}</h3>
              <p className="text-muted-foreground">{session.topic}</p>
            </div>
            <StatusBadge status={session.status} />
          </div>
          
          <Separator />
          
          {/* Session Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Student</h4>
              <p>{session.studentName}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Communication</h4>
              <p className="capitalize">{session.communicationMode}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Date</h4>
              <p>{session.date}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Time</h4>
              <p>{session.time}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Session Notes</h4>
            <p className="text-sm text-muted-foreground">{session.notes}</p>
          </div>
          
          {/* Feedback Section */}
          {session.feedback && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">Student Feedback</h4>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="text-yellow-500">
                      {i < session.feedback.rating ? "★" : "☆"}
                    </div>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {session.feedback.rating}/5
                  </span>
                </div>
                <p className="text-sm italic">
                  "{session.feedback.comment}"
                </p>
              </div>
            </>
          )}
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-end">
          {session.status === "pending" && (
            <Button 
              onClick={() => {
                onAcceptSession(session.id);
                onOpenChange(false);
              }}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Accept Session
            </Button>
          )}
          {session.status === "upcoming" && (
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Session
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionDetails;
