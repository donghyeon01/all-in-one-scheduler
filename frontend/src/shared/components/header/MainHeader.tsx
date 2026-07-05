import { Link } from "react-router-dom";

export default function MainHeader() {
  return (
    <header
      className="
    sticky top-0 z-50 flex justify-between h-[76px] items-center 
    bg-background backdrop-blur-md border-b border-border px-6">
      <div
        className="
        mx-auto
        flex
        h-20
        w-full
        items-center
        justify-between
        px-8
      ">
        <Link
          to="/todo"
          className="
          text-2xl
          font-black
          text-accent-purple
        ">
          SOSO
        </Link>

        <nav className="flex items-center gap-6 ">
          <Link
            to="/todo"
            className="font-bold text-text-gray hover:text-text transition">
            Todo
          </Link>

          <Link
            to="/calendar"
            className="font-bold text-text-gray hover:text-text transition">
            Calendar
          </Link>

          <Link
            to="/friends"
            className="font-bold text-text-gray hover:text-text transition">
            Friends
          </Link>

          <Link
            to="/scheduling"
            className="font-bold text-text-gray hover:text-text transition">
            Scheduling
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-primary
            font-bold
          ">
            동현
          </div>

          <button
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
          ">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
