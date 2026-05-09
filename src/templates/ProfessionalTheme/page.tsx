"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Globe, Cpu, User } from "lucide-react";
import Image from "next/image";
import { PortfolioData } from "@/types/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProfessionalTheme({ data }: { data: PortfolioData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Sections Animation
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-primary-foreground">
      {/* Header / Hero Section */}
      <header ref={headerRef} className="relative h-[70vh] flex flex-col items-center justify-center text-center px-4 border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 space-y-6">
          {data.profileImage && (
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-2 border-primary p-1">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={data.profileImage}
                  alt={data.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">{data.name}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-widest uppercase">{data.role}</p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-primary/50" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 space-y-32">
        {/* Profile Section */}
        {data.profile && (
          <section ref={addToRefs} className="space-y-8">
            <div className="flex items-center gap-4">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold uppercase tracking-widest border-b-2 border-primary pb-1">Profile</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground indent-12">
              {data.profile}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section ref={addToRefs} className="space-y-12">
            <div className="flex items-center gap-4">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold uppercase tracking-widest border-b-2 border-primary pb-1">Experience</h2>
            </div>
            <div className="space-y-16 border-l border-border ml-3 pl-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors duration-300" />
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.position}</h3>
                      <span className="text-sm font-medium px-3 py-1 bg-secondary rounded-full border border-border">{exp.duration}</span>
                    </div>
                    <p className="text-primary/80 font-semibold">{exp.company}</p>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="leading-relaxed">{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section ref={addToRefs} className="space-y-12">
            <div className="flex items-center gap-4">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold uppercase tracking-widest border-b-2 border-primary pb-1">Education</h2>
            </div>
            <div className="grid gap-8">
              {data.education.map((edu, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <p className="text-primary">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{edu.duration}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Languages Grid */}
        <div className="grid md:grid-cols-2 gap-20">
          {/* Skills Section */}
          {data.skills && data.skills.length > 0 && (
            <section ref={addToRefs} className="space-y-8">
              <div className="flex items-center gap-4">
                <Cpu className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold uppercase tracking-widest border-b-2 border-primary pb-1">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-secondary border border-border text-sm font-medium hover:border-primary transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {data.languages && data.languages.length > 0 && (
            <section ref={addToRefs} className="space-y-8">
              <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold uppercase tracking-widest border-b-2 border-primary pb-1">Languages</h2>
              </div>
              <ul className="space-y-4">
                {data.languages.map((lang, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{lang}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <footer className="py-12 border-t border-border text-center text-sm text-muted-foreground uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.
      </footer>
    </div>
  );
}
