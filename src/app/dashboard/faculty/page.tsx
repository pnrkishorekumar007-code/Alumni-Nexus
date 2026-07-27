"use client";

import {
  Users,
  GraduationCap,
  HeartHandshake,
  Calendar,
  BarChart3,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Chart } from "@/components/shared/chart";
import { ActivityList } from "@/components/shared/activity-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { departmentStats, recentActivities, placementStats } from "@/lib/data";

export default function FacultyDashboardPage() {
  return (
    <DashboardLayout role="faculty" userName="Dr. Priya Venkatesh" userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya">
      <PageHeader
        title="Faculty Dashboard"
        description="Computer Science & Engineering — Department Overview"
        breadcrumbs={[{ label: "Faculty Dashboard" }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Students" value="1,240" change="Batch 2023-27" trend="neutral" icon={GraduationCap} delay={0} />
        <StatCard label="Alumni" value="8,500" change="+120 this year" trend="up" icon={Users} delay={0.1} />
        <StatCard label="Mentorship Requests" value={18} change="5 pending" trend="neutral" icon={HeartHandshake} delay={0.2} />
        <StatCard label="Events" value={12} change="4 this month" trend="up" icon={Calendar} delay={0.3} />
        <StatCard label="Placement Rate" value="96%" change="+2% YoY" trend="up" icon={BarChart3} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Department Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              data={departmentStats}
              type="bar"
              xKey="name"
              dataKeys={[
                { key: "students", color: "#003DA5", name: "Students" },
                { key: "alumni", color: "#FFC72C", name: "Alumni" },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Placement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              data={placementStats}
              type="line"
              xKey="year"
              dataKeys={[
                { key: "rate", color: "#003DA5", name: "Placement %" },
                { key: "avgPackage", color: "#FFC72C", name: "Avg Package (LPA)" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <ActivityList activities={recentActivities} title="Department Activity" />
    </DashboardLayout>
  );
}
