"use client";

import {
  HeartHandshake,
  Briefcase,
  Calendar,
  UserPlus,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Activity } from "@/types";
import { formatRelativeTime } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  HeartHandshake,
  Briefcase,
  Calendar,
  UserPlus,
  TrendingUp,
};

interface ActivityListProps {
  activities: Activity[];
  title?: string;
}

export function ActivityList({ activities, title = "Recent Activity" }: ActivityListProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => {
          const Icon = iconMap[activity.icon] ?? TrendingUp;
          return (
            <div key={activity.id} className="flex gap-3 group">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{formatRelativeTime(activity.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
