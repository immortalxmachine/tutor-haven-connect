
import { useState, useEffect } from "react";
import { Session } from "@/types/sessions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  
  // Fetch sessions from Supabase
  const fetchSessions = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('sessions')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Transform the data format to match our Session interface
        const formattedSessions: Session[] = data.map(session => ({
          id: session.id,
          studentName: session.student_name,
          subject: session.subject,
          topic: session.topic,
          date: format(new Date(session.date), 'MMM d, yyyy'),
          time: session.time,
          status: session.status as "upcoming" | "pending" | "completed",
          notes: session.notes || "",
          communicationMode: session.communication_mode as "text" | "voice" | "video",
          feedback: session.feedback ? {
            rating: session.feedback.rating,
            comment: session.feedback.comment
          } : undefined,
          tutor_id: session.tutor_id
        }));
        
        setSessions(formattedSessions);
      }
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };
  
  // Initial fetch
  useEffect(() => {
    fetchSessions();
    
    // Set up real-time subscription for updates
    const channel = supabase
      .channel('public:sessions')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'sessions' }, 
        (payload) => {
          // Refresh sessions when there's a change
          fetchSessions();
        }
      )
      .subscribe();
    
    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
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
  const handleAcceptSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('sessions')
        .update({ status: 'upcoming' })
        .eq('id', sessionId);
      
      if (error) {
        throw error;
      }
      
      // Local state update (will be overridden by the real-time subscription)
      const updatedSessions = sessions.map(session => 
        session.id === sessionId 
          ? { ...session, status: "upcoming" as const } 
          : session
      );
      
      setSessions(updatedSessions);
      toast.success('Session accepted successfully!');
    } catch (error: any) {
      console.error('Error accepting session:', error);
      toast.error('Failed to accept session');
    }
  };
  
  return {
    sessions,
    filteredSessions,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleAcceptSession,
    loading
  };
}
