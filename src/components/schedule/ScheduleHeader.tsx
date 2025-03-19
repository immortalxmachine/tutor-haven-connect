
import React from "react";
import { Plus, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ScheduleHeaderProps {
  onAddSlotClick: () => void;
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ onAddSlotClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 animate-fade-down">
      <div>
        <h1 className="text-3xl font-bold mb-2">Schedule</h1>
        <p className="text-muted-foreground">
          Manage your tutoring availability and view scheduled sessions
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
        <Button variant="outline" onClick={onAddSlotClick}>
          <Plus className="mr-2 h-4 w-4" />
          Quick Add
        </Button>
        <Button asChild>
          <Link to="/create-schedule">
            <Edit className="mr-2 h-4 w-4" />
            Manage Schedule
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ScheduleHeader;
