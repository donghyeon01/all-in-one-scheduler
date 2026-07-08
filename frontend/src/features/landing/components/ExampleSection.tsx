import { ResultCard } from "@/shared/components/card/ResultCard";

const results = [
  {
    percent: "100",
    start: "",
    end: "",
    max: "",
    can: "",
  },
  {
    percent: "100",
    start: "",
    end: "",
    max: "",
    can: "",
  },
  {
    percent: "100",
    start: "",
    end: "",
    max: "",
    can: "",
  },
];

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
      </div>
    </section>
  );
}
export default function ExampleSection() {
  return (
    <section className="bg-background py-20 border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-primary/30 px-4 py-2 text-2xl border-2 font-semibold text-slate-700">
            Smart Scheduling
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-black text-text">
            찰떡같은 최적 시간 자동 추천 ⏰
          </h2>
          <p className="mt-4 font-medium text-text-gray">
            모두의 캘린더 빈틈을 송송 찾아내서 가장 예쁜 약속 시간을 골라줘요.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {results.map((_, index) => (
            <ResultCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
