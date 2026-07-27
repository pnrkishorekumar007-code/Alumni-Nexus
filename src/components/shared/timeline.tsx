"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  subtitle?: string;
  description?: string;
  period?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative space-y-0", className)}>
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />
      {items.map((item, i) => (
        <motion.div
          key={`${item.title}-${i}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative flex gap-4 pb-8 last:pb-0"
        >
          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
            {item.icon ?? (
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </div>
          <div className="flex-1 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                {item.subtitle && (
                  <p className="text-sm text-primary">{item.subtitle}</p>
                )}
              </div>
              {item.period && (
                <span className="text-xs text-muted-foreground shrink-0">{item.period}</span>
              )}
            </div>
            {item.description && (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
