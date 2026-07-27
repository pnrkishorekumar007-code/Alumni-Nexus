"use client";

import { use } from "react";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Mail,
  Linkedin,
  Github,
  Globe,
  Award,
  BookOpen,
  FolderGit2,
  ExternalLink,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PageHeader } from "@/components/shared/page-header";
import { Timeline } from "@/components/shared/timeline";
import { EmptyState } from "@/components/shared/empty-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAlumniById } from "@/lib/data";
import { User } from "lucide-react";

export default function AlumniProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const alumni = getAlumniById(id);

  if (!alumni) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-7xl px-4 py-16">
          <EmptyState
            icon={User}
            title="Alumni not found"
            description="The profile you're looking for doesn't exist."
            actionLabel="Browse Directory"
            onAction={() => window.location.href = "/alumni"}
          />
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          breadcrumbs={[
            { label: "Alumni Directory", href: "/alumni" },
            { label: alumni.name },
          ]}
        />

        <Card className="glass-card overflow-hidden mb-8">
          <div className="h-40 sm:h-52 bg-gradient-to-r from-primary/30 to-primary/10 relative">
            <img src={alumni.coverImage} alt="" className="w-full h-full object-cover opacity-60" />
          </div>
          <CardContent className="relative px-6 pb-6">
            <Avatar className="h-24 w-24 -mt-12 border-4 border-background shadow-lg">
              <AvatarImage src={alumni.avatar} />
              <AvatarFallback className="text-2xl">{alumni.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{alumni.name}</h1>
                <p className="text-lg text-muted-foreground">{alumni.currentRole}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{alumni.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{alumni.location}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge>{alumni.department}</Badge>
                  <Badge variant="secondary">Batch {alumni.batch}</Badge>
                  <Badge variant="gold">{alumni.experience} years experience</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default">Connect</Button>
                <Button variant="outline">Message</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4">
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <p className="text-sm leading-relaxed">{alumni.bio}</p>
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {alumni.skills.map((s) => (
                          <Badge key={s} variant="secondary">{s}</Badge>
                        ))}
                      </div>
                    </div>
                    {alumni.achievements.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Award className="h-4 w-4 text-accent" /> Achievements
                        </h3>
                        <ul className="space-y-2">
                          {alumni.achievements.map((a) => (
                            <li key={a} className="text-sm flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-4">
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <Timeline
                      items={alumni.experienceHistory.map((exp) => ({
                        title: exp.role,
                        subtitle: exp.company,
                        description: exp.description,
                        period: exp.endYear
                          ? `${exp.startYear} – ${exp.endYear}`
                          : `${exp.startYear} – Present`,
                      }))}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="mt-4">
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <Timeline
                      items={alumni.education.map((edu) => ({
                        title: edu.degree,
                        subtitle: edu.institution,
                        period: edu.year.toString(),
                        icon: <BookOpen className="h-4 w-4" />,
                      }))}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="mt-4 space-y-4">
                {alumni.projects.map((project) => (
                  <Card key={project.name} className="glass-card hover:shadow-lg transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <FolderGit2 className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold">{project.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {project.tech.map((t) => (
                              <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-base">Contact & Social</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{alumni.email}</span>
                </div>
                {alumni.linkedin && (
                  <Link href={alumni.linkedin} target="_blank" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Linkedin className="h-4 w-4" /> LinkedIn <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
                {alumni.github && (
                  <Link href={alumni.github} target="_blank" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Github className="h-4 w-4" /> GitHub <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
                {alumni.website && (
                  <Link href={alumni.website} target="_blank" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Globe className="h-4 w-4" /> Website <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </CardContent>
            </Card>

            {alumni.certifications.length > 0 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-base">Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alumni.certifications.map((cert) => (
                    <div key={cert.name} className="text-sm">
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-muted-foreground">{cert.issuer} · {cert.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
