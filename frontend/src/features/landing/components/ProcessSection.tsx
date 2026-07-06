import Card from "@/shared/components/card/Card";
import { Users, CalendarDays, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "친구 선택",
    description: "일정을 함께 조율할 친구나 팀원을 선택합니다.",
  },
  {
    icon: CalendarDays,
    title: "기간 선택",
    description: "약속을 잡고 싶은 날짜 범위를 지정합니다.",
  },
  {
    icon: Sparkles,
    title: "추천 시간 확인",
    description: "SOSO가 참여 인원들이 가능한 시간을 계산합니다.",
  },
  {
    icon: CheckCircle,
    title: "일정 확정",
    description: "참여자가 승인하면 일정이 자동 생성됩니다.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-white py-20 border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-primary/30 px-4 py-2 text-2xl border-2 font-semibold text-slate-700">
            ⚙️ How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold">단 4단계로 일정 확정</h2>

          <p className="mt-4 text-muted-foreground">
            복잡한 일정 조율을 몇 분 안에 끝내보세요.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              variant="landing" // variant 추가!
              index={index} // 기존 인덱스 그대로 전달
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
