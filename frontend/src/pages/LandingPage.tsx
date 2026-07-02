import HeroSection from "@/features/landing/HeroSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero */}
        <HeroSection />

        {/* 문제 공감 */}
        {/* <ProblemSection /> */}

        {/* 핵심 기능 */}
        {/* <FeatureSection /> */}

        {/* 서비스 동작 방식 */}
        {/* <ProcessSection /> */}

        {/* 추천 일정 예시 */}
        {/* <ExampleSection /> */}

        {/* 회원가입 유도 */}
        {/* <CTASection /> */}
      </main>
    </div>
  );
}
