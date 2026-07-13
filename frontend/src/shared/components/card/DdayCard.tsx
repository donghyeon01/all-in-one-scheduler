interface Props {
  // 마감이 다가오는 항목의 제목 (예: 할 일 제목, 일정 제목)
  title: string;
  // "YYYY-MM-DD" 형식의 마감일 (백엔드에서 내려주는 dueDate/startTime 기반)
  dueDate: string;
}

// dueDate를 기준으로 "D-3", "D-Day", "D+2" 형태의 라벨을 계산 (로컬 타임존 기준)
function getDDayLabel(dueDate: string): string {
  const target = new Date(`${dueDate}T00:00:00`);
  target.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "D-Day";
  return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
}

export default function DdayCard({ title, dueDate }: Props) {
  return (
    <div
      className="
      rounded-2xl
      bg-primary
      p-4
      sm:p-6
    ">
      <p className="text-sm truncate">{title}</p>

      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
        {getDDayLabel(dueDate)}
      </h2>
    </div>
  );
}
