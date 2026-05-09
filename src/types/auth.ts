export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  status: "success" | "error";
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface MeResponse {
  status: "success" | "error";
  message: string;
  data: User;
}

export interface RegisterResponse {
  status: "success" | "error";
  message: string;
  data: User;
}
