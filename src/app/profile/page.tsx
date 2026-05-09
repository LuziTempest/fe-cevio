"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  User as UserIcon,
  Mail,
  Link as LinkIcon,
  Eye,
  ExternalLink,
  Loader2,
  LayoutDashboard,
  Image as ImageIcon,
  Upload,
  Sun,
  Moon
} from "lucide-react";
import { SignOut } from "@phosphor-icons/react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useRouter } from "next/navigation";
import MinimalTheme from "@/templates/MinimalTheme/page";
import ProfessionalTheme from "@/templates/ProfessionalTheme/page";
import CreativeTheme from "@/templates/CreativeTheme/page";
import { PortfolioData } from "@/types/portfolio";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type TabType = "profile" | "preview";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const { useMe, logout } = useAuth();
  const { usePortfolios, updatePortfolioPhoto } = usePortfolio();
  const { data: user, isLoading: userLoading } = useMe();
  const { data: portfolios, isLoading: portfoliosLoading } = usePortfolios();
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [photoTimestamp, setPhotoTimestamp] = useState(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Redirect to generate if user has no portfolios
    if (!portfoliosLoading && portfolios && portfolios.length === 0) {
      router.push("/generate");
    }
  }, [portfolios, portfoliosLoading, router]);

  if (userLoading || portfoliosLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!portfolios || portfolios.length === 0) {
    return null;
  }

  const latestPortfolio = portfolios[0];
  const baseUrl = process.env.NEXT_PUBLIC_URL || "cevio.app";
  const portfolioFullUrl = `https://${baseUrl}/p/${latestPortfolio.title}`;

  // Transform data for template preview
  const transformedData: PortfolioData = {
    name: latestPortfolio.data.profil.nama,
    role: latestPortfolio.data.pengalaman_kerja?.[0]?.posisi || "Professional",
    profileImage: latestPortfolio.foto 
      ? `${process.env.NEXT_PUBLIC_API_URL}${latestPortfolio.foto}?v=${photoTimestamp}` 
      : "",
    profile: latestPortfolio.data.profil.deskripsi_diri,
    experience: latestPortfolio.data.pengalaman_kerja.map(exp => ({
      position: exp.posisi,
      company: exp.perusahaan,
      duration: exp.durasi,
      description: exp.deskripsi
    })),
    education: latestPortfolio.data.pendidikan.map(edu => ({
      degree: edu.jurusan,
      institution: edu.institusi,
      duration: edu.tahun
    })),
    skills: latestPortfolio.data.keahlian,
    languages: []
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File Too Large", {
          description: "Profile image size cannot exceed 10MB"
        });
        event.target.value = "";
        return;
      }

      const formData = new FormData();
      formData.append("foto", file);

      updatePortfolioPhoto.mutate(formData, {
        onSuccess: () => {
          setPhotoTimestamp(Date.now()); // Update timestamp to force re-render
          setIsImageDialogOpen(false);
        }
      });
    }
  };  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Shared Global Navbar */}
      <Navbar />

      {/* Internal Sub-Navbar */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 p-1 bg-background/50 backdrop-blur-md border border-border rounded-full shadow-lg">
        <Button 
          variant={activeTab === "profile" ? "default" : "ghost"} 
          size="sm" 
          className="rounded-full px-6 transition-all"
          onClick={() => setActiveTab("profile")}
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Profile
        </Button>
        <Button 
          variant={activeTab === "preview" ? "default" : "ghost"} 
          size="sm" 
          className="rounded-full px-6 transition-all"
          onClick={() => setActiveTab("preview")}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </div>

      {activeTab === "profile" ? (
        <main className="container max-w-2xl mx-auto pt-44 px-4 pb-20">
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20 overflow-hidden relative">
                {latestPortfolio.foto ? (
                  <img 
                    src={`${process.env.NEXT_PUBLIC_API_URL}${latestPortfolio.foto}?v=${photoTimestamp}`} 
                    alt={user?.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-10 h-10 text-primary" />
                )}
              </div>              <CardTitle className="text-2xl font-bold tracking-tight">User Profile</CardTitle>
              <CardDescription>Manage your account and your generated portfolios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* Username Field */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border border-border/50 transition-all hover:bg-accent/50">
                  <div className="p-2.5 bg-background rounded-lg shadow-sm border border-border/50">
                    <UserIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Username</span>
                    <span className="font-semibold text-sm">{user?.name}</span>
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border border-border/50 transition-all hover:bg-accent/50">
                  <div className="p-2.5 bg-background rounded-lg shadow-sm border border-border/50">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Email Address</span>
                    <span className="font-semibold text-sm">{user?.email}</span>
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
                      href={portfolioFullUrl}
                      target="_blank"
                      className="font-semibold text-sm text-primary hover:underline inline-flex items-center gap-1.5 truncate"
                    >
                      {baseUrl}/p/{latestPortfolio.title}
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl py-6 font-bold uppercase tracking-wider text-[10px] border-primary/20 hover:bg-primary/5 transition-all"
                  onClick={() => toast.info("Feature On Development", {
                    description: "Multi-portfolio generation is currently being built. Stay tuned!"
                  })}
                >
                  Generate New Portfolio
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full rounded-xl py-6 font-bold uppercase tracking-wider text-[10px] text-destructive hover:text-destructive hover:bg-destructive/10 transition-all"
                  onClick={logout}
                >
                  <SignOut size={16} className="mr-2" />
                  Logout Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      ) : (
        <div className="relative pt-16">
          {/* Portfolio Preview Tab */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <div className="animate-in fade-in duration-700">
            {latestPortfolio.theme === "minimalist" && <MinimalTheme data={transformedData} />}
            {latestPortfolio.theme === "professional" && <ProfessionalTheme data={transformedData} />}
            {latestPortfolio.theme === "creative" && <CreativeTheme data={transformedData} />}
          </div>

          {/* Control Panel (Fixed Bottom Left) */}
          <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-2 p-1.5 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-2xl">
            {/* Image Upload Button (Directly triggers dialog) */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-accent transition-all duration-300"
              onClick={() => setIsImageDialogOpen(true)}
              title="Change Profile Image"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>

            <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Profile Image</DialogTitle>
                  <DialogDescription>
                    Change the profile photo for your live portfolio.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        onClick={triggerUpload} 
                        className="w-full justify-start text-muted-foreground font-normal"
                        disabled={updatePortfolioPhoto.isPending}
                      >
                        {updatePortfolioPhoto.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="mr-2 h-4 w-4" />
                        )}
                        {updatePortfolioPhoto.isPending ? "Updating..." : "Upload an image file..."}
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setIsImageDialogOpen(false)}>Cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-accent transition-all duration-300"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
              <span className="sr-only">Toggle Dark Mode</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
