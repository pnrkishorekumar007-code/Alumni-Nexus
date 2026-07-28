"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Globe,
  Building2,
  HeartHandshake,
  Sparkles,
  Calendar,
  Newspaper,
  Trophy,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { AlumniCard } from "@/components/cards/alumni-card";
import { EventCard } from "@/components/cards/event-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND, STATS } from "@/constants";
import { getFeaturedAlumni, getUpcomingEvents, getNews } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

const statIcons = [Users, Globe, Building2, HeartHandshake];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [value, count, rounded]);

  return <span>{display}{suffix}</span>;
}

export default function LandingPage() {
  const featuredAlumni = useMemo(() => getFeaturedAlumni().slice(0, 4), []);
  const upcomingEvents = useMemo(() => getUpcomingEvents().slice(0, 3), []);
  const news = useMemo(() => getNews().slice(0, 4), []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
                <Sparkles className="h-3 w-3 mr-1" /> SRM Institute of Science and Technology
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                {BRAND.name}
              </h1>
              <p className="mt-2 text-xl text-accent font-medium">{BRAND.shortName}</p>
              <p className="mt-6 text-lg text-blue-100 leading-relaxed max-w-2xl">
                {BRAND.tagline}. Connect with 50,000+ alumni across 80+ countries. Find mentors, discover opportunities, and grow together.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" variant="gold" className="gap-2">
                    Join the Network <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/alumni">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                    Explore Alumni
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {STATS.map((stat, i) => {
                const Icon = statIcons[i];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Card className="glass-card border-white/20 bg-white/10 text-white">
                      <CardContent className="p-5">
                        <Icon className="h-5 w-5 text-accent mb-2" />
                        <p className="text-2xl font-bold">
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="text-sm text-blue-100 mt-1">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Alumni */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold">Featured Alumni</h2>
                <p className="mt-2 text-muted-foreground">Leaders making impact across the globe</p>
              </div>
              <Link href="/alumni">
                <Button variant="outline" className="gap-2 hidden sm:flex">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAlumni.map((alumni, i) => (
                <AlumniCard key={alumni.id} alumni={alumni} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <Calendar className="h-7 w-7 text-primary" />
              <div>
                <h2 className="text-3xl font-bold">Upcoming Events</h2>
                <p className="mt-1 text-muted-foreground">Reunions, workshops, and networking sessions</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <Newspaper className="h-7 w-7 text-primary" />
              <div>
                <h2 className="text-3xl font-bold">Latest News</h2>
                <p className="mt-1 text-muted-foreground">Updates from the SRM community</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row">
                      <Image src={item.image} alt={item.title} width={192} height={160} className="sm:w-48 h-40 sm:h-auto object-cover" unoptimized />
                      <CardContent className="p-5 flex flex-col justify-center">
                        <Badge variant="secondary" className="w-fit mb-2">{item.category}</Badge>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.excerpt}</p>
                        <p className="text-xs text-muted-foreground mt-3">{formatDate(item.date)} · {item.author}</p>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <Trophy className="h-7 w-7 text-accent" />
              <div>
                <h2 className="text-3xl font-bold">Success Stories</h2>
                <p className="mt-1 text-muted-foreground">Inspiring journeys from our alumni community</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Rahul Sharma", story: "From SRM dorm room to raising $15M for GreenDrive EV startup", batch: "2014", dept: "Mechanical" },
                { name: "Dr. Meera Iyer", story: "Published groundbreaking genomics research in Nature Genetics", batch: "2012", dept: "Biotechnology" },
                { name: "Arjun Krishnamurthy", story: "Leading engineering teams at Google, mentoring 150+ students", batch: "2015", dept: "CSE" },
              ].map((story, i) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="h-1 w-12 bg-accent rounded-full mb-4" />
                    <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{story.story}&rdquo;</p>
                    <div className="mt-4 pt-4 border-t">
                      <p className="font-semibold">{story.name}</p>
                      <p className="text-xs text-muted-foreground">Batch {story.batch} · {story.dept}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="gradient-hero py-20 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Connect?</h2>
            <p className="mt-4 text-blue-100 text-lg">
              Join thousands of SRM alumni, students, and faculty building meaningful connections every day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" variant="gold" className="gap-2">
                  Create Account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
