
import React, { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import SearchAndFilter from "@/components/sessions/SearchAndFilter";
import TabSelector from "@/components/sessions/TabSelector";
import SessionList from "@/components/sessions/SessionList";
import SessionDetails from "@/components/sessions/SessionDetails";
import SessionAnalytics from "@/components/sessions/SessionAnalytics";
import SessionCalendar from "@/components/sessions/SessionCalendar";
import { useSessions } from "@/hooks/useSessions";
import { Session } from "@/types/sessions";
import { Skeleton } from "@/components/ui/skeleton";

const Sessions = () => {
  // Use the custom hook for session management
  const { 
    sessions,
    filteredSessions,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleAcceptSession,
    loading
  } = useSessions();

  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  
  // View session details
  const handleViewSession = (session: Session) => {
    setSelectedSession(session);
    setShowSessionDetails(true);
  };
  
  // Handle accept session with toast notification
  const handleAcceptWithNotification = (sessionId: string) => {
    handleAcceptSession(sessionId);
    
    // Update selected session if it's the one being accepted
    if (selectedSession && selectedSession.id === sessionId) {
      setSelectedSession({ ...selectedSession, status: "upcoming" });
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
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}
                className="text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded-md px-4 py-2 transition-colors"
              >
                {viewMode === "list" ? "Calendar View" : "List View"}
              </button>
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded-md px-4 py-2 transition-colors"
              >
                {showAnalytics ? "Hide Analytics" : "Show Analytics"}
              </button>
            </div>
          </div>
          
          {/* Analytics Component - Conditionally Rendered */}
          {showAnalytics && (
            <div className="mb-8">
              <SessionAnalytics sessions={sessions} />
            </div>
          )}
          
          {/* Search and Filter Component */}
          <SearchAndFilter 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveTab={setActiveTab}
          />
          
          {/* Tabs Component */}
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Loading State */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-60" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Sessions List or Calendar View Component */
            viewMode === "list" ? (
              <SessionList 
                sessions={filteredSessions}
                onViewSession={handleViewSession}
                onAcceptSession={handleAcceptWithNotification}
              />
            ) : (
              <SessionCalendar 
                sessions={filteredSessions}
                onViewSession={handleViewSession}
                onAcceptSession={handleAcceptWithNotification}
              />
            )
          )}
        </div>
      </main>
      
      {/* Session Details Dialog */}
      <SessionDetails
        session={selectedSession}
        open={showSessionDetails}
        onOpenChange={setShowSessionDetails}
        onAcceptSession={handleAcceptWithNotification}
      />
    </div>
  );
};

export default Sessions;
