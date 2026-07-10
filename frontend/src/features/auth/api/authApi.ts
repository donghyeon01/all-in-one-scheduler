import axiosInstance from "@/shared/api/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post("/api/auth/login", data);

    return response.data;
  },

  signup: async (data: SignupRequest) => {
    const response = await axiosInstance.post("/api/auth/signup", data);

    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await axiosInstance.get("/api/users/me");
    return response.data;
  },
};

