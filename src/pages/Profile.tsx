
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Edit,
  Save,
  Award,
  Clock,
  Calendar
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

// Dummy data for the profile
const initialProfile = {
  name: "Emma Wilson",
  email: "emma.wilson@tutormail.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  profileImage: "https://i.pravatar.cc/300?img=25",
  bio: "Passionate math and science tutor with 5+ years of experience teaching high school and college students. I specialize in making complex concepts simple and engaging.",
  availability: true,
  education: [
    {
      degree: "M.S. in Mathematics",
      institution: "Stanford University",
      year: "2018",
    },
    {
      degree: "B.S. in Physics",
      institution: "UC Berkeley",
      year: "2016",
    },
  ],
  subjects: ["Calculus", "Physics", "Algebra", "Statistics"],
  hourlyRate: "$45",
  yearsExperience: 5,
  completedSessions: 142,
};

// Form schema for editing profile
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Phone number must be at least 5 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  availability: z.boolean(),
  hourlyRate: z.string().min(1, {
    message: "Please enter your hourly rate.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  // Initialize the form with current profile values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio,
      availability: profile.availability,
      hourlyRate: profile.hourlyRate,
    },
  });

  function onSubmit(data: ProfileFormValues) {
    // Update profile with form data
    setProfile({
      ...profile,
      ...data,
    });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-5xl py-24 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-6">
          {/* Profile Overview Card */}
          <Card className="md:col-span-2 h-fit">
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={profile.profileImage} alt={profile.name} />
                  <AvatarFallback className="text-4xl">{profile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center text-2xl">{profile.name}</CardTitle>
                <div className="flex items-center mt-1 gap-1">
                  <span className={`h-2.5 w-2.5 rounded-full ${profile.availability ? "bg-green-500" : "bg-gray-400"}`}></span>
                  <CardDescription>
                    {profile.availability ? "Available for tutoring" : "Not available"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{profile.location}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">Statistics</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-secondary rounded-md p-2">
                    <div className="font-semibold">{profile.yearsExperience}</div>
                    <div className="text-xs text-muted-foreground">Years</div>
                  </div>
                  <div className="bg-secondary rounded-md p-2">
                    <div className="font-semibold">{profile.completedSessions}</div>
                    <div className="text-xs text-muted-foreground">Sessions</div>
                  </div>
                  <div className="bg-secondary rounded-md p-2">
                    <div className="font-semibold">{profile.hourlyRate}</div>
                    <div className="text-xs text-muted-foreground">Hourly</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 
                  <><Save className="mr-2 h-4 w-4" /> Save Changes</> : 
                  <><Edit className="mr-2 h-4 w-4" /> Edit Profile</>
                }
              </Button>
            </CardFooter>
          </Card>

          {/* Main Content Area */}
          <div className="md:col-span-4 space-y-6">
            {/* Bio and Education Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>About Me</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell students about yourself..." 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Share your teaching philosophy, experience, and approach to tutoring.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="hourlyRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hourly Rate</FormLabel>
                              <FormControl>
                                <Input placeholder="$45" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="availability"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Availability</FormLabel>
                                <FormDescription>
                                  Show that you're available for new students
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                ) : (
                  <>
                    <div className="prose max-w-none">
                      <p>{profile.bio}</p>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        <Award className="h-5 w-5" /> Education
                      </h3>
                      <div className="space-y-4">
                        {profile.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-primary pl-4 pb-2">
                            <div className="font-medium">{edu.degree}</div>
                            <div className="text-sm text-muted-foreground">{edu.institution}, {edu.year}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Subjects Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Subjects I Teach</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.subjects.map((subject, index) => (
                    <div 
                      key={index}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      <BookOpen className="h-3.5 w-3.5 inline mr-1" />
                      {subject}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Availability</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Regular Hours</div>
                      <div className="text-sm text-muted-foreground">Mon-Fri: 3:00PM - 8:00PM</div>
                      <div className="text-sm text-muted-foreground">Sat: 10:00AM - 4:00PM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Schedule Availability</div>
                      <div className="text-sm text-muted-foreground">
                        View my detailed availability calendar
                      </div>
                      <Button variant="link" className="h-auto p-0 text-primary" asChild>
                        <a href="/schedule">View Calendar</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
