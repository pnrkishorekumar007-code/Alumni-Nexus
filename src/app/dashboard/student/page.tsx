"use client";

import Link from "next/link";
import {
  HeartHandshake,
  GraduationCap,
  Bookmark,
  Calendar,
  Briefcase,
  Users,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Chart } from "@/components/shared/chart";
import { ActivityList } from "@/components/shared/activity-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mentorshipStats, recentActivities } from "@/lib/data";

const quickActions = [
  { label: "Find Mentors", href: "/mentorship", icon: HeartHandshake },
  { label: "Browse Jobs", href: "/jobs", icon: Briefcase },
  { label: "Alumni Directory", href: "/alumni", icon: Users },
  { label: "Community Feed", href: "/community", icon: MessageSquare },
];

export default function StudentDashboardPage() {
  return (
    <DashboardLayout role="student" userName="Adithya Raman" userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Adithya">
      <PageHeader
        title="Welcome back, Adithya"
        description="Here's what's happening in your SRM Connect journey"
        breadcrumbs={[{ label: "Student Dashboard" }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Mentor Requests" value={3} change="+1 this week" trend="up" icon={HeartHandshake} delay={0} />
        <StatCard label="Internship Applications" value={7} change="2 in review" trend="neutral" icon={GraduationCap} delay={0.1} />
        <StatCard label="Saved Alumni" value={24} change="+4 this month" trend="up" icon={Bookmark} delay={0.2} />
        <StatCard label="Upcoming Sessions" value={2} change="Next: Jul 22" trend="neutral" icon={Calendar} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Mentorship Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              data={mentorshipStats}
              dataKeys={[{ key: "sessions", color: "#0a2472", name: "Sessions" }]}
              type="area"
            />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Button variant="outline" className="w-full justify-between gap-2 hover:bg-primary hover:text-primary-foreground transition-all">
                  <span className="flex items-center gap-2">
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <ActivityList activities={recentActivities} />
    </DashboardLayout>
  );
}
