import { Card } from "@/features/landing/components/LandingCard";
import { CalendarDays, Users, MessageCircle, BookOpen } from "lucide-react";

const problems = [
  {
    icon: MessageCircle,
    title: "약속 날짜 정하기",
    description:
      '다들 언제 시간 돼?" 이후 기약 없는 읽씹과 조율 지옥에 갇혀요.',
  },
  {
    icon: Users,
    title: "팀 프로젝트 회의",
    description: "팀원 시간 일일이 취합하다가 회의는커녕 약속 잡다 지쳐요.",
  },
  {
    icon: BookOpen,
    title: "스터디 일정 조율",
    description:
      "고정 시간인 줄 알았는데 낙엽처럼 흩어지는 스터디원들의 스케줄..",
  },
  {
    icon: CalendarDays,
    title: "모임 및 동아리",
    description:
      "여러 사람의 일정을 고려하다 보면 정작 약속을 잡는 것이 가장 어려워져요.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-white  py-20 border-b-2 border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/30 px-4 py-2 text-2xl border-2 font-semibold text-slate-700">
            {/* 😫  */}
            Problem
          </span>

          <h2 className="mt-6 text-4xl font-bold text-text">
            이런 경험 있으신가요?
          </h2>

          <p className="mt-4 text-lg text-text-gray">
            약속 한 번 잡으려다 진이 다 빠졌던 슬픈 경험이 있다면, 이제{" "}
            <span className="text-accent-purple font-bold">SOSO</span>가 도와
            드릴게요!
          </p>
        </div>

        {/* Problem Cards */}

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <Card
              key={problem.title}
              title={problem.title}
              description={problem.description}
              icon={problem.icon}
            />
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-20 rounded-3xl bg-primary-bg p-10 text-center">
          <h3 className="text-2xl font-bold text-text">
            SOSO가 일정 조율을 대신합니다.
          </h3>

          <p className="mt-4 text-muted-foreground">
            친구, 팀원, 스터디원들의 일정을 기반으로 가장 적합한 시간을 자동으로
            추천받아 보세요.
          </p>
        </div>
      </div>
    </section>
  );
}
