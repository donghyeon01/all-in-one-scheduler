import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import axios from "axios";

export default function LogoutButton() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      // 1. 백엔드 /api/auth/logout 호출 → httpOnly 쿠키(refreshToken) 서버에서 삭제
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.warn("로그아웃 API 호출 실패 (무시됨):", error);
    } finally {
      // 2. 전역 메모리 상태(accessToken) 초기화
      logout();
      // 3. 랜딩 페이지로 이동
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        rounded-xl
        bg-white
        px-4
        py-2
        text-sm
        font-semibold
        shadow-sm
        hover:shadow-md
        transition
        hover:bg-accent
        cursor-pointer
      ">
      로그아웃
    </button>
  );
}

