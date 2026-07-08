import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";

export default function LogoutButton() {
  const navigate = useNavigate();
  // Zustand 스토어에서 logout 액션 가져오기
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    // 1. 전역 스토어 및 로컬스토리지 토큰 청소
    logout();

    // 2. 추가적으로 지워야 할 토큰 정보가 있다면 처리 후 이동
    localStorage.removeItem("refreshToken");

    // 3. 로그인 페이지로 안전하게 리다이렉트
    navigate("/login");
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
