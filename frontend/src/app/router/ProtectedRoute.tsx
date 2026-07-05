import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/app/store/authStore";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((state) => state.accessToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
