import Card from "@/shared/components/card/Card";
import SectionHeader from "@/shared/components/header/SectionHeader";
import Section from "@/shared/components/layout/Section";
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
    <Section variant="white">
      <SectionHeader
        badge="Problem"
        title={
          <>
            이런 경험 <span className="text-accent-purple">있으신가요?</span>
          </>
        }
        description="약속 한 번 잡으려다 진이 다 빠졌던 슬픈 경험이 있다면, 이제 SOSO가 도와드릴게요!"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {problems.map((problem) => (
          <Card
            key={problem.title}
            variant="landing"
            title={problem.title}
            description={problem.description}
            icon={problem.icon}
          />
        ))}
      </div>
    </Section>
  );
}
