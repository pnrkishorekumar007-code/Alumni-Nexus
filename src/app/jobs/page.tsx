"use client";

import { useState, useMemo } from "react";
import { Briefcase } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { AdvancedFilters } from "@/components/shared/advanced-filters";
import { JobCard } from "@/components/cards/job-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJobs } from "@/lib/data";
import { DEPARTMENTS } from "@/constants";
import type { Job } from "@/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

const filterOptions = [
  { key: "department", label: "Department", options: [...DEPARTMENTS] },
  { key: "type", label: "Type", options: ["full-time", "part-time", "contract"] },
  { key: "location", label: "Location", options: ["Bangalore", "Chennai", "Hyderabad", "Remote", "Mumbai", "Pune"] },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const jobs = getJobs().filter((j) => j.category === "job" || j.category === "referral");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase());
      const matchesDept = !filters.department || j.department.includes(filters.department);
      const matchesType = !filters.type || j.type === filters.type;
      const matchesLocation = !filters.location || j.location.includes(filters.location);
      return matchesSearch && matchesDept && matchesType && matchesLocation;
    });
  }, [jobs, search, filters]);

  const handleApply = () => {
    toast.success("Application submitted successfully!");
    setSelectedJob(null);
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Career Hub — Jobs"
          description="Discover full-time roles and alumni referrals from top companies"
          breadcrumbs={[{ label: "Career Hub", href: "/jobs" }, { label: "Jobs" }]}
        />

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved ({savedJobs.length})</TabsTrigger>
            <TabsTrigger value="applied">Applications (3)</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <SearchBar value={search} onChange={setSearch} placeholder="Search jobs, companies..." showFilter={false} className="mb-4" />
            <AdvancedFilters
              filters={filterOptions}
              values={filters}
              onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
              onClear={() => setFilters({})}
              className="mb-8"
            />
            {filtered.length === 0 ? (
              <EmptyState icon={Briefcase} title="No jobs found" description="Try adjusting your filters." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((job, i) => (
                  <JobCard key={job.id} job={job} index={i} onView={setSelectedJob} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="saved">
            <EmptyState icon={Briefcase} title="No saved jobs yet" description="Save jobs to review them later." />
          </TabsContent>
          <TabsContent value="applied">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.slice(0, 3).map((job, i) => (
                <JobCard key={job.id} job={job} index={i} onView={setSelectedJob} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
                <DialogDescription>{selectedJob.company} · {selectedJob.location}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>{selectedJob.type}</Badge>
                  {selectedJob.category === "referral" && <Badge variant="gold">Alumni Referral</Badge>}
                  <Badge variant="secondary">{selectedJob.salary}</Badge>
                </div>
                <p className="text-sm leading-relaxed">{selectedJob.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {selectedJob.requirements.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((s) => (
                    <Badge key={s} variant="outline">{s}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Posted by {selectedJob.postedBy} · {formatDate(selectedJob.postedDate)} · Deadline: {formatDate(selectedJob.deadline)}
                </p>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleApply} className="flex-1">Apply Now</Button>
                  <Button variant="outline" onClick={() => {
                    setSavedJobs((prev) => prev.includes(selectedJob.id) ? prev : [...prev, selectedJob.id]);
                    toast.success("Job saved!");
                  }}>Save Job</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
}
