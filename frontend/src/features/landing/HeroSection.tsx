import { Link } from "react-router-dom";

export default function HeroSection() {
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
                className="rounded-xl bg-primary-light px-6 py-3 font-semibold hover:bg-primary border-primary-dark  hover:border-2">
                무료로 시작하기
              </Link>

              <Link
                to="/sigin"
                className="rounded-xl border-2 border-primary-dark px-6 py-3 hover:bg-primary hover:font-semibold">
                로그인
              </Link>
            </div>
          </div>

          <div>캘린더 Mockup</div>
        </div>
      </div>
    </section>
  );
}
