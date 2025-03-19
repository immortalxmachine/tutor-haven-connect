
import React from "react";
import Header from "@/components/Header";
import ScheduleHeader from "@/components/schedule/ScheduleHeader";
import WeekNavigation from "@/components/schedule/WeekNavigation";
import WeeklyScheduleGrid from "@/components/schedule/WeeklyScheduleGrid";
import AvailabilityList from "@/components/schedule/AvailabilityList";
import AddAvailabilityDialog from "@/components/schedule/AddAvailabilityDialog";
import SessionDetailsDialog from "@/components/schedule/SessionDetailsDialog";
import { useSchedule } from "@/hooks/useSchedule";

// Time slots for the schedule
const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

// Days of the week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Schedule = () => {
  const {
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
  } = useSchedule();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-6 md:px-10 lg:px-20 pt-28 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Header with title and action buttons */}
          <ScheduleHeader onAddSlotClick={() => setShowAddDialog(true)} />
          
          {/* Week Navigation */}
          <WeekNavigation 
            weekStart={weekStart}
            onPreviousWeek={previousWeek}
            onNextWeek={nextWeek}
          />
          
          {/* Weekly Schedule Grid */}
          <WeeklyScheduleGrid 
            weekStart={weekStart}
            timeSlots={timeSlots}
            daysOfWeek={daysOfWeek}
            scheduledSessions={scheduledSessions}
            availabilitySlots={availabilitySlots}
            onViewSession={viewSessionDetails}
          />
          
          {/* Availability List */}
          <AvailabilityList 
            availabilitySlots={availabilitySlots}
            onRemoveSlot={removeAvailabilitySlot}
          />
        </div>
      </main>
      
      {/* Add Availability Dialog */}
      <AddAvailabilityDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        newSlot={newSlot}
        onNewSlotChange={setNewSlot}
        onAddSlot={addAvailabilitySlot}
        daysOfWeek={daysOfWeek}
        timeSlots={timeSlots}
      />

      {/* Session Details Dialog */}
      <SessionDetailsDialog
        session={selectedSession}
        open={showSessionDetails}
        onOpenChange={setShowSessionDetails}
      />
    </div>
  );
};

export default Schedule;
