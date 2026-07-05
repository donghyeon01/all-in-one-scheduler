import axiosInstance from "./axios";

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

export const authApi = {
  login: async (
    data: LoginRequest
  ): Promise<LoginResponse> => {
    const response = await axiosInstance.post(
      "/api/auth/login",
      data
    );

    return response.data;
  },

  signup: async (
    data: SignupRequest
  ) => {
    const response = await axiosInstance.post(
      "/api/auth/signup",
      data
    );

    return response.data;
  },
};