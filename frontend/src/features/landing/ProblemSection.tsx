import { Card } from "@/shared/components/card/Card";
import { CalendarDays, Users, MessageCircle, BookOpen } from "lucide-react";

const problemss = [
  {
    icon: MessageCircle,
    title: "약속 날짜 정하기",
    description:
      '"다들 언제 돼?"라는 말로 시작해서 채팅방이 수십 개의 메시지로 가득 차요.',
  },
  {
    icon: Users,
    title: "팀 프로젝트 회의",
    description:
      "팀원들의 시간을 하나씩 물어보며 회의 시간을 잡는 데 많은 시간이 소요돼요.",
  },
  {
    icon: BookOpen,
    title: "스터디 일정 조율",
    description:
      "매주 스터디 시간을 맞추기 위해 반복적으로 일정을 확인해야 해요.",
  },
  {
    icon: CalendarDays,
    title: "모임 및 동아리",
    description:
      "여러 사람의 일정을 고려하다 보면 정작 약속을 잡는 것이 가장 어려워져요.",
  },
];

export function ProblemSections() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/30 px-4 py-2 text-2xl font-semibold text-slate-700">
            😫 Problem
          </span>

          <h2 className="mt-6 text-4xl font-bold text-text">
            이런 경험 있으신가요?
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            일정을 잡는 일보다
            <span className="font-semibold text-text"> 일정을 맞추는 과정</span>
            이 더 힘들었던 적이 있다면, SOSO가 도움이 될 수 있습니다.
          </p>
        </div>

        {/* Problem Cards */}

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <Card
              key={problem.title}
              title={problem.title}
              description={problem.description}
              icon={problem.icon} // 문자열이든 컴포넌트든 그대로 넘겨주면 내부에서 알아서 판단합니다.
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

const problems = [
  {
    icon: "💬",
    title: "끝없는 카톡 눈치싸움",
    description:
      '"다들 언제 시간 돼?" 이후 기약 없는 읽씹과 조율 지옥에 갇혀요.',
    color: "bg-primary-light",
  },
  {
    icon: "👥",
    title: "조별과제 발등 불",
    description: "팀원 시간 일일이 취합하다가 회의는커녕 약속 잡다 지쳐요.",
    color: "bg-secondary",
  },
  {
    icon: "📚",
    title: "매주 바뀌는 스터디",
    description:
      "고정 시간인 줄 알았는데 낙엽처럼 흩어지는 스터디원들의 스케줄...",
    color: "bg-accent",
  },
  {
    icon: "🥳",
    title: "동아리 정기 모임",
    description: "인원이 많아질수록 단 한 명도 빠지지 않는 날은 기적이 됩니다.",
    color: "bg-destructive",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-white py-24 border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mx-auto max-w-2xl">
          <span className="text-4xl">😫</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-text">
            이런 조율 지옥, 겪어보셨죠?
          </h2>
          <p className="mt-4 font-medium text-text-gray">
            약속 한 번 잡으려다 진이 다 빠졌던 슬픈 경험이 있다면, 이제{" "}
            <span className="text-accent-purple font-bold">SOSO</span>가 구출해
            드릴게요!
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className={`rounded-2xl border-2 border-text p-6 shadow-[4px_4px_0px_0px_#1e2538] ${problem.color}`}>
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-black text-text">{problem.title}</h3>
              <p className="mt-2 text-sm font-bold text-card-foreground/80 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
