"use client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/navbar";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { ArrowRight, PlayCircle, Upload, Palette, Link, CheckCircle } from "@phosphor-icons/react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your CV",
    desc: "Drop your PDF. Our AI parses everything — experience, skills, education — automatically.",
  },
  {
    step: "02",
    icon: Palette,
    title: "Pick a Theme",
    desc: "Choose from curated professional themes. Preview live before you publish.",
  },
  {
    step: "03",
    icon: Link,
    title: "Share Your Link",
    desc: "Your portfolio goes live at cevio.my.id/d/username — ready to share anywhere.",
  },
];

const avatarLetters = ["R", "S", "A", "D"];

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <ModeToggle />

      {/* Background */}
      <div className="absolute inset-0 -z-10" />

      {/* ── HERO SECTION ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Badge: New Feature */}
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            New: AI-powered Professional Theme released
          </div>

          {/* ★ HOOK 1: Headline — benefit-driven, emosional */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Your CV Deserves{" "}
            <span className="text-primary">Better</span>{" "}
            Than a PDF
          </h1>

          {/* ★ HOOK 2: Sub-headline — spesifik & konkret */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl dark:text-white text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Turn your CV into a live, interactive portfolio in{" "}
            <strong className="text-foreground">60 seconds</strong> — no code, no design skills needed.
            Just upload, pick a theme, and share your link.
          </p>

          {/* ★ HOOK 3: Social Proof — avatar stack + count */}
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-400">
            <div className="flex -space-x-2">
              {avatarLetters.map((l) => (
                <div
                  key={l}
                  className="w-7 h-7 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary"
                >
                  {l}
                </div>
              ))}
            </div>
            <span>
              <strong className="text-foreground">2,400+</strong> portfolios created this week
            </span>
          </div>

          {/* CTA Buttons */}
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

          {/* ★ HOOK 4: Micro-copy — hilangkan kekhawatiran user */}
          <p className="text-xs text-muted-foreground animate-in fade-in duration-1000 delay-700">
            🔥 Free plan available &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Live in 60 seconds
          </p>

          {/* ★ HOOK 5: URL Preview — tunjukkan hasil akhir nyata */}
          <div className="flex justify-center animate-in fade-in duration-1000 delay-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/30 text-sm font-mono text-muted-foreground">
              <span className="text-green-500 text-xs">●</span>
              cevio.my.id/d/
              <span className="text-foreground font-semibold">yourname</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      {/* ★ HOOK 6: Process clarity — 3 langkah, sangat konkret */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              From PDF to Portfolio in 3 Steps
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              No forms to fill. No design decisions to agonize over. Just your CV — and a link you'll be proud to share.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-border" />

            {steps.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border bg-card/50 hover:bg-card transition-colors">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 text-[10px] font-mono font-bold text-primary bg-background border border-primary/30 rounded-full w-5 h-5 flex items-center justify-center">
                    {step.replace("0", "")}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      {/* ★ HOOK 7: Final push — repeat benefit, reduce friction */}
      <section className="py-24 px-6 text-center border-t border-border/40">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Stand Out?
          </h2>
          <p className="text-muted-foreground">
            Hundreds of professionals are already sharing their Cevio portfolio links.
            Yours could be live in the next minute.
          </p>
          <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            {["Free to start", "No design skills needed", "Live in 60 seconds"].map((feat) => (
              <li key={feat} className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-primary" />
                {feat}
              </li>
            ))}
          </ul>
          <Button size="lg" className="h-12 px-10 text-base gap-2 group">
            Create My Portfolio Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-muted-foreground">No credit card required</p>
        </div>
      </section>
    </main>
  );
}
