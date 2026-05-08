"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/navbar";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { ArrowRight, PlayCircle } from "@phosphor-icons/react";
import PixelBlast from "@/components/custom/pixel-blast/pixel-blast";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <ModeToggle />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/*<PixelBlast
            variant="square"
            pixelSize={3}
            color="#B497CF"
            patternScale={2}
            patternDensity={0.75}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0.25}
            transparent
          />*/}
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20 text-center">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: AI-powered Professional Theme released
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Transform your CV into a Stunning Portfolio
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl dark:text-white text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Upload your PDF and let our AI generate an interactive portfolio in seconds.
            Choose from multiple themes and customize your digital presence effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Button size="lg" className="h-12 px-8 text-base gap-2 group">
              Get Started for Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2 backdrop-blur-sm bg-background/5">
              <PlayCircle size={20} />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating Elements / Decorative */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-linear-to-b from-muted-foreground/50 to-transparent"></div>
        </div>
      </section>
    </main>
  );
}
