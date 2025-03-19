
import React from "react";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/AnimatedCard";

interface AvailabilitySlot {
  day: string;
  start: string;
  end: string;
}

interface AvailabilityListProps {
  availabilitySlots: AvailabilitySlot[];
  onRemoveSlot: (index: number) => void;
}

const AvailabilityList: React.FC<AvailabilityListProps> = ({ 
  availabilitySlots, 
  onRemoveSlot 
}) => {
  return (
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
              onClick={() => onRemoveSlot(index)}
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
  );
};

export default AvailabilityList;
