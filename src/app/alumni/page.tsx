"use client";

import { useState, useMemo } from "react";
import { LayoutGrid, List, Users } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { AdvancedFilters } from "@/components/shared/advanced-filters";
import { AlumniCard } from "@/components/cards/alumni-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getAlumni } from "@/lib/data";
import { DEPARTMENTS, COUNTRIES, SKILLS } from "@/constants";
import Link from "next/link";

const filterOptions = [
  { key: "department", label: "Department", options: [...DEPARTMENTS] },
  { key: "country", label: "Country", options: [...COUNTRIES] },
  { key: "skills", label: "Skills", options: [...SKILLS] },
  { key: "batch", label: "Batch", options: ["2010", "2012", "2014", "2015", "2016", "2018", "2020", "2022"] },
];

export default function AlumniDirectoryPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [view, setView] = useState<"grid" | "list">("grid");

  const alumni = getAlumni();

  const filtered = useMemo(() => {
    return alumni.filter((a) => {
      const matchesSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.company.toLowerCase().includes(search.toLowerCase()) ||
        a.currentRole.toLowerCase().includes(search.toLowerCase());
      const matchesDept = !filters.department || a.department === filters.department;
      const matchesCountry = !filters.country || a.country === filters.country;
      const matchesSkills = !filters.skills || a.skills.includes(filters.skills);
      const matchesBatch = !filters.batch || a.batch.toString() === filters.batch;
      return matchesSearch && matchesDept && matchesCountry && matchesSkills && matchesBatch;
    });
  }, [alumni, search, filters]);

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <PageHeader
          title="Alumni Directory"
          description={`Discover ${alumni.length}+ SRM alumni making impact worldwide`}
          breadcrumbs={[{ label: "Alumni Directory" }]}
          action={
            <div className="flex gap-2">
              <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}>
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          }
        />

        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name, company, or role..."
            showFilter={false}
          />
        </div>

        <AdvancedFilters
          filters={filterOptions}
          values={filters}
          onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
          onClear={() => setFilters({})}
          className="mb-6"
        />

        {filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No alumni found"
            description="Try adjusting your search or filters to find alumni."
            actionLabel="Clear Filters"
            onAction={() => { setSearch(""); setFilters({}); }}
          />
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((a, i) => (
              <AlumniCard key={a.id} alumni={a} index={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((a) => (
              <Link key={a.id} href={`/alumni/${a.id}`}>
                <Card className="glass-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <CardContent className="p-4 flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={a.avatar} />
                      <AvatarFallback>{a.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{a.name}</h3>
                      <p className="text-sm text-muted-foreground">{a.currentRole} at {a.company}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {a.skills.slice(0, 4).map((s) => (
                          <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">Batch {a.batch}</p>
                      <p className="text-xs text-muted-foreground">{a.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
