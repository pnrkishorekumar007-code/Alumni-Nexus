"use client";

import {
  HeartHandshake,
  Calendar,
  FileText,
  Award,
  TrendingUp,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Chart } from "@/components/shared/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mentorshipStats } from "@/lib/data";

const achievements = [
  "Mentored 150+ students",
  "Featured Alumni 2024",
  "10+ successful referrals",
  "Google Peer Bonus Award",
];

export default function AlumniDashboardPage() {
  return (
    <DashboardLayout role="alumni" userName="Arjun Krishnamurthy" userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun">
      <PageHeader
        title="Alumni Dashboard"
        description="Track your mentorship impact and community engagement"
        breadcrumbs={[{ label: "Alumni Dashboard" }]}
      />

      <Card className="glass-card mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Profile Completion</p>
              <p className="text-2xl font-bold mt-1">85%</p>
              <p className="text-xs text-muted-foreground mt-1">Add certifications to reach 100%</p>
            </div>
            <div className="flex-1 max-w-md">
              <Progress value={85} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Students Mentored" value={156} change="+12 this month" trend="up" icon={HeartHandshake} delay={0} />
        <StatCard label="Events Joined" value={23} change="3 upcoming" trend="up" icon={Calendar} delay={0.1} />
        <StatCard label="Posts" value={47} change="+5 this week" trend="up" icon={FileText} delay={0.2} />
        <StatCard label="Achievements" value={8} change="2 new badges" trend="up" icon={Award} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Mentorship Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              data={mentorshipStats}
              dataKeys={[{ key: "sessions", color: "#FFC72C", name: "Sessions Completed" }]}
              type="bar"
            />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Achievements & Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Award className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{item}</span>
                <Badge variant="gold" className="ml-auto">Verified</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
