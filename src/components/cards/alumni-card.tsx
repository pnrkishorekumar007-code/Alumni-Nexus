"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Building2, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Alumni } from "@/types";

interface AlumniCardProps {
  alumni: Alumni;
  index?: number;
}

export function AlumniCard({ alumni, index = 0 }: AlumniCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/alumni/${alumni.id}`}>
        <Card className="glass-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full">
          <div className="h-20 bg-gradient-to-r from-primary/20 to-primary/5 relative">
            {alumni.featured && (
              <Badge variant="gold" className="absolute top-3 right-3">Featured</Badge>
            )}
          </div>
          <CardContent className="pt-0 pb-5 px-5">
            <Avatar className="h-16 w-16 -mt-8 border-4 border-background shadow-md">
              <AvatarImage src={alumni.avatar} alt={alumni.name} />
              <AvatarFallback>{alumni.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="mt-3 font-semibold group-hover:text-primary transition-colors">{alumni.name}</h3>
            <p className="text-sm text-muted-foreground">{alumni.currentRole}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Building2 className="h-3 w-3" />
              <span>{alumni.company}</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{alumni.location}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {alumni.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-[10px]">{skill}</Badge>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Briefcase className="h-3 w-3" />
              <span>Batch {alumni.batch} · {alumni.experience}y exp</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
