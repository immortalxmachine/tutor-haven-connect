
import React from "react";
import { format, addDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeekNavigationProps {
  weekStart: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({
  weekStart,
  onPreviousWeek,
  onNextWeek,
}) => {
  // Format date range for the week
  const formatWeekRange = () => {
    const endOfWeek = addDays(weekStart, 6);
    return `${format(weekStart, "MMM d")} - ${format(endOfWeek, "MMM d, yyyy")}`;
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Button variant="outline" size="sm" onClick={onPreviousWeek}>
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous Week
      </Button>
      <h2 className="text-lg font-medium">{formatWeekRange()}</h2>
      <Button variant="outline" size="sm" onClick={onNextWeek}>
        Next Week
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default WeekNavigation;
