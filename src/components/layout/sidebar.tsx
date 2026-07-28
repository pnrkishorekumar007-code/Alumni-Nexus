"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  MessageSquare,
  Calendar,
  Settings,
  User,
  Award,
  BarChart3,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  MessageSquare,
  Calendar,
  Settings,
  User,
  Award,
  BarChart3,
};

interface SidebarLink {
  href: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  links: readonly SidebarLink[];
  collapsed?: boolean;
}

export function Sidebar({ links }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className={cn("flex items-center border-b border-border p-4", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-primary">{BRAND.shortName}</p>
            <p className="text-[10px] text-muted-foreground">Portal</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => {
          const Icon = iconMap[link.icon] ?? LayoutDashboard;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm font-semibold ring-1 ring-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-40 lg:hidden shadow-lg bg-primary text-primary-foreground border-primary"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        className={cn(
          "fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] border-r border-border bg-background lg:block",
          mobileOpen && "block !w-64"
        )}
      >
        {sidebarContent}
      </motion.aside>

      <motion.aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background lg:hidden transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
