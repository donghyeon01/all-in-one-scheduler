import Button from "@/shared/components/button/Button";

// 로그인, 회원가입 모달창 함수를 받기위한 타입정의
interface CTASectionProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export default function CTASection({
  onLoginClick,
  onSignupClick,
}: CTASectionProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl bg-primary border-3 border-border-strong px-8 py-16 text-center shadow-brutal-accent">
          <span className="text-4xl">🎉</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-text">
            이제 일정 조율에 시간을 낭비하지 마세요
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-medium text-text leading-relaxed">
            친구들과 약속을 잡거나 팀 프로젝트 회의를 정할 때, SOSO가 가장
            적합한 시간을 자동으로 찾아드립니다. 무료로 바로 쓸 수 있어요!
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="ghost" size="lg" onClick={onSignupClick}>
              3초만에 가입하기
            </Button>
            <Button variant="brutal" size="lg" onClick={onLoginClick}>
              로그인하러 가기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
