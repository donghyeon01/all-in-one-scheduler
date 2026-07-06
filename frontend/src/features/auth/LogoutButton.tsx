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
            bg-white
            px-4
            py-2
            text-sm
            font-semibold
            shadow-sm
            hover:shadow-md
            transition
            hover:bg-accent
      ">
      로그아웃
    </button>
  );
}
