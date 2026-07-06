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
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-[36px] bg-primary border-4 border-text px-8 py-16 text-center shadow-[8px_8px_0px_0px_#7b61ff]">
          <span className="text-4xl">🎉</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-text">
            이제 일정 조율에 시간을 낭비하지 마세요
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-medium text-primary-foreground/90 leading-relaxed">
            친구들과 약속을 잡거나 팀 프로젝트 회의를 정할 때, SOSO가 가장
            적합한 시간을 자동으로 찾아드립니다. 무료로 바로 쓸 수 있어요!
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={onSignupClick}
              className="rounded-2xl bg-white px-8 py-4 font-black text-text border-2 border-text shadow-[4px_4px_0px_0px_#1e2538] hover:translate-y-[-2px] transition-all duration-200">
              3초만에 가입하기
            </button>

            <button
              onClick={onLoginClick}
              className="rounded-2xl bg-secondary px-8 py-4 font-black text-secondary-foreground border-2 border-text shadow-[4px_4px_0px_0px_#1e2538] hover:bg-opacity-90 hover:translate-y-[-2px] transition-all duration-200">
              로그인하러 가기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
