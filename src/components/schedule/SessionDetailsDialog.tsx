
import React from "react";
import { format, parse } from "date-fns";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Session {
  id: number;
  studentName: string;
  date: string;
  day: string;
  start: string;
  end: string;
  subject: string;
}

interface SessionDetailsDialogProps {
  session: Session | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SessionDetailsDialog: React.FC<SessionDetailsDialogProps> = ({
  session,
  open,
  onOpenChange,
}) => {
  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
          <DialogDescription>
            Information about your scheduled tutoring session.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Student</p>
              <p>{session.studentName}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Subject</p>
              <p>{session.subject}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Date</p>
              <p>{format(parse(session.date, 'yyyy-MM-dd', new Date()), 'MMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Time</p>
              <p>{session.start} - {session.end}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button asChild>
              <Link to="/sessions">View in Sessions</Link>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionDetailsDialog;
