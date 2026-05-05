"use client";

import * as React from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 backdrop-blur-md bg-background/30 border-white/10 shadow-lg group hover:scale-110 transition-all duration-300"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun
        size={24}
        weight="bold"
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500"
      />
      <Moon
        size={24}
        weight="bold"
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
