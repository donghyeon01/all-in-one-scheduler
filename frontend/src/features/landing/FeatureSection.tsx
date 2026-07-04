import { Card } from "@/shared/components/card/Card";
import { CalendarDays, Users, Bell, CheckSquare } from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "통합 캘린더",
    description: "개인 일정과 약속을 한 곳에서 관리하세요.",
  },
  {
    icon: CheckSquare,
    title: "To-Do 관리",
    description: "해야 할 일을 정리하고 마감일을 추적하세요.",
  },
  {
    icon: Users,
    title: "자동 일정 조율",
    description: "여러 사람의 가능한 시간을 분석하여 최적의 일정을 추천합니다.",
  },
  {
    icon: Bell,
    title: "실시간 알림",
    description: "친구 요청, 일정 초대, 일정 확정을 즉시 확인할 수 있습니다.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-primary/30 px-4 py-2 text-2xl font-semibold text-slate-700">
            ✨ Features
          </span>

          <h2 className="mt-6 text-4xl font-bold">일정 관리부터 조율까지</h2>

          <p className="mt-4 text-muted-foreground">
            SOSO 하나로 모든 일정을 관리하세요.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
