"use client";

import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Mentor } from "@/types";

interface MentorCardProps {
  mentor: Mentor;
  index?: number;
  onBook?: (mentor: Mentor) => void;
}

export function MentorCard({ mentor, index = 0, onBook }: MentorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="glass-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              <AvatarImage src={mentor.avatar} />
              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{mentor.name}</h3>
              <p className="text-sm text-muted-foreground">{mentor.role}</p>
              <p className="text-xs text-muted-foreground">{mentor.company}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{mentor.rating}</span>
            </div>
          </div>

          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>

          <div className="mt-3 flex flex-wrap gap-1">
            {mentor.expertise.slice(0, 3).map((exp) => (
              <Badge key={exp} variant="secondary" className="text-[10px]">{exp}</Badge>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{mentor.sessionsCompleted} sessions completed</span>
          </div>

          <Button className="w-full mt-4" size="sm" onClick={() => onBook?.(mentor)}>
            Book Session
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
