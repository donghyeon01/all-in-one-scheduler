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
    const response = await axiosInstance.post("/auth/login", data);

    return response.data;
  },

  signup: async (data: SignupRequest) => {
    const response = await axiosInstance.post("/auth/signup", data);

    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  },
};

