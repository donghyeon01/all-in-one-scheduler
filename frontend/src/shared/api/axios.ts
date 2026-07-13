import axios from "axios";
import { useAuthStore } from "@/app/store/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token ?? "");
    }
  });
  failedQueue = [];
};

const attachToken = (config: any, token: string) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token && config.headers) {
      return attachToken(config, token);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url &&
      !originalRequest.url.includes("/api/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest._retry = true;
            return axiosInstance(attachToken(originalRequest, token));
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = response.data.accessToken;
        useAuthStore.getState().login(newAccessToken);

        processQueue(null, newAccessToken);
        return axiosInstance(attachToken(originalRequest, newAccessToken));
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();

        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
