"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  index?: number;
}

const typeColors: Record<string, string> = {
  workshop: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  reunion: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  webinar: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  symposium: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  networking: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
};

export function EventCard({ event, index = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="glass-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
        <div className="relative h-40 overflow-hidden">
          <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
          {event.featured && (
            <Badge variant="gold" className="absolute top-3 left-3">Featured</Badge>
          )}
          <Badge className={`absolute top-3 right-3 capitalize ${typeColors[event.type]}`}>
            {event.type}
          </Badge>
        </div>
        <CardContent className="p-5">
          <h3 className="font-semibold line-clamp-2">{event.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
          <div className="mt-4 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(event.date)} · {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              {event.mode === "online" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5" />
              <span>{event.attendees}/{event.maxAttendees} registered</span>
            </div>
          </div>
          <Link href="/events">
            <Button className="w-full mt-4" size="sm" variant={event.past ? "outline" : "default"}>
              {event.past ? "View Recap" : "Register Now"}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
