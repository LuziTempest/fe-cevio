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
import { usePortfolioStore } from "@/store/use-portfolio-store";
import { usePortfolio } from "@/hooks/use-portfolio";
import { PortfolioData, PortfolioContent } from "@/types/portfolio";
import { toast } from "sonner";

type ThemeType = "minimalist" | "professional" | "creative";

export default function SandboxPage() {
  const router = useRouter();
  const { generatedData, activeTheme: storeTheme, setActiveTheme: setStoreTheme } = usePortfolioStore();
  const { save, uploadPhoto } = usePortfolio();
  
  const [activeTheme, setActiveTheme] = useState<ThemeType>(storeTheme as ThemeType || "professional");
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [savedLink, setSavedLink] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [portfolioTitle, setPortfolioTitle] = useState("");
  
  const { setTheme, resolvedTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    if (!generatedData) {
      router.push("/generate");
      return;
    }
    
    // Transform backend data to frontend template format
    const transformed: PortfolioData = {
      name: generatedData.profil.nama,
      role: generatedData.pengalaman_kerja?.[0]?.posisi || "Professional",
      profileImage: profileImageUrl || "",
      profile: generatedData.profil.deskripsi_diri,
      experience: generatedData.pengalaman_kerja.map(exp => ({
        position: exp.posisi,
        company: exp.perusahaan,
        duration: exp.durasi,
        description: exp.deskripsi
      })),
      education: generatedData.pendidikan.map(edu => ({
        degree: edu.jurusan,
        institution: edu.institusi,
        duration: edu.tahun
      })),
      skills: generatedData.keahlian,
      languages: [] // Fallback for languages
    };
    
    setPortfolioData(transformed);
  }, [generatedData, router, profileImageUrl]);

  // Reset scroll position when theme changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setStoreTheme(activeTheme);
  }, [activeTheme, setStoreTheme]);

  const themes: { id: ThemeType; label: string }[] = [
    { id: "minimalist", label: "Minimalist Theme" },
    { id: "professional", label: "Professional Theme" },
    { id: "creative", label: "Creative Theme" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("foto", file);
      
      uploadPhoto.mutate(formData, {
        onSuccess: (response) => {
          setProfileImageUrl(response.data.foto_url);
          setIsImageDialogOpen(false);
        }
      });
    }
  };

  const handleSave = async () => {
    if (!portfolioTitle) {
      toast.warning("Title Required", {
        description: "Please provide a title for your portfolio"
      });
      return;
    }

    if (!generatedData) return;

    const saveRequest = {
      title: portfolioTitle,
      tema_terpilih: activeTheme,
      fokus_terpilih: "umum",
      foto: profileImageUrl,
      data: generatedData, // Send original backend format to the save API
    };

    save.mutate(saveRequest, {
      onSuccess: (response) => {
        const slug = portfolioTitle.toLowerCase().replace(/\s+/g, "-");
        setSavedLink(`${window.location.origin}/p/${slug}`);
        
        // Redirect to profile after a short delay to show success
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      },
    });
  };

  const copyToClipboard = () => {
    if (savedLink) {
      navigator.clipboard.writeText(savedLink);
      toast.success("Link Copied", {
        description: "Portfolio URL has been copied to clipboard!"
      });
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const resetSaveState = (open: boolean) => {
    setIsSaveDialogOpen(open);
    if (!open) {
      setTimeout(() => {
        setSavedLink(null);
      }, 300);
    }
  };

  // Add profile image to portfolio data if uploaded
  const enhancedData: PortfolioData | null = portfolioData ? {
    ...portfolioData,
    profileImage: profileImageUrl 
      ? `${process.env.NEXT_PUBLIC_API_URL}${profileImageUrl}` 
      : portfolioData.profileImage
  } : null;

  if (!enhancedData) return null;

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
      {activeTheme === "minimalist" && <MinimalTheme data={enhancedData} />}
      {activeTheme === "professional" && <ProfessionalTheme data={enhancedData} />}
      {activeTheme === "creative" && <CreativeTheme data={enhancedData} />}

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
                  <Button 
                    variant="outline" 
                    onClick={triggerUpload} 
                    className="w-full justify-start text-muted-foreground font-normal"
                    disabled={uploadPhoto.isPending}
                  >
                    {uploadPhoto.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    {uploadPhoto.isPending ? "Uploading..." : "Upload an image file..."}
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
                    Give your portfolio a title to publish it.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="title">Portfolio URL</Label>
                    <div className="flex items-center w-full">
                      <div className="flex items-center h-10 px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-[11px] sm:text-sm font-medium whitespace-nowrap">
                        {process.env.NEXT_PUBLIC_URL || "cevio.app"}/p/
                      </div>
                      <Input 
                        id="title" 
                        placeholder="my-awesome-portfolio" 
                        value={portfolioTitle}
                        onChange={(e) => setPortfolioTitle(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                        className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      This will be your unique portfolio address.
                    </p>
                    {save.isError && (
                      <p className="text-xs text-destructive font-medium mt-1">
                        {(save.error as any)?.response?.data?.message || "Something went wrong. Please try again."}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter className="sm:justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsSaveDialogOpen(false)}
                    disabled={save.isPending}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    disabled={save.isPending || !portfolioTitle}
                    className="min-w-[100px]"
                  >
                    {save.isPending ? (
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




