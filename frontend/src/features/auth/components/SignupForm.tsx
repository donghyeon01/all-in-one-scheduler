import React, { useState } from "react";
import axios from "axios";
import { authApi } from "@/features/auth/api/authApi";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/button/Button";

interface SignupFormProps {
  onClose?: () => void; // 회원가입 완료 시 모달을 닫기 위한 함수
  onSwitchToLogin?: () => void; // '로그인' 링크 클릭 시 로그인 모달로 전환하기 위한 함수
}

export default function SignupForm({
  onClose,
  onSwitchToLogin,
}: SignupFormProps): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await authApi.signup({ name, email, password });
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      if (onSwitchToLogin) onSwitchToLogin();
      else if (onClose) onClose();
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message
        : undefined;
      alert(message ?? "회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main>
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-black text-accent">SOSO</h1>
          <p className="mt-2 text-text-muted">
            회원가입 후 서비스를 이용해보세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            label="이름"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            required
          />

          <Input
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />

          <Input
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Input
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button variant="primary" size="lg" type="submit" className="w-full">
            회원가입
          </Button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-text-muted">이미 계정이 있으신가요?</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin?.();
            }}
            className="ml-2 text-accent font-semibold hover:underline">
            로그인
          </button>
        </div>
      </div>
    </main>
  );
}
