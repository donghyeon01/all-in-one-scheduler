import CalendarMockup from "./CalendarMockup";
import Button from "@/shared/components/button/Button";

export default function HeroSection() {
  return (
    <section className="bg-surface-muted py-20 border-b-2 border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-text">
              All-in-one Scheduling Service
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl font-black text-text leading-tight">
              모두의 시간을 <br />
              <span className="text-accent">쉽고 빠르게</span> <br />
              맞추는 방법!
            </h1>

            <p className="mt-6 text-lg font-medium text-text-secondary max-w-md mx-auto lg:mx-0">
              복잡한 약속 잡기 스트레스는 이제 그만!
              <br />
              SOSO가 척척 찾아줄게요.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start gap-4">
              <Button variant="brutal" size="lg" to="/signup">
                무료로 시작하기
              </Button>
              <Button variant="ghost" size="lg" to="/login">
                로그인
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <CalendarMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
