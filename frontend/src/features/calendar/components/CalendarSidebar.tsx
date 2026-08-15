import { memo, useMemo } from "react";
import Card from "@/shared/components/card/Card";
import type { CalendarEvent } from "../api/eventsApi";

interface CalendarSidebarProps {
  events: CalendarEvent[];
}

// memo 적용: events가 변경될 때만 리렌더
function CalendarSidebar({ events }: CalendarSidebarProps) {
  // useMemo: 이번 주 일정 계산 캐싱 (events 변경 시에만 재계산)
  const thisWeekEvents = useMemo(() => {
    const now = new Date();
    const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate >= now && eventDate <= oneWeekLater;
    });
  }, [events]);

  // useMemo: 가장 가까운 마감 일정 캐싱
  const upcomingDeadlineEvent = useMemo(() => {
    const now = new Date();
    return events
      .filter((event) => new Date(event.start) >= now)
      .sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      )[0];
  }, [events]);

  // D-Day 계산 함수 (events와 무관한 순수 함수)
  const getDDayString = (targetDateStr: string) => {
    const target = new Date(targetDateStr);
    // 날짜 정규화 (시분초 제외)
    target.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "D-Day";
    return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <Card>
        <h3 className="font-black text-text">📅 이번 주 일정</h3>
        <p className="mt-2 text-sm font-bold text-text-secondary">
          {thisWeekEvents.length > 0
            ? `예정된 일정 ${thisWeekEvents.length}개`
            : "이번 주에는 잡힌 일정이 없습니다."}
        </p>
      </Card>

      <Card>
        <h3 className="font-black text-text">🚨 다가오는 마감</h3>
        {upcomingDeadlineEvent ? (
          <>
            <p className="mt-2 font-extrabold text-text-secondary truncate">
              {upcomingDeadlineEvent.title}
            </p>
            <p className="text-sm font-black text-danger-text mt-1">
              {getDDayString(upcomingDeadlineEvent.start)}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm font-bold text-text-muted">
            다가오는 마감이 없습니다.
          </p>
        )}
      </Card>
    </div>
  );
}

export default memo(CalendarSidebar);
