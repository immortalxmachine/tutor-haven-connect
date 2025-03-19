
import React, { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Clock, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import AnimatedCard from "@/components/AnimatedCard";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Time slot options
const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

type AvailabilitySlot = {
  day: string;
  start: string;
  end: string;
};

const CreateSchedule = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);

  const validateTimeRange = () => {
    if (!startTime || !endTime) {
      toast.error("Please select both start and end times");
      return false;
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return false;
    }

    return true;
  };

  const handleAddAvailability = () => {
    if (!selectedDay || !validateTimeRange()) {
      return;
    }

    // Get day of week
    const dayName = daysOfWeek[selectedDay.getDay() === 0 ? 6 : selectedDay.getDay() - 1];
    
    // Check for overlapping slots
    const isOverlapping = availabilitySlots.some(
      slot => 
        (!isRecurring && format(selectedDay, "yyyy-MM-dd") === slot.day ||
         isRecurring && dayName === slot.day) && 
        ((startTime >= slot.start && startTime < slot.end) ||
         (endTime > slot.start && endTime <= slot.end) ||
         (startTime <= slot.start && endTime >= slot.end))
    );

    if (isOverlapping) {
      toast.error("This slot overlaps with an existing availability");
      return;
    }

    // Create the new slot
    const newSlot = {
      day: isRecurring ? dayName : format(selectedDay, "yyyy-MM-dd"),
      start: startTime,
      end: endTime
    };

    setAvailabilitySlots([...availabilitySlots, newSlot]);
    toast.success(`Availability added for ${isRecurring ? dayName : format(selectedDay, "MMM dd, yyyy")}`);
  };

  const removeAvailabilitySlot = (index: number) => {
    const newSlots = [...availabilitySlots];
    newSlots.splice(index, 1);
    setAvailabilitySlots(newSlots);
    toast.success("Availability slot removed");
  };

  const handleSaveSchedule = () => {
    // Here you would save the schedule to your backend
    // For now, we'll just mock this with local storage
    localStorage.setItem("tutorAvailability", JSON.stringify(availabilitySlots));
    toast.success("Schedule saved successfully!");
    navigate("/schedule");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 md:px-10 lg:px-20 pt-28 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col space-y-1 mb-8 animate-fade-down">
            <h1 className="text-3xl font-bold">Create Your Schedule</h1>
            <p className="text-muted-foreground">
              Set up your availability for tutoring sessions
            </p>
          </div>

          <AnimatedCard className="mb-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Add Availability</h2>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Availability Type</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant={isRecurring ? "outline" : "default"}
                        onClick={() => setIsRecurring(false)}
                        className="w-32"
                      >
                        One-time
                      </Button>
                      <Button
                        variant={isRecurring ? "default" : "outline"}
                        onClick={() => setIsRecurring(true)}
                        className="w-32"
                      >
                        Recurring
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Select Day</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full mt-2 justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDay ? (
                            format(selectedDay, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDay}
                          onSelect={setSelectedDay}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Time</label>
                      <Select value={startTime} onValueChange={setStartTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select start time" />
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
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Time</label>
                      <Select value={endTime} onValueChange={setEndTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select end time" />
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

                  <Button 
                    onClick={handleAddAvailability} 
                    className="w-full"
                    disabled={!selectedDay}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Availability
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Added Availability Slots</h3>
                  {availabilitySlots.length > 0 ? (
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                      {availabilitySlots.map((slot, index) => (
                        <div 
                          key={`${slot.day}-${slot.start}-${index}`}
                          className="flex items-center justify-between p-3 bg-secondary/20 rounded-md"
                        >
                          <div>
                            <div className="font-medium">{slot.day}</div>
                            <div className="text-sm text-muted-foreground">
                              {slot.start} - {slot.end}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeAvailabilitySlot(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-center py-6">
                      No availability slots added yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedCard>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => navigate("/schedule")}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveSchedule} 
              disabled={availabilitySlots.length === 0}
            >
              Save Schedule
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateSchedule;
