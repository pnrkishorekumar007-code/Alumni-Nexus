"use client";

import { useState, useMemo } from "react";
import { Calendar, Clock, Star, MessageSquare } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { MentorCard } from "@/components/cards/mentor-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getMentors } from "@/lib/data";
import type { Mentor } from "@/types";
import { toast } from "sonner";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

function getNextWeekdays(): string[] {
  const days: string[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  let added = 0;
  let offset = 1;
  while (added < 5) {
    const d = new Date(now);
    d.setDate(now.getDate() + offset);
    const dayOfWeek = d.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      days.push(`${dayNames[dayOfWeek]} ${d.getDate()}`);
      added++;
    }
    offset++;
  }
  return days;
}

const days = getNextWeekdays();

const sessionHistory = [
  { mentor: "Arjun Krishnamurthy", date: "Jul 15, 2026", topic: "Career in Cloud Engineering", rating: 5 },
  { mentor: "Priya Natarajan", date: "Jul 8, 2026", topic: "Product Management Interview Prep", rating: 5 },
  { mentor: "Rahul Sharma", date: "Jun 28, 2026", topic: "Startup Fundraising Basics", rating: 4 },
];

export default function MentorshipPage() {
  const [search, setSearch] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const mentors = useMemo(() => getMentors().filter(
    (m) =>
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase()))
  ), [search]);

  const handleBook = () => {
    toast.success(`Session booked with ${selectedMentor?.name} on ${selectedDay} at ${selectedSlot}`);
    setSelectedMentor(null);
    setSelectedSlot(null);
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Mentorship"
          description="Connect with experienced SRM alumni mentors for career guidance"
          breadcrumbs={[{ label: "Mentorship" }]}
        />

        <Tabs defaultValue="mentors">
          <TabsList>
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="mentors" className="mt-6">
            <SearchBar value={search} onChange={setSearch} placeholder="Search mentors by name or expertise..." showFilter={false} className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor, i) => (
                <MentorCard key={mentor.id} mentor={mentor} index={i} onBook={setSelectedMentor} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" /> Past Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessionHistory.map((session) => (
                  <div key={`${session.mentor}-${session.date}`} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{session.mentor}</p>
                      <p className="text-sm text-muted-foreground">{session.topic}</p>
                      <p className="text-xs text-muted-foreground mt-1">{session.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: session.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="mt-6">
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg">Share Your Experience</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  Your feedback helps improve the mentorship program for future students.
                </p>
                <Button className="mt-6">Submit Feedback</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
        <DialogContent className="max-w-lg">
          {selectedMentor && (
            <>
              <DialogHeader>
                <DialogTitle>Book Session with {selectedMentor.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <p className="text-sm text-muted-foreground">{selectedMentor.bio}</p>
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Select Date
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                      <Button
                        key={day}
                        variant={selectedDay === day ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Select Time Slot</p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedSlot === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedMentor.expertise.map((e) => (
                    <Badge key={e} variant="secondary">{e}</Badge>
                  ))}
                </div>
                <Button className="w-full" disabled={!selectedSlot} onClick={handleBook}>
                  Confirm Booking
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
}
