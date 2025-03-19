
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Cell, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Session } from "@/types/sessions";
import { ChartPie, Users, Star } from "lucide-react";

interface SessionAnalyticsProps {
  sessions: Session[];
}

const SessionAnalytics: React.FC<SessionAnalyticsProps> = ({ sessions }) => {
  // Get completed sessions for analysis
  const completedSessions = useMemo(() => 
    sessions.filter(session => session.status === "completed"),
  [sessions]);

  // Calculate analytics data

  // 1. Sessions per subject
  const sessionsPerSubject = useMemo(() => {
    const subjectCounts: Record<string, number> = {};
    
    completedSessions.forEach(session => {
      if (subjectCounts[session.subject]) {
        subjectCounts[session.subject]++;
      } else {
        subjectCounts[session.subject] = 1;
      }
    });
    
    return Object.entries(subjectCounts).map(([subject, count]) => ({
      subject,
      count
    }));
  }, [completedSessions]);

  // 2. Average ratings
  const averageRatings = useMemo(() => {
    const ratingsMap: Record<string, {total: number, count: number}> = {};
    
    completedSessions.forEach(session => {
      if (session.feedback?.rating) {
        if (ratingsMap[session.subject]) {
          ratingsMap[session.subject].total += session.feedback.rating;
          ratingsMap[session.subject].count += 1;
        } else {
          ratingsMap[session.subject] = {
            total: session.feedback.rating,
            count: 1
          };
        }
      }
    });
    
    return Object.entries(ratingsMap).map(([subject, data]) => ({
      subject,
      rating: parseFloat((data.total / data.count).toFixed(1))
    }));
  }, [completedSessions]);

  // 3. Student retention (dummy data for now - would need historical session data per student)
  const studentRetention = [
    { month: "Jun", students: 4 },
    { month: "Jul", students: 6 },
    { month: "Aug", students: 5 },
    { month: "Sep", students: 8 },
    { month: "Oct", students: 10 }
  ];

  // Pie chart colors
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#F97316', '#8B5CF6'];

  // Calculate overall metrics
  const totalCompletedSessions = completedSessions.length;
  
  const overallRating = completedSessions.reduce((acc, session) => {
    return acc + (session.feedback?.rating || 0);
  }, 0) / (completedSessions.filter(s => s.feedback?.rating).length || 1);
  
  const uniqueStudents = new Set(completedSessions.map(s => s.studentName)).size;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ChartPie className="h-4 w-4 text-muted-foreground" />
              Completed Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletedSessions}</div>
            <p className="text-xs text-muted-foreground">
              Total completed tutoring sessions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallRating.toFixed(1)}/5</div>
            <p className="text-xs text-muted-foreground">
              Overall student satisfaction
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Unique Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueStudents}</div>
            <p className="text-xs text-muted-foreground">
              Different students tutored
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions by Subject */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Sessions by Subject</CardTitle>
            <CardDescription>
              Total completed sessions per subject
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                subject: { 
                  color: "#9b87f5", 
                  label: "Subject" 
                },
                count: { 
                  color: "#6E59A5", 
                  label: "Sessions" 
                }
              }}
            >
              <PieChart>
                <Pie
                  data={sessionsPerSubject}
                  dataKey="count"
                  nameKey="subject"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({subject, percent}) => `${subject}: ${(percent * 100).toFixed(0)}%`}
                >
                  {sessionsPerSubject.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Average Ratings */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Average Ratings by Subject</CardTitle>
            <CardDescription>
              Student ratings (out of 5) by subject
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                rating: { 
                  color: "#F97316", 
                  label: "Rating" 
                }
              }}
            >
              <BarChart data={averageRatings}>
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 5]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="rating" 
                  fill="#F97316" 
                  radius={[4, 4, 0, 0]}
                  name="Rating" 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Student Retention */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Student Retention</CardTitle>
            <CardDescription>
              Monthly active students
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                students: { 
                  color: "#8B5CF6", 
                  label: "Students" 
                }
              }}
            >
              <LineChart data={studentRetention}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  name="Students"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionAnalytics;
