"use client";

import { useState, useMemo } from "react";
import { Trophy, Rocket, Microscope, Medal } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PageHeader } from "@/components/shared/page-header";
import { AlumniCard } from "@/components/cards/alumni-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAlumni, getHallOfFame } from "@/lib/data";
import type { Alumni } from "@/types";
import Image from "next/image";

const categories = [
  { key: "all", label: "Hall of Fame", icon: Trophy },
  { key: "founder", label: "Startup Founders", icon: Rocket },
  { key: "researcher", label: "Researchers", icon: Microscope },
  { key: "award-winner", label: "Award Winners", icon: Medal },
  { key: "leader", label: "Top Alumni", icon: Trophy },
] as const;

function AchievementCard({ alumni }: { alumni: Alumni }) {
  return (
    <Card className="glass-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary to-accent" />
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Image src={alumni.avatar} alt={alumni.name} width={64} height={64} className="h-16 w-16 rounded-full border-2 border-accent" unoptimized />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{alumni.name}</h3>
            <p className="text-sm text-primary">{alumni.currentRole}</p>
            <p className="text-xs text-muted-foreground">{alumni.company}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="secondary">Batch {alumni.batch}</Badge>
              {alumni.category && (
                <Badge variant="gold" className="capitalize">{alumni.category.replace("-", " ")}</Badge>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{alumni.bio}</p>
        {alumni.achievements.length > 0 && (
          <ul className="mt-4 space-y-1">
            {alumni.achievements.slice(0, 3).map((a) => (
              <li key={a} className="text-xs flex items-start gap-2">
                <Trophy className="h-3 w-3 text-accent mt-0.5 shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export default function RecognitionPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const hallOfFame = useMemo(() => getHallOfFame(), []);
  const allAlumni = useMemo(() => getAlumni().filter((a) => a.hallOfFame || a.featured), []);

  const filtered = useMemo(() => activeCategory === "all"
    ? hallOfFame.length > 0 ? hallOfFame : allAlumni
    : allAlumni.filter((a) => a.category === activeCategory), [activeCategory, hallOfFame, allAlumni]);

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <PageHeader
          title="Recognition"
          description="Celebrating outstanding achievements of SRM alumni worldwide"
          breadcrumbs={[{ label: "Recognition" }]}
        />

        <div className="gradient-hero rounded-2xl p-6 mb-8 text-white text-center">
          <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Hall of Fame</h2>
          <p className="mt-2 text-white/70 max-w-xl mx-auto">
            Honoring alumni who have made exceptional contributions to industry, research, entrepreneurship, and society.
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex flex-wrap h-auto gap-1">
            {categories.map((cat) => (
              <TabsTrigger key={cat.key} value={cat.key} className="gap-1">
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

            {categories.map((cat) => (
            <TabsContent key={cat.key} value={cat.key} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {(cat.key === activeCategory ? filtered : []).map((alumni) => (
                  <AchievementCard key={alumni.id} alumni={alumni} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Featured Alumni</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allAlumni.slice(0, 4).map((a, i) => (
              <AlumniCard key={a.id} alumni={a} index={i} />
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
