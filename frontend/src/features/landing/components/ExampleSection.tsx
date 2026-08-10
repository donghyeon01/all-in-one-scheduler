import { ResultCard } from "@/shared/components/card/ResultCard";
import SectionHeader from "@/shared/components/header/SectionHeader";

const results = [
  {
    percent: 100,
    start: "",
    end: "",
    max: "",
    can: "",
  },
  {
    percent: 100,
    start: "",
    end: "",
    max: "",
    can: "",
  },
  {
    percent: 100,
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
        <SectionHeader
          badge="⚡ Smart Scheduling"
          title="가장 적합한 시간을 자동 추천"
          description="여러 사람의 일정을 분석하여 가장 좋은 시간대를 제안합니다."
        />
      </div>
    </section>
  );
}
export default function ExampleSection() {
  return (
    <section className="bg-background py-20 border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="Smart Scheduling"
          title="찰떡같은 최적 시간 자동 추천 ⏰"
          description="모두의 캘린더 빈틈을 송송 찾아내서 가장 예쁜 약속 시간을 골라줘요."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {results.map((_, index) => (
            <ResultCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
