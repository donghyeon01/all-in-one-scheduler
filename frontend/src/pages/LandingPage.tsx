import CTASection from "@/features/landing/CTASection";
import ExampleSection from "@/features/landing/ExampleSection";
import FeatureSection from "@/features/landing/FeatureSection";
import HeroSection from "@/features/landing/HeroSection";
import ProblemSection from "@/features/landing/ProblemSection";
import ProcessSection from "@/features/landing/ProcessSection";

export default function LandingPage() {
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
          <CTASection />
        </div>
      </main>
    </div>
  );
}
