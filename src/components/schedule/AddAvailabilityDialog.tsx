
import React from "react";
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
import { Button } from "@/components/ui/button";

interface NewSlot {
  day: string;
  start: string;
  end: string;
}

interface AddAvailabilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newSlot: NewSlot;
  onNewSlotChange: (slot: NewSlot) => void;
  onAddSlot: () => void;
  daysOfWeek: string[];
  timeSlots: string[];
}

const AddAvailabilityDialog: React.FC<AddAvailabilityDialogProps> = ({
  open,
  onOpenChange,
  newSlot,
  onNewSlotChange,
  onAddSlot,
  daysOfWeek,
  timeSlots,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onValueChange={(value) => onNewSlotChange({ ...newSlot, day: value })}
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
                onValueChange={(value) => onNewSlotChange({ ...newSlot, start: value })}
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
                onValueChange={(value) => onNewSlotChange({ ...newSlot, end: value })}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onAddSlot}>
            Add Slot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAvailabilityDialog;
