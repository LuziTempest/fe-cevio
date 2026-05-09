"use client";

import React from "react";
import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Mail, Link as LinkIcon, Eye, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // Dummy data for now - usually this would come from a store or API
  const user = {
    username: "cachyanno",
    email: "cachyanno@example.com",
    portfolioLink: "https://cevio.app/p/cachyanno-dev",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container max-w-2xl mx-auto pt-32 px-4 pb-20">
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <User className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">User Profile</CardTitle>
            <CardDescription>Manage your account and your generated portfolios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Username Field */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border border-border/50 transition-all hover:bg-accent/50">
                <div className="p-2.5 bg-background rounded-lg shadow-sm border border-border/50">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Username</span>
                  <span className="font-semibold text-sm">{user.username}</span>
                </div>
              </div>

              {/* Email Field */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border border-border/50 transition-all hover:bg-accent/50">
                <div className="p-2.5 bg-background rounded-lg shadow-sm border border-border/50">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Email Address</span>
                  <span className="font-semibold text-sm">{user.email}</span>
                </div>
              </div>

              {/* Portfolio Link Field */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border border-border/50 transition-all hover:bg-accent/50">
                <div className="p-2.5 bg-background rounded-lg shadow-sm border border-border/50">
                  <LinkIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Portfolio Link</span>
                  <Link
                    href={user.portfolioLink}
                    target="_blank"
                    className="font-semibold text-sm text-primary hover:underline inline-flex items-center gap-1.5 truncate"
                  >
                    {user.portfolioLink}
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link href={user.portfolioLink} target="_blank" className="w-full">
                <Button className="w-full rounded-xl py-6 font-bold uppercase tracking-wider text-[10px] shadow-lg hover:shadow-primary/20 transition-all group">
                  <Eye className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  Preview Portfolio
                </Button>
              </Link>
              <Link href="/generate" className="w-full">
                <Button variant="outline" className="w-full rounded-xl py-6 font-bold uppercase tracking-wider text-[10px] border-primary/20 hover:bg-primary/5 transition-all">
                  Generate New
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
