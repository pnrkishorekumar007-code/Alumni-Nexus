"use client";

import { useState, useMemo } from "react";
import { GraduationCap } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { JobCard } from "@/components/cards/job-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getJobsByCategory } from "@/lib/data";
import type { Job } from "@/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const internships = getJobsByCategory("internship");

  const filtered = useMemo(() => {
    return internships.filter(
      (j) =>
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [internships, search]);

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Internships"
          description="Summer and semester internships from SRM alumni network companies"
          breadcrumbs={[{ label: "Career Hub", href: "/jobs" }, { label: "Internships" }]}
        />

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search internships..."
          showFilter={false}
          className="mb-8"
        />

        {filtered.length === 0 ? (
          <EmptyState icon={GraduationCap} title="No internships found" description="Check back soon for new opportunities." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} onView={setSelectedJob} />
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
                <DialogDescription>{selectedJob.company} · {selectedJob.location}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Badge variant="success">Internship</Badge>
                <p className="text-sm">{selectedJob.description}</p>
                <p className="text-xs text-muted-foreground">Stipend: {selectedJob.salary} · Deadline: {formatDate(selectedJob.deadline)}</p>
                <Button className="w-full" onClick={() => { toast.success("Application submitted!"); setSelectedJob(null); }}>
                  Apply for Internship
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
}
