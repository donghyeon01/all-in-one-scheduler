import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 토큰이 없거나 인증 플래그가 false인 경우 로그인으로 튕겨냄
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
