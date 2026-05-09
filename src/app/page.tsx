"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/navbar"; // Sesuaikan dengan path kamu
import { ModeToggle } from "@/components/custom/mode-toggle"; // Sesuaikan dengan path kamu
import {
  ArrowRight,
  PlayCircle,
  Upload,
  Palette,
  Link as LinkIcon,
  CheckCircle,
  Sparkle,
  FilePdf
} from "@phosphor-icons/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import PixelBlast from "@/components/custom/pixel-blast/pixel-blast";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your PDF CV",
    desc: "Drop your boring PDF. Our AI instantly extracts your experience, skills, and education.",
  },
  {
    step: "02",
    icon: Sparkle,
    title: "AI Generates the Magic",
    desc: "Pick a premium theme. Our engine automatically structures your data into a beautiful layout.",
  },
  {
    step: "03",
    icon: LinkIcon,
    title: "Claim Your Link",
    desc: "Hit publish and share cevio.my.id/p/username. Stand out to recruiters instantly.",
  },
];

const avatarLetters = ["R", "S", "A", "D", "K"];

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <Navbar />
      <ModeToggle />

      {/* Pixel Blast Background */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none opacity-50 dark:opacity-30">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#B497CF"
          patternScale={2}
          patternDensity={1}
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
        />
      </div>

      {/* Decorative Background Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* ── HERO SECTION ── */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8 z-10 pt-16 md:pt-32">
          {/* Headline - Added Gradient for visual impact */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Your CV Deserves{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              Better
            </span>{" "}
            Than a PDF
          </h1>

          {/* Sub-headline */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Stop sending static files. Turn your resume into a stunning, interactive web portfolio in{" "}
            <strong className="text-foreground">under 60 seconds</strong>. Powered by AI, designed for professionals.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-400">
            <div className="flex -space-x-3">
              {avatarLetters.map((l, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border-2 border-background flex items-center justify-center text-xs font-bold text-foreground shadow-sm"
                >
                  {l}
                </div>
              ))}
            </div>
            <span>
              Join <strong className="text-foreground">2,400+</strong> users hired this month
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
              <Button onClick={() => redirect("/login")} size="lg" className="h-14 px-8 text-base gap-2 group relative overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative flex items-center gap-2">
                  Create Portfolio Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base gap-2 bg-background hover:bg-muted/50 transition-colors">
              <PlayCircle size={20} />
              See How it Works
            </Button>
          </div>

          {/* Micro-copy & URL Preview */}
          <div className="pt-4 flex flex-col items-center gap-3 animate-in fade-in duration-1000 delay-700">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border bg-card shadow-sm text-sm font-mono text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              cevio.my.id/p/<span className="text-foreground font-semibold">yourname</span>
            </div>
            <p className="text-xs text-muted-foreground">
              No credit card required &nbsp;·&nbsp; Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="howitworks" className="py-32 px-6 border-t border-border/40 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              From PDF to Portfolio in 3 Steps
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No manual data entry. No design skills required. Let our AI do the heavy lifting while you focus on landing the job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {steps.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative flex flex-col items-center text-center space-y-5 p-8 rounded-2xl bg-background border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors flex items-center justify-center rotate-3 group-hover:rotate-6">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <span className="absolute -top-3 -right-3 text-xs font-mono font-bold text-background bg-foreground rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                    {step.replace("0", "")}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-xl">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THEME SHOWCASE ── */}
      <section id="themes" className="py-32 px-6 border-t border-border/40 relative bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Stunning Themes for Every Profession
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our premium, responsive templates. Switch themes instantly without losing your data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: "minimalist", name: "Minimalist", img: "/theme/minimalist.png", desc: "Clean, modern, and content-focused. Perfect for developers and writers." },
              { id: "professional", name: "Professional", img: "/theme/professional.png", desc: "Classic and structured. Ideal for corporate roles, management, and finance." },
              { id: "creative", name: "Creative", img: "/theme/creative.png", desc: "Bold, expressive, and unique. Best for designers and creatives." },
            ].map((theme) => (
              <div key={theme.id} className="group relative flex flex-col rounded-2xl overflow-hidden border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted border-b">
                  <Image 
                    src={theme.img} 
                    alt={`${theme.name} Theme Preview`} 
                    fill 
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium flex items-center gap-2">
                      Preview {theme.name} <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl text-foreground">{theme.name}</h3>
                    <Palette size={20} className="text-primary/70" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {theme.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        {/* Glow effect for bottom CTA */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Ready to Stand Out?
          </h2>
          <p className="text-xl text-muted-foreground">
            Don&apos;t let another recruiter skip your PDF. Get your professional Cevio link and make a lasting first impression.
          </p>

          <ul className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium text-foreground py-4">
            {["100% Free to start", "ATS-Friendly Architecture", "Mobile Responsive"].map((feat) => (
              <li key={feat} className="flex items-center gap-2">
                <CheckCircle size={18} weight="fill" className="text-green-500" />
                {feat}
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-4">
            <Button onClick={() => redirect("/signup")} size="lg" className="h-14 px-10 text-lg gap-2 group shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300">
              Generate My Portfolio
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground">Takes less than a minute.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
