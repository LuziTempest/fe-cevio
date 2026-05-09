"use client";

import { Wix_Madefor_Text } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TextAlignJustify } from "lucide-react";
import Image from "next/image";
import { PortfolioData } from "@/types/portfolio";

const wixMadeforText = Wix_Madefor_Text({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const NavLinks = ({
  className,
  onClick,
  setPage,
}: {
  className?: string;
  onClick?: () => void;
  setPage: (page: string) => void;
}) => (
  <div className={className}>
    <Link
      href="#"
      className="text-2xl text-[#FEFEEA] font-bold"
      onClick={() => {
        setPage("about");
        onClick?.();
      }}
    >
      About Me
    </Link>
    <Link
      href="#"
      className="text-2xl text-[#FEFEEA] font-bold"
      onClick={() => {
        setPage("experience");
        onClick?.();
      }}
    >
      Experience
    </Link>
    <Link
      href="#"
      className="text-2xl text-[#FEFEEA] font-bold"
      onClick={() => {
        setPage("skills");
        onClick?.();
      }}
    >
      Skills
    </Link>
  </div>
);

export default function CreativeTheme({ data }: { data: PortfolioData }) {
  const [page, setPage] = useState("about");

  return (
    <div className={`w-full bg-[#1F1F1F] min-h-screen ${wixMadeforText.className}`}>
      <nav className="w-full bg-[#1F1F1F] flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <h1 className="text-[#FEFEEA] md:text-2xl font-bold">{data.name}</h1>
          <p className="text-[#FEFEEA] md:text-2xl font-bold">[{data.role}]</p>
        </div>

        {/* Desktop Navigation */}
        <NavLinks
          setPage={setPage}
          className="hidden md:flex items-center justify-start gap-8"
        />
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#FEFEEA]">
                <TextAlignJustify className="text-[#FEFEEA] w-56 h-56" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#1F1F1F] border-l-[#FEFEEA]/20 px-8 w-full sm:w-75 **:data-[slot=sheet-close]:text-[#FEFEEA] **:data-[slot=sheet-close]:opacity-100"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="text-[#FEFEEA] text-xl font-bold">
                  {/*Navigation Menu*/}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  {/*Select a section to navigate to.*/}
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <SheetClose asChild>
                  <Link
                    href="#"
                    className="text-3xl text-[#FEFEEA] font-bold"
                    onClick={() => setPage("about")}
                  >
                    About Me
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="#"
                    className="text-3xl text-[#FEFEEA] font-bold"
                    onClick={() => setPage("experience")}
                  >
                    Experience
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="#"
                    className="text-3xl text-[#FEFEEA] font-bold"
                    onClick={() => setPage("skills")}
                  >
                    Skills
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <div>
        {page === "about" && <AboutMe data={data} setPage={setPage} />}
        {page === "experience" && <Experience data={data} />}
        {page === "skills" && <Skills data={data} />}
      </div>
    </div>
  );
}

function AboutMe({ data, setPage }: { data: PortfolioData; setPage: (p: string) => void }) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-[#B7AAFC] w-full md:w-1/2 p-4 md:p-8">
        <h2 className="text-5xl md:text-8xl text-[#1F1F1F] font-bold pt-10 md:pt-32 pb-6 md:pb-10">
          About Me
        </h2>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
          <div className="rounded-lg overflow-hidden w-full sm:w-1/2 md:w-full lg:w-1/2 relative aspect-3/4 border-lg border-muted-foreground">
            <Image
              src={data.profileImage || "https://images.unsplash.com/photo-1773332611550-9f5a465b4e42?q=80&w=1470&auto=format&fit=crop"}
              alt={data.name}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-2xl md:text-4xl text-[#1F1F1F] sm:pl-4 md:pl-0 lg:pl-4 font-bold">
              {data.name}
            </p>
            <p className="text-xl md:text-2xl text-[#1F1F1F] sm:pl-4 md:pl-0 lg:pl-4 pb-4 font-bold">
              {data.role}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <p className="text-2xl md:text-5xl text-[#FEFEEA] leading-tight">
          {data.profile}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            className="text-lg md:text-xl p-6 md:p-8 rounded-full bg-[#AC9E33] font-bold"
            onClick={() => setPage("experience")}
          >
            Experience
          </Button>
          <Button
            className="text-lg md:text-xl p-6 md:p-8 rounded-full bg-[#AC9E33] font-bold"
            onClick={() => setPage("skills")}
          >
            Skills
          </Button>
        </div>
      </div>
    </div>
  );
}

function Experience({ data }: { data: PortfolioData }) {
  return (
    <div className="p-6 md:p-16 text-[#FEFEEA] mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-baseline gap-8 mb-16">
        <h2 className="text-7xl md:text-9xl font-bold tracking-tight">Resume</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Experience Column */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#AC9E33]" />
            <h3 className="text-4xl font-bold">Experience</h3>
          </div>

          <div className="space-y-16">
            {data.experience.map((exp, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-xl font-bold mb-4">{exp.duration}</p>
                <div className="bg-[#B7AAFC] text-[#1F1F1F] p-6 mb-6">
                  <div className="border-b border-dashed border-[#1F1F1F]/40 pb-2 mb-2">
                    <p className="text-xl font-bold uppercase">{exp.position}</p>
                  </div>
                  <div className="border-b border-dashed border-[#1F1F1F]/40 pb-2 mb-2">
                    <p className="text-lg">{exp.company}</p>
                  </div>
                </div>
                <p className="text-lg opacity-90 leading-relaxed">
                  {exp.description.join(" ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#AC9E33]" />
            <h3 className="text-4xl font-bold">Education</h3>
          </div>

          <div className="space-y-16">
            {data.education.map((edu, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-xl font-bold mb-4">{edu.duration}</p>
                <div className="bg-[#B7AAFC] text-[#1F1F1F] p-6 mb-6">
                  <div className="border-b border-dashed border-[#1F1F1F]/40 pb-2 mb-2">
                    <p className="text-xl font-bold uppercase">{edu.degree}</p>
                  </div>
                  <div className="border-b border-dashed border-[#1F1F1F]/40 pb-2 mb-2">
                    <p className="text-lg">{edu.institution}</p>
                  </div>
                </div>
                <p className="text-lg opacity-90 leading-relaxed">
                  Studied {edu.degree} at {edu.institution}. This program provided a comprehensive foundation in computer science and engineering principles.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Skills({ data }: { data: PortfolioData }) {
  return (
    <div className="p-6 md:p-16 text-[#FEFEEA] mx-auto min-h-[calc(100vh-100px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Skills Section */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#B7AAFC]" />
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full border-2 border-[#AC9E33] text-[#AC9E33] text-xl font-bold hover:bg-[#AC9E33] hover:text-[#1F1F1F] transition-colors cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#AC9E33]" />
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Languages</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full bg-[#B7AAFC] text-[#1F1F1F] text-xl font-bold hover:bg-[#B7AAFC]/80 transition-colors cursor-default"
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
