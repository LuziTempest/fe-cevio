"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { List, SignOut, Sparkle, Layout, User } from "@phosphor-icons/react";
import { useAuth } from "@/hooks/use-auth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { useMe, logout } = useAuth();
  const { data: user } = useMe();

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Themes", href: "#themes" },
    ...(user ? [{ label: "My Profile", href: "/profile" }] : []),
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[95%] max-w-5xl px-3 py-2.5 backdrop-blur-xl bg-background/60 supports-[backdrop-filter]:bg-background/40 border border-border/40 rounded-full shadow-sm transition-all duration-300">

      {/* ── LOGO & BRAND ── */}
      <div className="flex items-center pl-3">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-105 transition-all">
            <Sparkle weight="fill" size={16} className="text-primary" />
          </div>
          <span className="text-lg font-extrabold tracking-tight hidden sm:inline-block">
            Cevio
          </span>
        </Link>
      </div>

      {/* ── DESKTOP NAVIGATION ── */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* ── ACTIONS ── */}
      <div className="flex items-center gap-2 pr-1">
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link href="/profile">
                <Button
                  size="sm"
                  className="rounded-full px-5 text-xs font-bold uppercase shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all"
                >
                  <Layout size={16} className="mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="rounded-full h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Logout"
              >
                <SignOut size={18} weight="bold" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-5 text-xs font-bold uppercase hover:bg-muted/50"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="rounded-full px-6 text-xs font-bold uppercase shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* ── MOBILE MENU (SHEET) ── */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full h-9 w-9 hover:bg-muted/50 ml-1"
            >
              <List size={20} weight="bold" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] px-4 border-l-border/40 bg-background/80 backdrop-blur-xl">
            <SheetHeader className="text-left pb-6 border-b border-border/40">
              <SheetTitle className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkle weight="fill" size={16} className="text-primary" />
                </div>
                <span className="text-xl font-extrabold tracking-tight">Cevio</span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6 pt-8">
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-2">Navigation</p>
                {navLinks.map((link) => (
                  <SheetClose key={link.label} asChild>
                    <Link
                      href={link.href}
                      className="text-lg font-bold p-2 rounded-lg hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-between group"
                    >
                      {link.label}
                      <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t border-border/40">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-2">Account</p>
                {user ? (
                  <>
                    <SheetClose asChild>
                      <Link href="/profile">
                        <Button className="w-full justify-start rounded-xl py-6 font-bold uppercase text-[11px] tracking-wider">
                          <Layout size={18} className="mr-3" />
                          My Dashboard
                        </Button>
                      </Link>
                    </SheetClose>
                    <Button
                      variant="ghost"
                      onClick={logout}
                      className="w-full justify-start rounded-xl py-6 font-bold uppercase text-[11px] tracking-wider text-destructive hover:bg-destructive/10"
                    >
                      <SignOut size={18} className="mr-3" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Link href="/login" className="w-full">
                        <Button variant="outline" className="w-full rounded-xl py-6 font-bold uppercase text-[11px] tracking-wider">
                          Sign In
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/signup" className="w-full">
                        <Button className="w-full rounded-xl py-6 font-bold uppercase text-[11px] tracking-wider shadow-lg shadow-primary/20">
                          Get Started Free
                        </Button>
                      </Link>
                    </SheetClose>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
