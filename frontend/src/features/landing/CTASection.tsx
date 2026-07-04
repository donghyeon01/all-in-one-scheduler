import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="
            rounded-[32px]
            bg-primary
            px-8
            py-20
            text-center
          ">
          <h2 className="text-4xl font-bold text-slate-800">
            이제 일정 조율에 시간을 낭비하지 마세요
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700">
            친구들과 약속을 잡거나 팀 프로젝트 회의를 정할 때, SOSO가 가장
            적합한 시간을 자동으로 찾아드립니다.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="
                rounded-xl
                bg-white
                px-8
                py-4
                font-semibold
                shadow
                transition-all
                hover:scale-105
                ease-in-out
                duration-200
              ">
              무료로 시작하기
            </Link>

            <Link
              to="/login"
              className="
                rounded-xl
                border-2
                border-white
                px-8
                py-4
                font-semibold
                text-slate-800
                transition-all
                hover:bg-white
                hover:scale-105
                ease-in-out
                duration-200
                
              ">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
