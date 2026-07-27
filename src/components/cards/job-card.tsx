"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, Users, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Job } from "@/types";
import { formatDate } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  index?: number;
  onView?: (job: Job) => void;
}

export function JobCard({ job, index = 0, onView }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="glass-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarImage src={job.companyLogo} />
                <AvatarFallback className="rounded-lg">{job.company.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => onView?.(job)}>
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={job.category === "referral" ? "gold" : job.category === "internship" ? "success" : "default"}>
              {job.category === "referral" ? "Referral" : job.category === "internship" ? "Internship" : "Full-time"}
            </Badge>
            {job.featured && <Badge variant="secondary">Featured</Badge>}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</div>
            <div className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{job.salary}</div>
            <div className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.experience}</div>
            <div className="flex items-center gap-1"><Users className="h-3 w-3" />{job.applicants} applied</div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Posted {formatDate(job.postedDate)}</span>
            <Button size="sm" onClick={() => onView?.(job)}>View Details</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
