
import { useState, useEffect } from "react";
import { startOfWeek, addWeeks, subWeeks, toast } from "date-fns";

// Mock data for scheduled sessions
const mockScheduledSessions = [
  { 
    id: 1, 
    studentName: "Emma Davis", 
    date: "2023-10-10",
    day: "Monday", 
    start: "10:00", 
    end: "11:00",
    subject: "Biology" 
  },
  { 
    id: 2, 
    studentName: "Thomas Wright", 
    date: "2023-10-12",
    day: "Wednesday", 
    start: "11:00", 
    end: "12:00",
    subject: "Physics" 
  },
  { 
    id: 3, 
    studentName: "James Wilson",
    date: "2023-10-13", 
    day: "Thursday", 
    start: "14:00", 
    end: "15:00",
    subject: "English Literature" 
  },
];

export interface AvailabilitySlot {
  day: string;
  start: string;
  end: string;
}

interface Session {
  id: number;
  studentName: string;
  date: string;
  day: string;
  start: string;
  end: string;
  subject: string;
}

export const useSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day: "Monday",
    start: "09:00",
    end: "10:00"
  });
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [scheduledSessions, setScheduledSessions] = useState(mockScheduledSessions);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  
  // Load saved availability from localStorage on component mount
  useEffect(() => {
    const savedAvailability = localStorage.getItem("tutorAvailability");
    if (savedAvailability) {
      try {
        const parsed = JSON.parse(savedAvailability);
        setAvailabilitySlots(parsed);
      } catch (error) {
        console.error("Error parsing saved availability:", error);
      }
    }
  }, []);

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
    const updatedSlots = [...availabilitySlots, { ...newSlot }];
    setAvailabilitySlots(updatedSlots);
    localStorage.setItem("tutorAvailability", JSON.stringify(updatedSlots));
    setShowAddDialog(false);
    toast.success("Availability slot added successfully");
  };

  // Remove an availability slot
  const removeAvailabilitySlot = (index: number) => {
    const newSlots = [...availabilitySlots];
    newSlots.splice(index, 1);
    setAvailabilitySlots(newSlots);
    localStorage.setItem("tutorAvailability", JSON.stringify(newSlots));
    toast.success("Availability slot removed");
  };

  // View details of a scheduled session
  const viewSessionDetails = (session: Session) => {
    setSelectedSession(session);
    setShowSessionDetails(true);
  };

  return {
    currentDate,
    weekStart,
    showAddDialog,
    setShowAddDialog,
    newSlot,
    setNewSlot,
    availabilitySlots,
    scheduledSessions,
    selectedSession,
    showSessionDetails,
    setShowSessionDetails,
    previousWeek,
    nextWeek,
    addAvailabilitySlot,
    removeAvailabilitySlot,
    viewSessionDetails,
  };
};
