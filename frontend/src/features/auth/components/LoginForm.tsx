import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import { authApi } from "../api/authApi";

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
      const response = await authApi.login({ email, password });
      login(response.accessToken);

      const me = await authApi.getMe();
      setUser(me);

      if (onClose) onClose();
      navigate("/todo");
    } catch (error: any) {
      console.error("로그인 실패:", error);
      const message = error?.response?.data?.message || "이메일 또는 비밀번호가 올바르지 않습니다.";
      alert(message);
    }
  };

  return (
    <main>
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
