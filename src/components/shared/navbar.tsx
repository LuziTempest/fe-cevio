"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { List } from "@phosphor-icons/react";

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[95%] max-w-6xl px-4 py-2 backdrop-blur-xl bg-background/30 border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all duration-300">
      <div className="flex items-center gap-2 pl-2">
        <span className="text-lg font-bold tracking-tight hidden sm:inline-block">Cevio</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Link href="#" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
          Features
        </Link>
        <Link href="#" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
          Themes
        </Link>
        <Link href="/profile" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
          Profile
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full px-4 text-xs font-bold uppercase">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm" className="rounded-full px-5 text-xs font-bold uppercase shadow-md">
            Get Started
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="md:hidden rounded-full">
          <List size={20} weight="bold" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
