export function ExampleSections() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-primary/30 px-4 py-2 text-2xl font-semibold text-slate-700">
            ⚡ Smart Scheduling
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            가장 적합한 시간을 자동 추천
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            여러 사람의 일정을 분석하여 가장 좋은 시간대를 제안합니다.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* 추천 1 */}
          <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-sm">
            <div className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium">
              추천도 100%
            </div>

            <h3 className="mt-6 text-2xl font-bold">7월 15일</h3>

            <p className="mt-2 text-lg">오후 7:00 ~ 9:00</p>

            <div className="mt-6 rounded-xl bg-green-50 p-4">
              참여 가능 5 / 5
            </div>
          </div>

          {/* 추천 2 */}
          <div className="rounded-3xl border border-yellow-200 bg-white p-8 shadow-sm">
            <div className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium">
              추천도 90%
            </div>

            <h3 className="mt-6 text-2xl font-bold">7월 16일</h3>

            <p className="mt-2 text-lg">오후 8:00 ~ 10:00</p>

            <div className="mt-6 rounded-xl bg-yellow-50 p-4">
              참여 가능 4 / 5
            </div>
          </div>

          {/* 추천 3 */}
          <div className="rounded-3xl border border-pink-200 bg-white p-8 shadow-sm">
            <div className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-sm font-medium">
              추천도 80%
            </div>

            <h3 className="mt-6 text-2xl font-bold">7월 17일</h3>

            <p className="mt-2 text-lg">오후 6:00 ~ 8:00</p>

            <div className="mt-6 rounded-xl bg-pink-50 p-4">
              참여 가능 4 / 5
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function ExampleSection() {
  return (
    <section className="bg-milk-white py-24 border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/40 px-4 py-1.5 text-sm font-bold text-text border-2 border-text">
            ⚡ 인공지능 매칭 엔진 가동중!
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-black text-text">
            찰떡같은 최적 시간 자동 추천 ⏰
          </h2>
          <p className="mt-4 font-medium text-text-gray">
            모두의 캘린더 빈틈을 송송 찾아내서 가장 예쁜 약속 시간을 골라줘요.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* 추천 1 */}
          <div className="rounded-3xl border-4 border-text bg-white p-6 shadow-[6px_6px_0px_0px_#edf4ff] hover:translate-y-[-4px] transition-all duration-200">
            <div className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-black text-text border border-text">
              ✨ 강추 1순위 (100%)
            </div>
            <h3 className="mt-6 text-2xl font-black text-text">
              7월 15일 (수)
            </h3>
            <p className="mt-1 font-bold text-accent-purple">
              오후 07:00 ~ 09:00
            </p>
            <div className="mt-4 rounded-xl bg-primary-bg border-2 border-dashed border-primary p-3 font-bold text-center text-sm text-text">
              🙌 5명 전원 출석 가능!
            </div>
          </div>

          {/* 추천 2 */}
          <div className="rounded-3xl border-4 border-text bg-white p-6 shadow-[6px_6px_0px_0px_#edf4ff] hover:translate-y-[-4px] transition-all duration-200">
            <div className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-black text-text border border-text">
              👍 보조 2순위 (90%)
            </div>
            <h3 className="mt-6 text-2xl font-black text-text">
              7월 16일 (목)
            </h3>
            <p className="mt-1 font-bold text-text-gray">오후 08:00 ~ 10:00</p>
            <div className="mt-4 rounded-xl bg-muted p-3 font-bold text-center text-sm text-text-gray">
              😢 4명 가능 (지수님 확인 필요)
            </div>
          </div>

          {/* 추천 3 */}
          <div className="rounded-3xl border-4 border-text bg-white p-6 shadow-[6px_6px_0px_0px_#edf4ff] hover:translate-y-[-4px] transition-all duration-200">
            <div className="inline-block rounded-full bg-destructive px-3 py-1 text-xs font-black text-text border border-text">
              그나마 3순위 (80%)
            </div>
            <h3 className="mt-6 text-2xl font-black text-text">
              7월 17일 (금)
            </h3>
            <p className="mt-1 font-bold text-text-gray">오후 06:00 ~ 08:00</p>
            <div className="mt-4 rounded-xl bg-destructive/30 p-3 font-bold text-center text-sm text-text-gray">
              🏃‍♂️ 4명 가능 (민우님 야근 예정)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
