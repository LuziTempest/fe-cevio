import { api } from "@/lib/axios";
import { RegisterResponse, AuthResponse, MeResponse } from "@/types/auth";

export const authService = {
  register: async (data: any): Promise<RegisterResponse> => {
    const response = await api.post("/api/auth/register", data);
    return response.data;
  },

  login: async (data: any): Promise<AuthResponse> => {
    const response = await api.post("/api/auth/login", data);
    return response.data;
  },

  me: async (): Promise<MeResponse> => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },
};
