"use client";

import React, { useState } from "react";
import { ModeToggle } from "@/components/custom/mode-toggle";
import PixelBlast from "@/components/custom/pixel-blast/pixel-blast";
import {
  Upload,
  Palette,
  Sparkle,
  FilePdf,
  CheckCircle,
  ArrowRight,
  Info
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { usePortfolio } from "@/hooks/use-portfolio";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import { Loader2 } from "lucide-react";

const themes = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean, whitespace-heavy design focusing on readability.",
    preview: "bg-slate-50 dark:bg-slate-900 border-2",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional corporate layout with a modern touch.",
    preview: "bg-blue-50 dark:bg-blue-950 border-2",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold colors and unique layouts to stand out.",
    preview: "bg-purple-50 dark:bg-purple-950 border-2",
  },
];

export default function GeneratePage() {
  const router = useRouter();
  const { generate } = usePortfolio();
  const { setGeneratedData, setActiveTheme } = usePortfolioStore();
  const [selectedTheme, setSelectedTheme] = useState("professional");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("theme", selectedTheme);
    // You can also add focus here if you have it in UI

    generate.mutate(formData, {
      onSuccess: (response) => {
        setGeneratedData(response.data.data);
        setActiveTheme(selectedTheme);
        router.push("/generate/result");
      },
    });
  };

  return (
    <main className="relative min-h-screen">
      <ModeToggle />

      {/* Background Effect */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <PixelBlast
          variant="circle"
          pixelSize={4}
          color="oklch(0.205 0 0)"
          patternDensity={0.5}
          speed={0.2}
        />
      </div>

      <div className="container max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col gap-8">

          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Generate Your <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Upload your CV and choose a theme. Our AI will handle the rest,
              turning your professional history into a stunning website.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Upload & Options */}
            <div className="lg:col-span-2 space-y-8">

              {/* Step 1: Upload CV */}
              <Card className="backdrop-blur-sm bg-background/50 border-white/10 overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <Upload size={20} weight="bold" />
                    <CardTitle className="text-lg">Step 1: Upload Your CV</CardTitle>
                  </div>
                  <CardDescription>
                    Supported formats: PDF (max 5MB)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <label
                    htmlFor="cv-upload"
                    className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-muted-foreground/20 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {file ? (
                        <>
                          <div className="p-3 bg-primary/10 rounded-full mb-3 text-primary">
                            <FilePdf size={32} weight="fill" />
                          </div>
                          <p className="mb-1 text-sm font-semibold text-foreground">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </>
                      ) : (
                        <>
                          <div className="p-3 bg-muted rounded-full mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Upload size={24} />
                          </div>
                          <p className="mb-1 text-sm font-semibold text-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PDF only</p>
                        </>
                      )}
                    </div>
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={generate.isPending}
                    />
                  </label>
                </CardContent>
              </Card>

              {/* Step 2: Theme Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary px-1">
                  <Palette size={20} weight="bold" />
                  <h2 className="text-lg font-bold">Step 2: Choose a Theme</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <Card
                      key={theme.id}
                      className={`cursor-pointer transition-all border-2 ${
                        selectedTheme === theme.id
                        ? "border-primary ring-2 ring-primary/20 shadow-lg"
                        : "border-transparent hover:border-primary/30"
                      }`}
                      onClick={() => !generate.isPending && setSelectedTheme(theme.id)}
                    >
                      <div className={`h-24 w-full rounded-t-lg ${theme.preview} flex items-center justify-center`}>
                        <div className="w-1/2 h-1/2 rounded bg-white/20 backdrop-blur-md border border-white/30" />
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-bold">{theme.name}</CardTitle>
                          {selectedTheme === theme.id && (
                            <CheckCircle size={16} weight="fill" className="text-primary" />
                          )}
                        </div>
                        <CardDescription className="text-xs line-clamp-2">
                          {theme.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Preview/Status */}
            <div className="space-y-6">
              <Card className="sticky top-32 backdrop-blur-sm bg-background/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Generation Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CV Status</span>
                      <span className={file ? "text-primary font-medium flex items-center gap-1" : "text-destructive font-medium"}>
                        {file ? <><CheckCircle size={14} /> Ready</> : "Not uploaded"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Selected Theme</span>
                      <span className="font-medium capitalize">{selectedTheme}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 flex gap-3">
                    <Info size={18} className="text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Our AI will analyze your CV to extract experiences, skills, and education to build your portfolio.
                    </p>
                  </div>

                  <Button
                    className="w-full h-12 gap-2 text-sm font-bold uppercase tracking-wider group"
                    disabled={!file || generate.isPending}
                    onClick={handleGenerate}
                  >
                    {generate.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkle size={18} weight="fill" />
                        Generate Now
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  
                  {generate.isError && (
                    <p className="text-xs text-destructive text-center font-medium">
                      {(generate.error as any)?.response?.data?.message || "Generation failed. Please try again."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
