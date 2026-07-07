import Card from "@/shared/components/card/Card";
import { useEventStore } from "../store/EventStore";

export default function CalendarSidebar() {
  const { events } = useEventStore();

  // 1. 이번 주 일정 개수 계산 (현재 기준 7일 이내 일정 계산)
  const now = new Date("2026-07-07"); // 시스템 기준 고정 타임라인 반영
  const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const thisWeekEvents = events.filter((event) => {
    const eventDate = new Date(event.start);
    return eventDate >= now && eventDate <= oneWeekLater;
  });

  // 2. 가장 가까운 다가오는 마감 일정 추적
  const upcomingDeadlineEvent = events
    .filter((event) => new Date(event.start) >= now)
    .sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    )[0];

  // D-Day 계산 함수
  const getDDayString = (targetDateStr: string) => {
    const target = new Date(targetDateStr);
    // 날짜 정규화 (시분초 제외)
    target.setHours(0, 0, 0, 0);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "D-Day";
    return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
  };

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-black text-text">📅 이번 주 일정</h3>
        <p className="mt-2 text-sm font-bold text-slate-500">
          {thisWeekEvents.length > 0
            ? `예정된 일정 ${thisWeekEvents.length}개`
            : "이번 주에는 잡힌 일정이 없습니다."}
        </p>
      </Card>

      <Card>
        <h3 className="font-black text-text">🚨 다가오는 마감</h3>
        {upcomingDeadlineEvent ? (
          <>
            <p className="mt-2 font-extrabold text-text-gray truncate">
              {upcomingDeadlineEvent.title}
            </p>
            <p className="text-sm font-black text-red-500 mt-1">
              {getDDayString(upcomingDeadlineEvent.start)}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm font-bold text-slate-400">
            다가오는 마감이 없습니다.
          </p>
        )}
      </Card>
    </div>
  );
}
