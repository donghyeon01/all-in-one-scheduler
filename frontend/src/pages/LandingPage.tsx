import CTASection from "@/features/landing/components/CTASection";
import ExampleSection from "@/features/landing/components/ExampleSection";
import FeatureSection from "@/features/landing/components/FeatureSection";
import HeroSection from "@/features/landing/components/HeroSection";
import ProblemSection from "@/features/landing/components/ProblemSection";
import ProcessSection from "@/features/landing/components/ProcessSection";
import { useOutletContext } from "react-router-dom";

// Context 받기위한 타입 정의
interface AuthContextType {
  openLogin: () => void;
  openSignup: () => void;
}

export default function LandingPage() {
  const { openLogin, openSignup } = useOutletContext<AuthContextType>();
  return (
    <div className="">
      <main>
        {/* Hero */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* 문제 공감 */}
        <div id="problem">
          <ProblemSection />
        </div>

        {/* 핵심 기능 */}
        <div id="feature">
          <FeatureSection />
        </div>

        {/* 서비스 동작 방식 */}
        <div id="process">
          <ProcessSection />
        </div>

        {/* 추천 일정 예시 */}
        <div id="example">
          <ExampleSection />
        </div>

        {/* 회원가입 유도 */}
        <div id="cta">
          {/* CTA 섹션에 트리거 함수들 전달 */}
          <CTASection onLoginClick={openLogin} onSignupClick={openSignup} />
        </div>
      </main>
    </div>
  );
}
