
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabSelectorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs 
      defaultValue="all" 
      className="mb-6"
      value={activeTab}
      onValueChange={onTabChange}
    >
      <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabSelector;
