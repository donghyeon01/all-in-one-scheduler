import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import axios from "axios";
import { authApi } from "@/features/auth/api/authApi";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const setUser = useAuthStore((state) => state.setUser);

  const [isRestoring, setIsRestoring] = useState(!token);

  useEffect(() => {
    const restoreSession = async () => {
      if (token) {
        setIsRestoring(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = response.data.accessToken;
        login(newAccessToken);

        const me = await authApi.getMe();
        setUser(me);
      } catch (err) {
        console.warn("세션 복구 실패:", err);
      } finally {
        setIsRestoring(false);
      }
    };

    restoreSession();
  }, [token, login, setUser]);

  if (isRestoring) {
    return (
      <div className="flex h-screen items-center justify-center font-semibold text-muted-foreground bg-background">
        로그인 상태 확인 중...
      </div>
    );
  }

  // 토큰이 없거나 인증 플래그가 false인 경우 랜딩 페이지("/")로 이동
  if (!token || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

