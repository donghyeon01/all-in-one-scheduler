import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="
        rounded-xl
        border
        border-border
        px-4
        py-2
        transition
        hover:bg-red-50
      ">
      로그아웃
    </button>
  );
}
