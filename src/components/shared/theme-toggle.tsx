"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full opacity-0" />;
  }

  const isDark = theme === "dark";

  const toggle = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => document.documentElement.classList.remove("theme-transition"), 300);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-all duration-300 border border-border/60 hover:border-border hover:scale-105 shadow-sm"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Sun className="h-4 w-4 text-amber-400 fill-amber-400/20" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300 fill-slate-700/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}

