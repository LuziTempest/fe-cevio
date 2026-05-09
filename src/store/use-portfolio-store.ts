import { create } from "zustand";
import { PortfolioContent } from "@/types/portfolio";

interface PortfolioStore {
  generatedData: PortfolioContent | null;
  activeTheme: string;
  setGeneratedData: (data: PortfolioContent | null) => void;
  setActiveTheme: (theme: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  generatedData: null,
  activeTheme: "professional",
  setGeneratedData: (data) => set({ generatedData: data }),
  setActiveTheme: (theme) => set({ activeTheme: theme }),
}));
