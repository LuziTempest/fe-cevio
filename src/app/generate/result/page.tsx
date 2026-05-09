"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import MinimalTheme from "@/templates/MinimalTheme/page";
import ProfessionalTheme from "@/templates/ProfessionalTheme/page";
import CreativeTheme from "@/templates/CreativeTheme/page";
import { useTheme } from "next-themes";
import { Sun, Moon, Palette, Check, Image as ImageIcon, Upload, Save, Loader2, ExternalLink, Copy, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dummyData } from "@/data/dummy";
import { PortfolioData } from "@/types/portfolio";

type ThemeType = "minimal" | "professional" | "creative";

export default function SandboxPage() {
  const router = useRouter();
  const [activeTheme, setActiveTheme] = useState<ThemeType>("minimal");
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(dummyData);
  const [mounted, setMounted] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedLink, setSavedLink] = useState<string | null>(null);
  
  const { setTheme, resolvedTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset scroll position when theme changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTheme]);

  const themes: { id: ThemeType; label: string }[] = [
    { id: "minimal", label: "Minimal Theme" },
    { id: "professional", label: "Professional Theme" },
    { id: "creative", label: "Creative Theme" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortfolioData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
        setIsImageDialogOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const randomSlug = Math.random().toString(36).substring(7);
    setSavedLink(`https://cevio.app/p/${randomSlug}`);
    setIsSaving(false);
    
    // Redirect to profile after a short delay to show success
    setTimeout(() => {
      router.push("/profile");
    }, 500);
  };

  const copyToClipboard = () => {
    if (savedLink) {
      navigator.clipboard.writeText(savedLink);
      alert("Link copied to clipboard!");
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const resetSaveState = (open: boolean) => {
    setIsSaveDialogOpen(open);
    if (!open) {
      // Small delay before resetting result so the transition looks clean
      setTimeout(() => {
        setSavedLink(null);
        setIsSaving(false);
      }, 300);
    }
  };

  return (
    <div className="relative">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {/* Dynamic Theme Rendering */}
      {activeTheme === "minimal" && <MinimalTheme data={portfolioData} />}
      {activeTheme === "professional" && <ProfessionalTheme data={portfolioData} />}
      {activeTheme === "creative" && <CreativeTheme data={portfolioData} />}

      {/* Control Panel (Fixed Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-2 p-1.5 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-2xl">
        {/* Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-accent">
              <Palette className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" className="w-48 mb-2">
            <DropdownMenuLabel className="text-xs font-bold uppercase tracking-widest opacity-50">Select Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themes.map((t) => (
              <DropdownMenuItem
                key={t.id}
                onClick={() => setActiveTheme(t.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                {t.label}
                {activeTheme === t.id && <Check className="w-4 h-4 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Image Upload Dialog */}
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-accent transition-all duration-300"
              title="Change Profile Image"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Profile Image</DialogTitle>
              <DialogDescription>
                Choose a new image for your portfolio profile.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={triggerUpload} className="w-full justify-start text-muted-foreground font-normal">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload an image file...
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

        {/* Save Dialog */}
        <Dialog open={isSaveDialogOpen} onOpenChange={resetSaveState}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-accent transition-all duration-300"
              title="Save Portfolio"
            >
              <Save className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            {!savedLink ? (
              <>
                <DialogHeader>
                  <DialogTitle>Save Portfolio</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to save and publish your portfolio? You can always edit it later.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsSaveDialogOpen(false)}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="min-w-[100px]"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Confirm"
                    )}
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Portfolio Saved!</DialogTitle>
                  <DialogDescription>
                    Your portfolio is now live. You can manage it from your profile.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input
                        id="link"
                        defaultValue={savedLink}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <Button size="icon" onClick={copyToClipboard} variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <DialogFooter className="sm:justify-end gap-2">
                  <Button variant="ghost" onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Go to Profile
                  </Button>
                  <Button asChild>
                    <a href={savedLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Site
                    </a>
                  </Button>
                </DialogFooter>
              </>
            )}
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
  );
}



