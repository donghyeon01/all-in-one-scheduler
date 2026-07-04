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
    description: "가능한 날짜 범위를 지정합니다.",
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
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-primary/30 px-4 py-2 text-2xl font-semibold text-slate-700">
            ⚙️ How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold">단 4단계로 일정 확정</h2>

          <p className="mt-4 text-muted-foreground">
            복잡한 일정 조율을 몇 분 안에 끝내보세요.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="
                  relative
                  rounded-3xl
                  border
                  border-border
                  p-8
                ">
                <div
                  className="
                    absolute
                    -top-4
                    left-6
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    font-bold
                  ">
                  {index + 1}
                </div>

                <div
                  className="
                    mt-4
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary-soft
                  ">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>

                <p className="mt-3 text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
