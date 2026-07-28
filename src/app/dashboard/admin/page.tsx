"use client";

import {
  Users,
  Building2,
  Calendar,
  Briefcase,
  HeartHandshake,
  FileText,
  TrendingUp,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Chart } from "@/components/shared/chart";
import { DataTable, StatusBadge } from "@/components/shared/data-table";
import { ActivityList } from "@/components/shared/activity-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  userGrowthData,
  departmentStats,
  placementStats,
  recentRegistrations,
  pendingVerifications,
  recentActivities,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin" userName="Admin User" userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin">
      <PageHeader
        title="Admin Dashboard"
        description="SRM Alumni Nexus — Platform Overview"
        breadcrumbs={[{ label: "Admin Dashboard" }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        <StatCard label="Users" value="52,340" change="+1,240 this month" trend="up" icon={Users} delay={0} />
        <StatCard label="Departments" value={10} change="All active" trend="neutral" icon={Building2} delay={0.05} />
        <StatCard label="Events" value={48} change="12 upcoming" trend="up" icon={Calendar} delay={0.1} />
        <StatCard label="Jobs" value={156} change="+23 this week" trend="up" icon={Briefcase} delay={0.15} />
        <StatCard label="Mentors" value={342} change="+18 new" trend="up" icon={HeartHandshake} delay={0.2} />
        <StatCard label="Reports" value={24} change="3 pending review" trend="neutral" icon={FileText} delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              data={userGrowthData}
              dataKeys={[
                { key: "students", color: "#3b82f6", name: "Students" },
                { key: "alumni", color: "#f59e0b", name: "Alumni" },
                { key: "faculty", color: "#10b981", name: "Faculty" },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Placement Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              data={placementStats}
              type="bar"
              xKey="year"
              dataKeys={[{ key: "rate", color: "#3b82f6", name: "Placement Rate %" }]}
              height={250}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card mb-6">
        <CardHeader>
          <CardTitle>Department Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart
            data={departmentStats}
            type="bar"
            xKey="name"
            dataKeys={[
              { key: "students", color: "#3b82f6", name: "Students" },
              { key: "placements", color: "#f59e0b", name: "Placement %" },
            ]}
            height={250}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: "name", header: "Name" },
                { key: "role", header: "Role" },
                { key: "department", header: "Department" },
                { key: "date", header: "Date", render: (row) => formatDate(String(row.date)) },
                { key: "status", header: "Status", render: (row) => <StatusBadge status={String(row.status)} /> },
              ]}
              data={recentRegistrations}
            />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Pending Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: "name", header: "Name" },
                { key: "email", header: "Email" },
                { key: "role", header: "Role" },
                { key: "batch", header: "Batch" },
                { key: "submitted", header: "Submitted", render: (row) => formatDate(String(row.submitted)) },
              ]}
              data={pendingVerifications}
            />
          </CardContent>
        </Card>
      </div>

      <ActivityList activities={recentActivities} title="Latest Platform Activity" />
    </DashboardLayout>
  );
}
