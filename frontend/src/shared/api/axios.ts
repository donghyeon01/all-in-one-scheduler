import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
// axios 요청 전에 실행됨 (Token 저장 및 헤더에 자동 주입)
axiosInstance.interceptors.request.use(
  (config) => {
    // zustand 사용하여 토큰 저장
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
// api 값 받아온 후 401 에러 처리(토큰 만료 및 잘못된 토큰)
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
