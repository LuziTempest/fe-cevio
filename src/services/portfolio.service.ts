import { api } from "@/lib/axios";
import { 
  GeneratePortfolioResponse, 
  SavePortfolioRequest, 
  PortfolioResponse, 
  PortfoliosResponse 
} from "@/types/portfolio";

export const portfolioService = {
  generate: async (formData: FormData): Promise<GeneratePortfolioResponse> => {
    const response = await api.post("/api/portfolios/generate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  save: async (data: SavePortfolioRequest): Promise<PortfolioResponse> => {
    const response = await api.post("/api/portfolios", data);
    return response.data;
  },

  getAll: async (): Promise<PortfoliosResponse> => {
    const response = await api.get("/api/portfolios");
    return response.data;
  },

  getByTitle: async (title: string): Promise<PortfolioResponse> => {
    const response = await api.get(`/api/portfolios/${title}`);
    return response.data;
  },

  uploadPhoto: async (formData: FormData): Promise<{ status: string; data: { foto_url: string }; message: string }> => {
    const response = await api.post("/api/assets/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updatePortfolioPhoto: async (formData: FormData): Promise<{ status: string; data: { foto_url: string }; message: string }> => {
    const response = await api.post("/api/portfolios/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
