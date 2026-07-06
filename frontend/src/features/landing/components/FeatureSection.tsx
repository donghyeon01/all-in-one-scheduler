import { Card } from "@/features/landing/components/LandingCard";
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
    description: "해야 할 일을 정리하고 마감일을 놓치지 마세요.",
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
    <section className="bg-primary-bg py-20 border-b-2 border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* 헤더 생략 */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              // variant="neo"만 붙여주면 랜딩용 카드로 변신!
              <Card
                key={feature.title}
                variant="neo"
                className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-2xl bg-primary p-4 border-2 border-text shadow-[3px_3px_0px_0px_#1e2538]">
                  <Icon className="h-6 w-6 text-text" />
                </div>
                <h3 className="text-xl font-black text-text">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm font-bold text-text-gray leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
