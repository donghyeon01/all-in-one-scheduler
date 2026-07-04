import { Link } from "react-router-dom";

// export default function LandingHeader() {
//   return (
//     <header className="sticky top-0 left-0 right-0 z-10 flex justify-between h-[72px] items-center bg-primary-light text-primary-foreground px-5">
//       {/* 로고 */}
//       <div>
//         <Link className="flex" to="/">
//           <img
//             alt="Soso"
//             src="/img/Logo-word.png"
//             className="w-auto object-cover h-10 "
//           />
//           <img
//             alt="Soso"
//             src="/img/Logo-pic.png"
//             className="w-auto object-cover h-10 "
//           />
//         </Link>
//       </div>
//       {/* nav 바 */}
//       <nav></nav>
//       {/* 유저 메뉴 */}
//       <div className="flex gap-3 text-primary-foreground font-semibold">
//         <Link
//           to="/login"
//           className="p-2 rounded-lg transition-all duration-300 hover:bg-primary">
//           로그인
//         </Link>
//         <Link
//           to="/sginup"
//           className="p-2 rounded-lg transition-all duration-300 hover:bg-primary">
//           회원가입
//         </Link>
//       </div>
//     </header>
//   );
// }

export default function LandingHeader() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex justify-between h-[76px] items-center bg-background border-b-2 border-border px-6">
      {/* 로고 */}
      <div>
        <Link
          className="flex items-center gap-2 font-black text-xl text-text"
          to="/">
          <span className="text-2xl">🐱</span>
          <span className="tracking-tight">SOSO</span>
        </Link>
      </div>

      {/* 유저 메뉴 */}
      <div className="flex gap-3 text-text font-bold">
        <Link
          to="/login"
          className="px-4 py-2 rounded-full border-2 border-transparent hover:border-primary-dark transition-all duration-200">
          로그인
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground 
          border-2 border-secondary-foreground  shadow-[1.5px_1.5px_0px_0px]
          hover:translate-y-[-2px] transition-all duration-200">
          회원가입
        </Link>
      </div>
    </header>
  );
}
