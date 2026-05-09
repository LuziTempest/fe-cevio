"use client";

import React, { use } from "react";
import { usePortfolio } from "@/hooks/use-portfolio";
import MinimalTheme from "@/templates/MinimalTheme/page";
import ProfessionalTheme from "@/templates/ProfessionalTheme/page";
import CreativeTheme from "@/templates/CreativeTheme/page";
import { Loader2 } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

export default function PublicPortfolioPage({ params }: { params: Promise<{ title: string }> }) {
  const { title } = use(params);
  const { usePortfolioByTitle } = usePortfolio();
  const { data: portfolio, isLoading, isError } = usePortfolioByTitle(title);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !portfolio) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">Portfolio not found</p>
      </div>
    );
  }

  // Transform backend data to frontend template format
  const transformedData: PortfolioData = {
    name: portfolio.data.profil.nama,
    role: portfolio.data.pengalaman_kerja?.[0]?.posisi || "Professional",
    profileImage: portfolio.foto ? `${process.env.NEXT_PUBLIC_API_URL}${portfolio.foto}` : "",
    profile: portfolio.data.profil.deskripsi_diri,
    experience: portfolio.data.pengalaman_kerja.map(exp => ({
      position: exp.posisi,
      company: exp.perusahaan,
      duration: exp.durasi,
      description: exp.deskripsi
    })),
    education: portfolio.data.pendidikan.map(edu => ({
      degree: edu.jurusan,
      institution: edu.institusi,
      duration: edu.tahun
    })),
    skills: portfolio.data.keahlian,
    languages: [] // Fallback
  };

  const activeTheme = portfolio.theme;

  return (
    <>
      {activeTheme === "minimalist" && <MinimalTheme data={transformedData} />}
      {activeTheme === "professional" && <ProfessionalTheme data={transformedData} />}
      {activeTheme === "creative" && <CreativeTheme data={transformedData} />}
      {/* Fallback to professional if theme doesn't match */}
      {!["minimalist", "professional", "creative"].includes(activeTheme) && (
        <ProfessionalTheme data={transformedData} />
      )}
    </>
  );
}
