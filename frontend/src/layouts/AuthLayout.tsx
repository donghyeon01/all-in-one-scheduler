import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "@/shared/components/footer/Footer";
import LandingHeader from "../shared/components/header/LandingHeader";
import Modal from "@/shared/components/modal/Modal";
import LoginForm from "@/features/auth/LoginForm";
import SignupForm from "@/features/auth/SignupForm"; // 회원가입 폼 추가

export const AuthLayout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // 모달 제어 함수들
  const openLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const openSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };
  const closeAll = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 헤더에 로그인/회원가입 트리거 전달 */}
      <LandingHeader onLoginClick={openLogin} onSignupClick={openSignup} />

      <div className="flex flex-1 flex-col w-full">
        {/* 하위 페이지에서 사용할 수 있도록 context 전달 */}
        <Outlet context={{ openLogin, openSignup }} />
      </div>

      <Footer />

      {/* 로그인 모달 */}
      <Modal isOpen={isLoginModalOpen} onClose={closeAll}>
        <LoginForm
          onClose={closeAll}
          onSwitchToSignup={openSignup} // 회원가입으로 전환 기능
        />
      </Modal>

      {/* 회원가입 모달 */}
      <Modal isOpen={isSignupModalOpen} onClose={closeAll}>
        <SignupForm
          onClose={closeAll}
          onSwitchToLogin={openLogin} // 로그인으로 전환 기능
        />
      </Modal>
    </div>
  );
};
