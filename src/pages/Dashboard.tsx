
import React, { useState } from "react";
import { 
  CalendarDays, 
  Users, 
  BookOpen, 
  ChevronRight,
  MessageSquare,
  Clock,
  CheckCircle,
  Calendar,
  Star,
  Award,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import AnimatedCard from "@/components/AnimatedCard";

// Mock data
const sessions = [
  {
    id: 1,
    studentName: "Alex Johnson",
    subject: "Mathematics",
    date: "Today, 3:30 PM",
    status: "upcoming",
  },
  {
    id: 2,
    studentName: "Sarah Williams",
    subject: "Physics",
    date: "Today, 5:00 PM",
    status: "upcoming",
  },
  {
    id: 3,
    studentName: "Michael Brown",
    subject: "Chemistry",
    date: "Tomorrow, 2:15 PM",
    status: "upcoming",
  },
];

const pendingRequests = [
  {
    id: 101,
    studentName: "Emma Davis",
    subject: "Biology",
    preferredTime: "Wed, Oct 12, 4:00 PM",
  },
  {
    id: 102,
    studentName: "James Wilson",
    subject: "English Literature",
    preferredTime: "Thu, Oct 13, 3:30 PM",
  },
];

const recentFeedback = [
  {
    id: 201,
    studentName: "Taylor Smith",
    subject: "Physics",
    rating: 5,
    comment: "Excellent explanation of complex topics. Very patient.",
    date: "Yesterday",
  },
  {
    id: 202,
    studentName: "Jordan Lee",
    subject: "Mathematics",
    rating: 4,
    comment: "Very helpful session. Cleared all my doubts.",
    date: "3 days ago",
  },
];

const Dashboard = () => {
  const [stats] = useState({
    completedSessions: 42,
    pendingRequests: 2,
    averageRating: 4.8,
    xpPoints: 1250,
    nextLevelAt: 1500,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-6 md:px-10 lg:px-20 pt-28 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 animate-fade-down">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah</h1>
              <p className="text-muted-foreground">
                Here's an overview of your tutoring activity
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Button asChild variant="outline">
                <Link to="/profile">View Profile</Link>
              </Button>
              <Button asChild>
                <Link to="/schedule">Manage Schedule</Link>
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <AnimatedCard className="flex flex-col" delayIndex={0}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-md">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/sessions">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Completed Sessions</p>
              <p className="text-3xl font-bold">{stats.completedSessions}</p>
            </AnimatedCard>
            
            <AnimatedCard className="flex flex-col" delayIndex={1}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-100 rounded-md">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/sessions">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Pending Requests</p>
              <p className="text-3xl font-bold">{stats.pendingRequests}</p>
            </AnimatedCard>
            
            <AnimatedCard className="flex flex-col" delayIndex={2}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-yellow-100 rounded-md">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/feedback">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Average Rating</p>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold mr-1">{stats.averageRating}</p>
                <p className="text-muted-foreground">/5</p>
              </div>
            </AnimatedCard>
            
            <AnimatedCard className="flex flex-col" delayIndex={3}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-100 rounded-md">
                  <Award className="h-6 w-6 text-purple-500" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/achievements">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mb-1">XP Progress</p>
              <p className="text-3xl font-bold">{stats.xpPoints}</p>
              <div className="mt-2">
                <Progress value={(stats.xpPoints / stats.nextLevelAt) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.nextLevelAt - stats.xpPoints} XP until next level
                </p>
              </div>
            </AnimatedCard>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/sessions" className="flex items-center">
                    View all
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {sessions.length > 0 ? (
                  sessions.map((session, index) => (
                    <AnimatedCard 
                      key={session.id}
                      className="flex items-center justify-between" 
                      delayIndex={index}
                      hoverEffect={false}
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-4">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{session.studentName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {session.subject} • {session.date}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/sessions/${session.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </AnimatedCard>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming sessions scheduled.
                  </div>
                )}
              </div>
              
              {/* Pending Requests */}
              <div className="mt-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Pending Requests</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/sessions?filter=pending" className="flex items-center">
                      View all
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request, index) => (
                      <AnimatedCard 
                        key={request.id} 
                        className="flex items-center justify-between"
                        delayIndex={index}
                        hoverEffect={false}
                      >
                        <div className="flex items-center">
                          <div className="p-2 bg-orange-100 rounded-full mr-4">
                            <Clock className="h-5 w-5 text-orange-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">{request.studentName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {request.subject} • {request.preferredTime}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm">Accept</Button>
                        </div>
                      </AnimatedCard>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No pending requests at the moment.
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Recent Feedback */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recent Feedback</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/feedback" className="flex items-center">
                      View all
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentFeedback.length > 0 ? (
                    recentFeedback.map((feedback, index) => (
                      <AnimatedCard 
                        key={feedback.id} 
                        delayIndex={index}
                        hoverEffect={false}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{feedback.studentName}</h3>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {feedback.subject} • {feedback.date}
                        </p>
                        <p className="text-sm">{feedback.comment}</p>
                      </AnimatedCard>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No feedback received yet.
                    </div>
                  )}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/resources">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Manage Resources
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/schedule">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Update Availability
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile">
                      <Users className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
