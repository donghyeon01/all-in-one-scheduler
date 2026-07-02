import { Link } from "react-router-dom";

export default function LandingHeader() {
  return (
    <header className="flex justify-between h-[72px] items-center bg-primary-light text-primary-foreground px-5">
      {/* 로고 */}
      <div>
        <Link to="/">Scheduler</Link>
      </div>
      {/* nav 바 */}
      <nav></nav>
      {/* 유저 메뉴 */}
      <div className="flex gap-3 text-primary-foreground font-semibold">
        <Link
          to="/"
          className="p-2 rounded-lg transition-all duration-300 hover:bg-primary">
          로그인
        </Link>
        <Link
          to="/"
          className="p-2 rounded-lg transition-all duration-300 hover:bg-primary">
          회원가입
        </Link>
      </div>
    </header>
  );
}
