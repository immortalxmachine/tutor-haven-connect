
import React, { useState } from "react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay, parse } from "date-fns";
import { 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  X
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import AnimatedCard from "@/components/AnimatedCard";

// Mock data
const initialAvailabilitySlots = [
  { day: "Monday", start: "09:00", end: "11:00" },
  { day: "Monday", start: "13:00", end: "15:00" },
  { day: "Wednesday", start: "10:00", end: "12:00" },
  { day: "Thursday", start: "14:00", end: "16:00" },
  { day: "Friday", start: "15:00", end: "17:00" },
];

const scheduledSessions = [
  { 
    id: 1, 
    studentName: "Emma Davis", 
    day: "Monday", 
    start: "10:00", 
    end: "11:00",
    subject: "Biology" 
  },
  { 
    id: 2, 
    studentName: "Thomas Wright", 
    day: "Wednesday", 
    start: "11:00", 
    end: "12:00",
    subject: "Physics" 
  },
];

// Time slots for the schedule
const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

// Days of the week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [availabilitySlots, setAvailabilitySlots] = useState(initialAvailabilitySlots);
  const [newSlot, setNewSlot] = useState({
    day: "Monday",
    start: "09:00",
    end: "10:00"
  });

  // Navigate to previous week
  const previousWeek = () => {
    const prevWeek = subWeeks(weekStart, 1);
    setWeekStart(prevWeek);
  };

  // Navigate to next week
  const nextWeek = () => {
    const nextWeek = addWeeks(weekStart, 1);
    setWeekStart(nextWeek);
  };

  // Add a new availability slot
  const addAvailabilitySlot = () => {
    // Validate that end time is after start time
    if (newSlot.start >= newSlot.end) {
      toast.error("End time must be after start time");
      return;
    }

    // Check for overlapping slots
    const isOverlapping = availabilitySlots.some(slot => 
      slot.day === newSlot.day && 
      ((newSlot.start >= slot.start && newSlot.start < slot.end) ||
       (newSlot.end > slot.start && newSlot.end <= slot.end) ||
       (newSlot.start <= slot.start && newSlot.end >= slot.end))
    );

    if (isOverlapping) {
      toast.error("This slot overlaps with an existing availability");
      return;
    }

    // Add the new slot
    setAvailabilitySlots([...availabilitySlots, { ...newSlot }]);
    setShowAddDialog(false);
    toast.success("Availability slot added successfully");
  };

  // Remove an availability slot
  const removeAvailabilitySlot = (index: number) => {
    const newSlots = [...availabilitySlots];
    newSlots.splice(index, 1);
    setAvailabilitySlots(newSlots);
    toast.success("Availability slot removed");
  };

  // Check if a session is scheduled at a specific day and time
  const getSessionAtSlot = (day: string, time: string) => {
    return scheduledSessions.find(
      session => 
        session.day === day && 
        time >= session.start && 
        time < session.end
    );
  };

  // Check if the tutor is available at a specific day and time
  const isAvailableAt = (day: string, time: string) => {
    return availabilitySlots.some(
      slot => 
        slot.day === day && 
        time >= slot.start && 
        time < slot.end
    );
  };

  // Format date range for the week
  const formatWeekRange = () => {
    const endOfWeek = addDays(weekStart, 6);
    return `${format(weekStart, "MMM d")} - ${format(endOfWeek, "MMM d, yyyy")}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-6 md:px-10 lg:px-20 pt-28 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 animate-fade-down">
            <div>
              <h1 className="text-3xl font-bold mb-2">Schedule</h1>
              <p className="text-muted-foreground">
                Manage your tutoring availability and view scheduled sessions
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Availability
              </Button>
            </div>
          </div>
          
          {/* Week Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={previousWeek}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous Week
            </Button>
            <h2 className="text-lg font-medium">{formatWeekRange()}</h2>
            <Button variant="outline" size="sm" onClick={nextWeek}>
              Next Week
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          {/* Weekly Schedule */}
          <AnimatedCard className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-1">
                {/* Time column */}
                <div className="col-span-1 font-medium text-center bg-secondary/20 py-2 rounded-tl-md">
                  Time
                </div>
                
                {/* Day columns */}
                {daysOfWeek.map((day, index) => (
                  <div 
                    key={day} 
                    className="col-span-1 font-medium text-center bg-secondary/20 py-2"
                  >
                    {day}
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
                    {daysOfWeek.map((day, dayIndex) => {
                      const session = getSessionAtSlot(day, time);
                      const isAvailable = isAvailableAt(day, time);
                      
                      return (
                        <div 
                          key={`${day}-${time}`} 
                          className={`col-span-1 py-3 px-2 border-t relative ${
                            isAvailable ? "bg-primary/10" : ""
                          }`}
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
          
          {/* Current Availability List */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-6">Current Availability</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {availabilitySlots.map((slot, index) => (
                <AnimatedCard 
                  key={`${slot.day}-${slot.start}-${slot.end}`}
                  delayIndex={index % 6}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{slot.day}</h3>
                      <p className="text-sm text-muted-foreground">
                        {slot.start} - {slot.end}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeAvailabilitySlot(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </AnimatedCard>
              ))}
            </div>
            
            {availabilitySlots.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                No availability slots set. Add some slots to start receiving session requests.
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Add Availability Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Availability</DialogTitle>
            <DialogDescription>
              Set a time slot when you're available for tutoring sessions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="day" className="text-sm font-medium">
                Day of Week
              </label>
              <Select 
                value={newSlot.day} 
                onValueChange={(value) => setNewSlot({ ...newSlot, day: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="startTime" className="text-sm font-medium">
                  Start Time
                </label>
                <Select 
                  value={newSlot.start} 
                  onValueChange={(value) => setNewSlot({ ...newSlot, start: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.slice(0, -1).map((time) => (
                      <SelectItem key={`start-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="endTime" className="text-sm font-medium">
                  End Time
                </label>
                <Select 
                  value={newSlot.end} 
                  onValueChange={(value) => setNewSlot({ ...newSlot, end: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.slice(1).map((time) => (
                      <SelectItem key={`end-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addAvailabilitySlot}>
              Add Slot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;
