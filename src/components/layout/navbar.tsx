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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-foreground">{BRAND.shortName}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Alumni Nexus</p>
          </div>
        </Link>

        {variant === "public" && (
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.public.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "text-primary bg-primary/10 font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-2.5">
          {variant === "public" ? (
            <>
              <ThemeToggle />
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="font-medium text-foreground hover:bg-muted">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" variant="gold" className="font-semibold shadow-sm">Join Network</Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground hover:bg-muted"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-muted">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-muted">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
              </Button>
              <ThemeToggle />
              <button className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 hover:bg-muted transition-colors border border-transparent hover:border-border">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">{userName?.charAt(0) ?? "U"}</AvatarFallback>
                </Avatar>
                <span className="hidden lg:block text-sm font-medium text-foreground">{userName}</span>
                <ChevronDown className="hidden lg:block h-3.5 w-3.5 text-muted-foreground" />
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
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <nav className="flex flex-col p-4 gap-1.5">
              {NAV_LINKS.public.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full mt-2">Sign In</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
