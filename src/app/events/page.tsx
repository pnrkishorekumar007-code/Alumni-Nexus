"use client";

import { useState, useMemo } from "react";
import { QrCode, Calendar } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PageHeader } from "@/components/shared/page-header";
import { EventCard } from "@/components/cards/event-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";
import type { Event } from "@/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

const eventTypes = ["workshop", "reunion", "webinar", "symposium", "networking"] as const;

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeType, setActiveType] = useState<string>("all");

  const upcoming = useMemo(() => getUpcomingEvents(), []);
  const past = useMemo(() => getPastEvents(), []);

  const filterByType = (events: Event[]) =>
    activeType === "all" ? events : events.filter((e) => e.type === activeType);

  const handleRegister = () => {
    toast.success(`Registered for "${selectedEvent?.title}"! Check your email for confirmation.`);
    setSelectedEvent(null);
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <PageHeader
          title="Events"
          description="Reunions, workshops, webinars, and symposiums across the SRM alumni network"
          breadcrumbs={[{ label: "Events" }]}
        />

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Past Events ({past.length})</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            <Button variant={activeType === "all" ? "default" : "outline"} size="sm" onClick={() => setActiveType("all")}>
              All
            </Button>
            {eventTypes.map((type) => (
              <Button key={type} variant={activeType === type ? "default" : "outline"} size="sm" onClick={() => setActiveType(type)} className="capitalize">
                {type}s
              </Button>
            ))}
          </div>

          <TabsContent value="upcoming">
            {filterByType(upcoming).length === 0 ? (
              <EmptyState icon={Calendar} title="No upcoming events" description="Check back soon for new events." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filterByType(upcoming).map((event, i) => (
                  <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer">
                    <EventCard event={event} index={i} />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByType(past).map((event, i) => (
                <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer">
                  <EventCard event={event} index={i} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-lg">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>{selectedEvent.organizer}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Image src={selectedEvent.image} alt={selectedEvent.title} width={400} height={160} className="w-full h-40 object-cover rounded-xl" unoptimized />
                <div className="flex flex-wrap gap-2">
                  <Badge className="capitalize">{selectedEvent.type}</Badge>
                  <Badge variant="secondary">{selectedEvent.mode}</Badge>
                </div>
                <p className="text-sm leading-relaxed">{selectedEvent.description}</p>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>📅 {formatDate(selectedEvent.date)} · {selectedEvent.time}</p>
                  <p>📍 {selectedEvent.location}</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Registration</span>
                    <span>{selectedEvent.attendees}/{selectedEvent.maxAttendees}</span>
                  </div>
                  <Progress value={selectedEvent.maxAttendees > 0 ? (selectedEvent.attendees / selectedEvent.maxAttendees) * 100 : 0} className="h-2" />
                </div>
                {!selectedEvent.past && (
                  <div className="flex flex-col items-center p-6 rounded-xl border bg-muted/30">
                    <QrCode className="h-24 w-24 text-muted-foreground mb-3" />
                    <p className="text-xs text-muted-foreground">QR code will be generated upon registration</p>
                  </div>
                )}
                {!selectedEvent.past && (
                  <Button className="w-full" onClick={handleRegister}>Register for Event</Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
}
