
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  Calendar, 
  Users, 
  BookOpen, 
  Star, 
  Shield, 
  Clock,
  CheckCircle2,
  Award,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import AnimatedCard from "@/components/AnimatedCard";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-10 lg:px-20 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[80%] rounded-full bg-blue-100 opacity-50 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-100 opacity-50 blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Empower Your Tutoring Journey
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
              A sophisticated platform designed exclusively for tutors to manage sessions, 
              track progress, and connect with students effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link to="/register">
                  Join as a Tutor
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <Link to="/login">
                  Login
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <AnimatedCard delayIndex={0}>
              <Calendar className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
              <p className="text-muted-foreground">
                Effortlessly manage your availability and let students book sessions that fit your calendar.
              </p>
            </AnimatedCard>
            
            <AnimatedCard delayIndex={1}>
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Session Management</h3>
              <p className="text-muted-foreground">
                Track all your tutoring sessions, review student requests, and manage your teaching schedule.
              </p>
            </AnimatedCard>
            
            <AnimatedCard delayIndex={2}>
              <BookOpen className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Resource Library</h3>
              <p className="text-muted-foreground">
                Upload and organize teaching materials to share with your students during sessions.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for Tutor Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline your tutoring practice with our comprehensive suite of tools designed with simplicity and efficiency in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Calendar className="h-8 w-8 text-primary" />}
              title="Intuitive Calendar"
              description="Set your availability with our drag-and-drop calendar interface. Sync with your personal calendar for seamless scheduling."
              delayIndex={0}
            />
            
            <FeatureCard 
              icon={<CheckCircle2 className="h-8 w-8 text-primary" />}
              title="Session Tracking"
              description="Accept or reschedule session requests with a single click. Keep track of all your past, present, and future sessions."
              delayIndex={1}
            />
            
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Secure Communication"
              description="Chat, voice, or video call your students within our secure platform. All communications are encrypted."
              delayIndex={2}
            />
            
            <FeatureCard 
              icon={<Star className="h-8 w-8 text-primary" />}
              title="Performance Insights"
              description="Receive feedback and ratings from students. Analyze your performance and identify areas for improvement."
              delayIndex={3}
            />
            
            <FeatureCard 
              icon={<Award className="h-8 w-8 text-primary" />}
              title="Recognition System"
              description="Earn badges and recognition for your tutoring achievements. Build your reputation on our platform."
              delayIndex={4}
            />
            
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title="Analytics Dashboard"
              description="Gain insights into your tutoring patterns, student engagement, and overall performance."
              delayIndex={5}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full animated-gradient opacity-5" />
        
        <div className="max-w-5xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up">Ready to Transform Your Tutoring Experience?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Join our growing community of dedicated tutors who are leveraging technology to enhance their teaching and increase their impact.
          </p>
          <Button size="lg" className="rounded-full px-10 animate-fade-up" style={{ animationDelay: "0.2s" }} asChild>
            <Link to="/register">
              Start Your Journey
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-auto py-8 px-6 md:px-10 lg:px-20 bg-secondary/70 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="bg-primary text-primary-foreground font-bold text-xl h-8 w-8 rounded-md flex items-center justify-center mr-2">
              T
            </span>
            <span className="font-display font-bold text-xl">TutorHaven</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TutorHaven. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delayIndex = 0 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  delayIndex?: number;
}) => {
  return (
    <AnimatedCard className="flex flex-col h-full" delayIndex={delayIndex}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </AnimatedCard>
  );
};

export default Index;
