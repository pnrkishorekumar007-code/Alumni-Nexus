"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  GraduationCap,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BRAND, NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

interface NavbarProps {
  variant?: "public" | "dashboard";
  userName?: string;
  userAvatar?: string;
}

export function Navbar({ variant = "public", userName, userAvatar }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-dark/20 bg-primary">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-transform group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-white">{BRAND.shortName}</p>
            <p className="text-[10px] text-blue-200 leading-tight">Alumni Nexus</p>
          </div>
        </Link>

        {variant === "public" && (
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.public.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname === link.href
                    ? "text-accent border-b-2 border-accent"
                    : "text-white/80 hover:text-accent hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {variant === "public" ? (
            <>
              <ThemeToggle />
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-white hover:text-accent hover:bg-white/10">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent-hover font-semibold">Join Network</Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-accent hover:bg-white/10"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-white hover:text-accent hover:bg-white/10">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-white hover:text-accent hover:bg-white/10">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
              </Button>
              <ThemeToggle />
              <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-white hover:bg-white/10 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback>{userName?.charAt(0) ?? "U"}</AvatarFallback>
                </Avatar>
                <span className="hidden lg:block text-sm font-medium">{userName}</span>
                <ChevronDown className="hidden lg:block h-4 w-4 text-white/60" />
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && variant === "public" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-primary-dark"
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.public.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href ? "text-accent bg-white/10" : "text-white/80 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full mt-2 border-white/30 text-white hover:bg-white/10">Sign In</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
