import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");

      return;
    }

    console.log({
      name,
      email,
      password,
    });

    // TODO:
    // signup API 호출
  };

  return (
    <main
      className="
      w-full
      max-w-md
      rounded-3xl
      border
      border-border
      bg-white
      p-8
      shadow-sm
    "
    >
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            SOSO
          </h1>

          <p className="mt-2 text-muted-foreground">
            회원가입 후 서비스를 이용해보세요.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              이름
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="홍길동"
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
            <label className="mb-2 block text-sm font-medium">
              이메일
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
            <label className="mb-2 block text-sm font-medium">
              비밀번호
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
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

          <div>
            <label className="mb-2 block text-sm font-medium">
              비밀번호 확인
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
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
          "
          >
            회원가입
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-muted-foreground">
            이미 계정이 있으신가요?
          </span>

          <Link
            to="/login"
            className="ml-2 font-semibold"
          >
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
}