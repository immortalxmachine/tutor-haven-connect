
import React, { useState, useEffect } from "react";
import { 
  ChevronDown, 
  Search, 
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  MessageSquare,
  X,
  UserCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Header from "@/components/Header";
import AnimatedCard from "@/components/AnimatedCard";

// Mock data for sessions
const mockSessions = [
  {
    id: 1,
    studentName: "Alex Johnson",
    subject: "Mathematics",
    topic: "Calculus - Derivatives",
    date: "Oct 10, 2023",
    time: "3:30 PM - 4:30 PM",
    status: "upcoming",
    notes: "Student needs help with chain rule and implicit differentiation.",
    communicationMode: "video"
  },
  {
    id: 2,
    studentName: "Sarah Williams",
    subject: "Physics",
    topic: "Kinematics",
    date: "Oct 10, 2023",
    time: "5:00 PM - 6:00 PM",
    status: "upcoming",
    notes: "Review of velocity and acceleration concepts.",
    communicationMode: "video"
  },
  {
    id: 3,
    studentName: "Emma Davis",
    subject: "Biology",
    topic: "Cell Structure",
    date: "Oct 12, 2023",
    time: "4:00 PM - 5:00 PM",
    status: "pending",
    notes: "Student is preparing for a quiz on organelles.",
    communicationMode: "text"
  },
  {
    id: 4,
    studentName: "James Wilson",
    subject: "English Literature",
    topic: "Shakespeare - Macbeth",
    date: "Oct 13, 2023",
    time: "3:30 PM - 4:30 PM",
    status: "pending",
    notes: "Essay structure and character analysis.",
    communicationMode: "voice"
  },
  {
    id: 5,
    studentName: "Michael Brown",
    subject: "Chemistry",
    topic: "Periodic Table",
    date: "Oct 08, 2023",
    time: "2:15 PM - 3:15 PM",
    status: "completed",
    notes: "Went over electron configurations and periodic trends.",
    communicationMode: "video",
    feedback: {
      rating: 5,
      comment: "Excellent session! Really helped clarify difficult concepts."
    }
  },
  {
    id: 6,
    studentName: "Taylor Smith",
    subject: "Physics",
    topic: "Electromagnetism",
    date: "Oct 07, 2023",
    time: "1:00 PM - 2:00 PM",
    status: "completed",
    notes: "Covered magnetic fields and electromagnetic induction.",
    communicationMode: "video",
    feedback: {
      rating: 4,
      comment: "Very good explanation. Would book again."
    }
  },
  {
    id: 7,
    studentName: "Jordan Lee",
    subject: "Mathematics",
    topic: "Linear Algebra",
    date: "Oct 05, 2023",
    time: "4:30 PM - 5:30 PM",
    status: "completed",
    notes: "Vectors, matrices, and systems of equations.",
    communicationMode: "voice",
    feedback: {
      rating: 5,
      comment: "Amazing tutor! Explained everything clearly."
    }
  },
];

const Sessions = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions, setSessions] = useState(mockSessions);
  const [filteredSessions, setFilteredSessions] = useState(mockSessions);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  
  // Filter sessions based on search query and active tab
  useEffect(() => {
    let filtered = [...sessions];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        session => 
          session.studentName.toLowerCase().includes(query) || 
          session.subject.toLowerCase().includes(query) || 
          session.topic.toLowerCase().includes(query)
      );
    }
    
    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(session => session.status === activeTab);
    }
    
    setFilteredSessions(filtered);
  }, [searchQuery, activeTab, sessions]);
  
  // View session details
  const handleViewSession = (session: any) => {
    setSelectedSession(session);
    setShowSessionDetails(true);
  };
  
  // Accept pending session
  const handleAcceptSession = (sessionId: number) => {
    // Update the sessions array with the new status
    const updatedSessions = sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: "upcoming" } 
        : session
    );
    
    // Update state with new sessions array
    setSessions(updatedSessions);
    
    // Show success toast
    toast.success("Session accepted successfully!");
    
    // If selected session is the one being updated, update it too
    if (selectedSession && selectedSession.id === sessionId) {
      setSelectedSession({ ...selectedSession, status: "upcoming" });
    }
  };
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>;
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-6 md:px-10 lg:px-20 pt-28 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 animate-fade-down">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sessions</h1>
              <p className="text-muted-foreground">
                Manage your tutoring sessions and requests
              </p>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student, subject, or topic..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setActiveTab("all")}>
                    All Sessions
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("upcoming")}>
                    Upcoming
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("completed")}>
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs 
            defaultValue="all" 
            className="mb-6"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Sessions List */}
          <div className="space-y-4">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, index) => (
                <AnimatedCard 
                  key={session.id} 
                  delayIndex={index % 5}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4 mb-4 sm:mb-0">
                    <div className="p-2 bg-secondary rounded-full hidden sm:flex">
                      <UserCircle2 className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{session.studentName}</h3>
                        <StatusBadge status={session.status} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {session.subject} - {session.topic}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {session.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {session.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {session.status === "pending" && (
                      <Button 
                        size="sm" 
                        onClick={() => handleAcceptSession(session.id)}
                      >
                        Accept
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewSession(session)}
                    >
                      View Details
                    </Button>
                  </div>
                </AnimatedCard>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No sessions found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Session Details Dialog */}
      {selectedSession && (
        <Dialog open={showSessionDetails} onOpenChange={setShowSessionDetails}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Session Details</DialogTitle>
              <DialogDescription>
                View complete information about this tutoring session.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Session Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{selectedSession.subject}</h3>
                  <p className="text-muted-foreground">{selectedSession.topic}</p>
                </div>
                <StatusBadge status={selectedSession.status} />
              </div>
              
              <Separator />
              
              {/* Session Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Student</h4>
                  <p>{selectedSession.studentName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Communication</h4>
                  <p className="capitalize">{selectedSession.communicationMode}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Date</h4>
                  <p>{selectedSession.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Time</h4>
                  <p>{selectedSession.time}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Session Notes</h4>
                <p className="text-sm text-muted-foreground">{selectedSession.notes}</p>
              </div>
              
              {/* Feedback Section */}
              {selectedSession.feedback && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Student Feedback</h4>
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="text-yellow-500">
                          {i < selectedSession.feedback.rating ? "★" : "☆"}
                        </div>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {selectedSession.feedback.rating}/5
                      </span>
                    </div>
                    <p className="text-sm italic">
                      "{selectedSession.feedback.comment}"
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-end">
              {selectedSession.status === "pending" && (
                <Button 
                  onClick={() => {
                    handleAcceptSession(selectedSession.id);
                    setShowSessionDetails(false);
                  }}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Accept Session
                </Button>
              )}
              {selectedSession.status === "upcoming" && (
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Session
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Sessions;
