"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { PortfolioData } from "@/types/portfolio";

export default function MinimalTheme({ data }: { data: PortfolioData }) {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mainRef.current, {
        opacity: 0,
        y: 10,
        duration: 1.2,
        ease: "power2.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main
        ref={mainRef}
        className="max-w-2xl mx-auto px-6 py-24 space-y-16 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-100 dark:selection:bg-zinc-800"
      >
        {/* Hero Section */}
        <header className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">{data.role}</p>
          </div>

            <div className="relative w-20 h-20 rounded-full overflow-hidden grayscale contrast-125">
              <Image
                src={data.profileImage || "https://images.unsplash.com/photo-1773332611550-9f5a465b4e42?q=80&w=1470&auto=format&fit=crop"}
                alt={data.name}
                fill
                className="object-cover"
              />
            </div>

        </header>

        {/* About Section */}
        {data.profile && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">About</h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              {data.profile}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Experience</h2>
            <div className="space-y-10">
              {data.experience.map((exp, i) => (
                <div key={i} className="group space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-medium text-base group-hover:text-zinc-500 transition-colors">{exp.position}</h3>
                    <span className="text-xs text-zinc-400 tabular-nums">{exp.duration}</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-500">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((desc, j) => (
                      <li key={j} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-medium text-sm">{edu.degree}</h3>
                    <p className="text-sm text-zinc-500">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-zinc-400 tabular-nums">{edu.duration}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Languages */}
        <div className="grid sm:grid-cols-2 gap-12">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Skills</h2>
              <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {data.skills.map((skill, i) => (
                  <span key={i}>
                    {skill}{i !== data.skills.length - 1 && <span className="ml-3 text-zinc-300 dark:text-zinc-700">/</span>}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Languages</h2>
              <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {data.languages.map((lang, i) => (
                  <span key={i}>
                    {lang}{i !== data.languages.length - 1 && <span className="ml-3 text-zinc-300 dark:text-zinc-700">/</span>}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className="pt-24 pb-12 text-[10px] uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-800 text-center">
          &copy; {new Date().getFullYear()} {data.name}
        </footer>
      </main>
    </div>
  );
}
