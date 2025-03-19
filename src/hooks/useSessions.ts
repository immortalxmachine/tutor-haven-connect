
import { useState, useEffect } from "react";
import { Session } from "@/types/sessions";

// Mock data for sessions with proper date format
const mockSessions: Session[] = [
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
  }
];

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(mockSessions);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
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
  
  // Accept pending session
  const handleAcceptSession = (sessionId: number) => {
    // Update the sessions array with the new status
    const updatedSessions = sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: "upcoming" as const } 
        : session
    );
    
    // Update state with new sessions array
    setSessions(updatedSessions);
  };
  
  return {
    sessions,
    filteredSessions,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleAcceptSession
  };
}
