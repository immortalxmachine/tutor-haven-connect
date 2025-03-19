
import React from "react";
import { format, addDays, isSameDay } from "date-fns";
import AnimatedCard from "@/components/AnimatedCard";

interface ScheduledSession {
  id: number;
  studentName: string;
  date: string;
  day: string;
  start: string;
  end: string;
  subject: string;
}

interface WeeklyScheduleGridProps {
  weekStart: Date;
  timeSlots: string[];
  daysOfWeek: string[];
  scheduledSessions: ScheduledSession[];
  availabilitySlots: any[];
  onViewSession: (session: ScheduledSession) => void;
}

const WeeklyScheduleGrid: React.FC<WeeklyScheduleGridProps> = ({
  weekStart,
  timeSlots,
  daysOfWeek,
  scheduledSessions,
  availabilitySlots,
  onViewSession,
}) => {
  // Generate the days of the current week
  const currentWeekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(weekStart, i)
  );

  // Check if a session is scheduled at a specific day and time
  const getSessionAtSlot = (dayDate: Date, time: string) => {
    const formattedDate = format(dayDate, "yyyy-MM-dd");
    return scheduledSessions.find(
      session =>
        session.date === formattedDate &&
        time >= session.start &&
        time < session.end
    );
  };

  // Check if the tutor is available at a specific day and time
  const isAvailableAt = (dayDate: Date, time: string) => {
    const dayName = daysOfWeek[dayDate.getDay() === 0 ? 6 : dayDate.getDay() - 1];
    
    return availabilitySlots.some(slot => {
      // Check for one-time availability (stored as YYYY-MM-DD)
      if (slot.day.includes('-')) {
        return slot.day === format(dayDate, "yyyy-MM-dd") && 
               time >= slot.start && 
               time < slot.end;
      }
      // Check for recurring availability (stored as day name)
      return slot.day === dayName && 
             time >= slot.start && 
             time < slot.end;
    });
  };

  return (
    <AnimatedCard className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-8 gap-1">
          {/* Time column */}
          <div className="col-span-1 font-medium text-center bg-secondary/20 py-2 rounded-tl-md">
            Time
          </div>
          
          {/* Day columns */}
          {currentWeekDays.map((day, index) => (
            <div 
              key={index} 
              className="col-span-1 font-medium text-center bg-secondary/20 py-2"
            >
              <div>{daysOfWeek[day.getDay() === 0 ? 6 : day.getDay() - 1]}</div>
              <div className="text-xs opacity-70">{format(day, "MMM d")}</div>
            </div>
          ))}
          
          {/* Time slots */}
          {timeSlots.map((time, timeIndex) => (
            <React.Fragment key={time}>
              {/* Time label */}
              <div className="col-span-1 py-4 px-2 text-sm text-center border-t">
                {time}
              </div>
              
              {/* Slots for each day */}
              {currentWeekDays.map((day, dayIndex) => {
                const session = getSessionAtSlot(day, time);
                const isAvailable = isAvailableAt(day, time);
                
                return (
                  <div 
                    key={`${day}-${time}`} 
                    className={`col-span-1 py-3 px-2 border-t relative ${
                      isAvailable ? "bg-primary/10" : ""
                    } ${session ? "cursor-pointer" : ""}`}
                    onClick={() => session && onViewSession(session)}
                  >
                    {session && time === session.start && (
                      <div className="absolute inset-1 bg-primary/20 rounded-md p-2 text-xs">
                        <div className="font-medium">{session.studentName}</div>
                        <div className="text-muted-foreground">
                          {session.subject} • {session.start}-{session.end}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};

export default WeeklyScheduleGrid;
