import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface LoginFormProps {
  onClose?: () => void; // 모달 내부에서 페이지 이동 시 모달을 닫아주기 위한 프롭스
  onSwitchToSignup?: () => void; // [추가] '회원가입' 링크 클릭 시 회원가입 모달로 전환하기 위한 함수
}

export default function LoginForm({
  onClose,
  onSwitchToSignup,
}: LoginFormProps): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 스토어에서 login 함수와 setUser 함수를 모두 가져옵니다.
  const login = useAuthStore((state) => state.login);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      /* [추후 주석 해제하여 사용할 실제 API 패턴]
      const response = await authApi.login({ email, password });
      login(response.accessToken);
      // API에서 유저 정보를 함께 내려준다면 아래와 같이 연동합니다.
      // setUser(response.user); 
      */

      // 현재: 프론트 시연용 임시 토큰 및 유저 정보 주입
      login("mock-access-token-soso-1234");

      // 로그인한 사람의 이메일 아이디를 기반으로 가상의 유저 정보 생성 및 전역 저장
      setUser({
        id: 1,
        email: email,
        name: email.split("@")[0] || "홍길동", // 이메일 앞자리를 닉네임처럼 사용
      });

      if (onClose) onClose();
      navigate("/todo");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    }
  };

  return (
    <main className="w-full rounded-3xl border border-border bg-white p-8 shadow-md">
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">SOSO</h1>
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
              className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 font-semibold transition hover:opacity-90">
            로그인
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-muted-foreground">계정이 없으신가요?</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onSwitchToSignup?.();
            }}
            className="ml-2 font-semibold hover:underline">
            회원가입
          </button>
        </div>
      </div>
    </main>
  );
}
