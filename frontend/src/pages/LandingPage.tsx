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
        <HeroSection />

        {/* 문제 공감 */}
        <ProblemSection />

        {/* 핵심 기능 */}
        <FeatureSection />

        {/* 서비스 동작 방식 */}
        <ProcessSection />

        {/* 추천 일정 예시 */}
        <ExampleSection />

        {/* 회원가입 유도 */}
        <CTASection />
      </main>
    </div>
  );
}
