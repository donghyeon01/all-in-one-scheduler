import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // TODO:
    // login API 호출
  };

  return (
    <main className="min-h-screen bg-background">
      <div
        className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-border
        bg-white
        p-8
        shadow-sm
      ">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Gatherly</h1>

          <p className="mt-2 text-muted-foreground">
            로그인 후 일정을 관리해보세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">이메일</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="
              w-full
              rounded-xl
              border
              border-border
              px-4
              py-3
              outline-none
              focus:border-primary
            "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">비밀번호</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
              w-full
              rounded-xl
              border
              border-border
              px-4
              py-3
              outline-none
              focus:border-primary
            "
            />
          </div>

          <button
            type="submit"
            className="
            w-full
            rounded-xl
            bg-primary
            py-3
            font-semibold
            transition
            hover:opacity-90
          ">
            로그인
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-muted-foreground">계정이 없으신가요?</span>

          <Link to="/signup" className="ml-2 font-semibold">
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}
