import Card from "@/shared/components/card/Card";
import SectionHeader from "@/shared/components/header/SectionHeader";
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
    <section className="bg-surface py-20 border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="How It Works"
          title="단 4단계로 일정 확정"
          description="복잡한 일정 조율을 몇 분 안에 끝내보세요."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              variant="brutal"
              index={index}
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
