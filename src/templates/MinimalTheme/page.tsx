import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, GraduationCap, Languages, Menu, UserStar, Wrench } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dummyData } from "@/data/dummy"
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});


export default function SandboxPage() {
  return (
    <div className={`min-h-screen w-full bg-gray-50 dark:bg-zinc-900 p-4 ${poppins.className}`}>
      {/* Navbar */}
      <nav className="max-w-5xl drop-shadow-xl bg-white dark:bg-zinc-800 mx-auto flex items-center justify-between px-4 py-4 md:py-6 sticky top-4 rounded-lg z-50">
        <div className="flex">
          <Link href="/" className="text-zinc-950 dark:text-white px-2 font-bold text-xl">
            Cevio
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <Link href="#home" className="text-zinc-950 dark:text-white font-medium hover:text-zinc-950 transition-colors">Home</Link>
          <Link href="#profile" className="text-muted-foreground dark:text-white font-medium hover:text-zinc-950 transition-colors">Profile</Link>
          <Link href="#experience" className="text-muted-foreground dark:text-white font-medium hover:text-zinc-950 transition-colors">Experience</Link>
          <Link href="#education" className="text-muted-foreground dark:text-white font-medium hover:text-zinc-950 transition-colors">Education</Link>
          <Link href="#skills" className="text-muted-foreground dark:text-white font-medium hover:text-zinc-950 transition-colors">Skills</Link>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <div className={`flex rounded-2xl dark:bg-zinc-800 ${poppins.className}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-lg">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-4 rounded-lg">
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full cursor-pointer">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full cursor-pointer">Experience</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full cursor-pointer">Education</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full cursor-pointer">Skills</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto">
        {/* Home */}
        <div id="home" className="my-32 text-center">
          <h1 className="text-6xl font-bold dark:text-white py-8">{dummyData.name}</h1>
          <p className="text-lg text-muted-foreground pb-8">{dummyData.role}</p>
          {/*<div className="flex gap-4 justify-center">
            <Button className="p-6 rounded-lg text-base bg-zinc-900 dark:bg-white">
              <Mail />
              Send Email
            </Button>
            <Button className="p-6 rounded-lg text-base bg-muted-foreground">
              <Download />
              Download CV
            </Button>
          </div>*/}
        </div>
        {/* Profile */}
        <div id="profile" className="w-full flex flex-col md:flex-row gap-4 md:items-stretch my-4">
          <div className="rounded-lg overflow-hidden w-full md:w-1/3 relative drop-shadow-2xl aspect-3/4 border-lg border-muted-foreground">
            <Image
              src={dummyData.profileImage}
              alt={dummyData.name}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:flex-1 bg-white dark:bg-zinc-800 rounded-lg drop-shadow-2xl relative border-lg border-muted-foreground dark:border-zinc-700">
            <div className="p-8 md:absolute md:inset-0 md:overflow-auto">
              <div className="mb-8 rounded-lg">
                <UserStar className="w-20 h-20 text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-700 rounded-lg p-4" />
              </div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white text-zinc-800">Profile</h2>
              <p className="text-lg text-muted-foreground dark:text-zinc-400 font-medium">{dummyData.profile}</p>
            </div>
          </div>
        </div>
        {/* Experience */}
        <div id="experience" className="w-full flex flex-col md:flex-row gap-8 md:items-stretch my-4">
          <div className="w-full md:flex-1 bg-white dark:bg-zinc-800 rounded-lg drop-shadow-2xl relative border-lg border-muted-foreground dark:border-zinc-700">
            <div className="p-8">
              <div className="mb-8 rounded-lg">
                <Briefcase className="w-20 h-20 text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-700 rounded-lg p-4" />
              </div>
              <h2 className="text-2xl font-bold mb-8 dark:text-white text-zinc-800">Experience</h2>
              <div className="flex flex-col">
                {dummyData.experience.map((exp, index) => (
                  <div key={index} className="flex gap-6">
                    {/* Timeline Column */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-4 h-4 bg-zinc-950 dark:bg-white rounded-full z-10 mt-1.5" />
                      {index !== dummyData.experience.length - 1 && (
                        <div className="w-0.5 grow bg-zinc-100 dark:bg-zinc-700 mt-2 mb-2" />
                      )}
                    </div>

                    {/* Content Column */}
                    <div className="pb-12 last:pb-0 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                        <h3 className="text-xl font-bold dark:text-zinc-100 text-zinc-800">{exp.position}</h3>
                        <span className="text-sm font-semibold text-muted-foreground dark:text-zinc-400 bg-gray-100 dark:bg-zinc-700 px-3 py-1 rounded-full whitespace-nowrap w-fit">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-zinc-600 dark:text-zinc-400 mb-4">{exp.company}</p>
                      <ul className="space-y-3">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="text-muted-foreground dark:text-zinc-400 flex gap-3 text-[17px] leading-relaxed">
                            <span className="shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-600" />
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Education */}
        <div id="education" className="w-full flex flex-col md:flex-row gap-8 md:items-stretch my-4">
          <div className="w-full md:flex-1 bg-white dark:bg-zinc-800 rounded-lg drop-shadow-2xl relative border-lg border-muted-foreground dark:border-zinc-700">
            <div className="p-8">
              <div className="mb-8 rounded-lg">
                <GraduationCap className="w-20 h-20 text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-700 rounded-lg p-4" />
              </div>
              <h2 className="text-2xl font-bold mb-8 dark:text-white text-zinc-800">Education</h2>
              <div className="flex flex-col">
                {dummyData.education.map((edu, index) => (
                  <div key={index} className="flex gap-6">
                    {/* Timeline Column */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-4 h-4 bg-zinc-950 dark:bg-white rounded-full z-10 mt-1.5" />
                      {index !== dummyData.education.length - 1 && (
                        <div className="w-0.5 grow bg-zinc-100 dark:bg-zinc-700 mt-2 mb-2" />
                      )}
                    </div>

                    {/* Content Column */}
                    <div className="pb-12 last:pb-0 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                        <h3 className="text-xl font-bold dark:text-zinc-100 text-zinc-800">{edu.degree}</h3>
                        <span className="text-sm font-semibold text-muted-foreground dark:text-zinc-400 bg-gray-100 dark:bg-zinc-700 px-3 py-1 rounded-full whitespace-nowrap w-fit">
                          {edu.duration}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-zinc-600 dark:text-zinc-400 mb-4">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {/* Skills */}
          <div id="skills" className="bg-white dark:bg-zinc-800 rounded-lg drop-shadow-2xl border-lg border-muted-foreground dark:border-zinc-700 p-8">
            <div className="mb-8 rounded-lg">
              <Wrench className="w-20 h-20 text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-700 rounded-lg p-4" />
            </div>
            <h2 className="text-2xl font-bold mb-6 dark:text-white text-zinc-800">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {dummyData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div id="languages" className="bg-white dark:bg-zinc-800 rounded-lg drop-shadow-2xl border-lg border-muted-foreground dark:border-zinc-700 p-8">
            <div className="mb-8 rounded-lg">
              <Languages className="w-20 h-20 text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-700 rounded-lg p-4" />
            </div>
            <h2 className="text-2xl font-bold mb-6 dark:text-white text-zinc-800">Languages</h2>
            <div className="flex flex-wrap gap-3">
              {dummyData.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all cursor-default"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
