"use client";

import Link from "next/link";
import {
  MapPin,
  Building2,
  Mail,
  Globe,
  Award,
  BookOpen,
  FolderGit2,
  ExternalLink,
  Pencil,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/shared/brand-icons";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/shared/page-header";
import { Timeline } from "@/components/shared/timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAlumniById } from "@/lib/data";
import Image from "next/image";

const profileAlumni = getAlumniById("alumni-001");

export default function ProfilePage() {
  const alumni = profileAlumni;

  if (!alumni) {
    return (
      <DashboardLayout role="alumni" userName="User" userAvatar="">
        <p className="text-muted-foreground p-8">Profile not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="alumni" userName={alumni.name} userAvatar={alumni.avatar}>
      <PageHeader
        title="My Profile"
        description="Your professional profile visible to the SRM community"
        breadcrumbs={[{ label: "Profile" }]}
        action={
          <Link href="/settings">
            <Button variant="outline" className="gap-2">
              <Pencil className="h-4 w-4" /> Edit Profile
            </Button>
          </Link>
        }
      />

      <Card className="glass-card overflow-hidden mb-8">
        <div className="h-40 sm:h-52 bg-gradient-to-r from-primary/30 to-primary/10 relative">
          <Image src={alumni.coverImage} alt={`${alumni.name} cover photo`} fill className="object-cover opacity-60" unoptimized />
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
            <div className="text-right">
              <p className="text-sm font-medium">Profile Strength</p>
              <Progress value={85} className="h-2 w-32 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">85% complete</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
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
                      period: exp.endYear ? `${exp.startYear} – ${exp.endYear}` : `${exp.startYear} – Present`,
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

            <TabsContent value="gallery" className="mt-4">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[alumni.coverImage, alumni.avatar, alumni.coverImage].map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                        <Image src={img} alt={`Gallery image ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" unoptimized />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn <ExternalLink className="h-3 w-3" />
                </Link>
              )}
              {alumni.github && (
                <Link href={alumni.github} target="_blank" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <GithubIcon className="h-4 w-4" /> GitHub <ExternalLink className="h-3 w-3" />
                </Link>
              )}
              {alumni.website && (
                <Link href={alumni.website} target="_blank" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Globe className="h-4 w-4" /> Website <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </CardContent>
          </Card>

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
        </div>
      </div>
    </DashboardLayout>
  );
}
