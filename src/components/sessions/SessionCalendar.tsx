import React, { useState } from "react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks, parseISO } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Session } from "@/types/sessions";
import { StatusBadge } from "./SessionCard";
import AnimatedCard from "@/components/AnimatedCard";

interface SessionCalendarProps {
  sessions: Session[];
  onViewSession: (session: Session) => void;
  onAcceptSession: (sessionId: string) => void;
}

const SessionCalendar: React.FC<SessionCalendarProps> = ({ 
  sessions, 
  onViewSession, 
  onAcceptSession 
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewType, setViewType] = useState<"week" | "month">("week");
  
  const getSessionsForDate = (date: Date) => {
    return sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return isSameDay(sessionDate, date);
    });
  };
  
  const getSessionsForView = () => {
    if (viewType === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      const daysInWeek = eachDayOfInterval({ start, end });
      
      return daysInWeek.map(day => ({
        date: day,
        sessions: getSessionsForDate(day)
      }));
    } else {
      return [];
    }
  };
  
  const handlePreviousView = () => {
    if (viewType === "week") {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };
  
  const handleNextView = () => {
    if (viewType === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };
  
  const toggleViewType = () => {
    setViewType(viewType === "week" ? "month" : "week");
  };
  
  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setCurrentDate(date);
    }
  };
  
  const formatStartTime = (timeRange: string) => {
    return timeRange.split(" - ")[0];
  };
  
  const sessionsForView = getSessionsForView();
  const sessionsForSelectedDate = selectedDate ? getSessionsForDate(selectedDate) : [];
  
  return (
    <AnimatedCard className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePreviousView}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {viewType === "week" 
                      ? `${format(startOfWeek(currentDate, { weekStartsOn: 1 }), "MMM d")} - ${format(endOfWeek(currentDate, { weekStartsOn: 1 }), "MMM d, yyyy")}` 
                      : format(currentDate, "MMMM yyyy")}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelectDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" size="icon" onClick={handleNextView}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" onClick={toggleViewType}>
            {viewType === "week" ? <LayoutGrid className="h-4 w-4 mr-2" /> : <LayoutList className="h-4 w-4 mr-2" />}
            {viewType === "week" ? "Month View" : "Week View"}
          </Button>
        </div>
        
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as "week" | "month")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week" className="space-y-4">
            <div className="grid grid-cols-7 gap-4">
              {sessionsForView.map(({ date, sessions }) => (
                <div key={format(date, "yyyy-MM-dd")} className="flex flex-col">
                  <div 
                    className={`text-center p-2 rounded-md ${
                      isSameDay(date, new Date()) ? "bg-primary/20" : "bg-secondary/20"
                    }`}
                  >
                    <div className="font-medium">{format(date, "EEE")}</div>
                    <div>{format(date, "d")}</div>
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    {sessions.length > 0 ? (
                      sessions.map((session) => (
                        <div 
                          key={session.id}
                          className="p-2 bg-card border rounded-md cursor-pointer hover:bg-accent/20 transition-colors"
                          onClick={() => onViewSession(session)}
                        >
                          <div className="text-xs font-medium truncate">{session.studentName}</div>
                          <div className="text-xs text-muted-foreground">{formatStartTime(session.time)}</div>
                          <div className="mt-1">
                            <StatusBadge status={session.status} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-center text-muted-foreground py-4">No sessions</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="month">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelectDate}
                  className="rounded-md border p-3 pointer-events-auto"
                  modifiers={{
                    hasSessions: sessions.map(session => new Date(session.date)),
                  }}
                  modifiersStyles={{
                    hasSessions: { 
                      textDecoration: "underline", 
                      fontWeight: "bold",
                      color: "var(--primary)" 
                    }
                  }}
                />
              </div>
              
              <Card className="md:w-1/2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">
                    {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
                  </h3>
                  
                  {sessionsForSelectedDate.length > 0 ? (
                    <div className="space-y-4">
                      {sessionsForSelectedDate.map((session) => (
                        <div 
                          key={session.id}
                          className="p-4 border rounded-md cursor-pointer hover:bg-accent/10 transition-colors"
                          onClick={() => onViewSession(session)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{session.studentName}</h4>
                            <StatusBadge status={session.status} />
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            {session.subject} - {session.topic}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {session.time}
                          </div>
                          
                          {session.status === "pending" && (
                            <Button 
                              className="mt-3"
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                onAcceptSession(session.id);
                              }}
                            >
                              Accept
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No sessions scheduled for this date.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedCard>
  );
};

export default SessionCalendar;
