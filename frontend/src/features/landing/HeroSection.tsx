import { Link } from "react-router-dom";
import CalendarMockup from "./CalendarMokup";
// export default function HeroSections() {
export function HeroSections() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-primary-soft px-4 py-2">
              🚀 All-in-One Scheduling Service
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              모두의 시간을
              <br />
              가장 쉽게 맞추는 방법
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              친구, 스터디, 프로젝트 팀원과 복잡한 일정 조율을 자동으로
              해결하세요.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/signup"
                className="shadow rounded-xl bg-primary-light px-6 py-3 font-semibold hover:bg-primary-dark hover:text-white hover:scale-105 duration-200">
                무료로 시작하기
              </Link>

              <Link
                to="/login"
                className="shadow rounded-xl border-2 border-primary-dark px-6 py-3 hover:bg-primary-dark hover:font-semibold hover:text-white hover:scale-105 duration-200">
                로그인
              </Link>
            </div>
          </div>

          <CalendarMockup />
        </div>
      </div>
    </section>
  );
}

export default function HeroSection() {
  return (
    <section className="bg-primary-bg py-20 border-b-2 border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-accent-foreground ">
              All-in-one Scheduling Service
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl font-black text-text leading-tight">
              모두의 시간을 <br />
              <span className="text-accent-purple ">가장 쉽고 빠르게</span>{" "}
              <br />
              맞추는 방법!
            </h1>

            <p className="mt-6 text-lg font-medium text-text-gray max-w-md mx-auto lg:mx-0">
              {/* 친구, 스터디, 프로젝트 팀원과  */}
              복잡한 약속 잡기 스트레스는 이제 그만!
              <br />
              SOSO가 척척 찾아줄게요.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start gap-4">
              <Link
                to="/signup"
                className="rounded-2xl bg-accent-purple px-6 py-4 font-extrabold text-white border-2 border-text shadow-[2px_2px_0px_0px_#1e2538] hover:translate-y-[-2px] transition-all duration-200 hover:scale-105">
                무료로 시작하기
              </Link>

              <Link
                to="/login"
                className="rounded-2xl bg-white px-6 py-4 font-extrabold text-text border-2 border-text shadow-[2px_2px_0px_0px_#1e2538] hover:translate-y-[-2px] transition-all duration-200 hover:scale-105">
                로그인
              </Link>
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
