import CalendarView from "@/features/calendar/components/CalendarView";
import CalendarSidebar from "@/features/calendar/components/CalendarSidebar";
import { mockEvents } from "@/features/calendar/mock/events";
import PageHeader from "@/shared/components/header/PageHeader";
import Button from "@/shared/components/button/Button";
import UpcomingEvents from "@/features/calendar/components/UpcomingEvents";

export function CalendarPages() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="mx-auto max-w-full space-y-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Calendar</h1>
          <p className="mt-2 text-text-gray">일정을 한눈에 확인하세요.</p>
        </div>

        <button
          className="
          rounded-xl
          bg-primary
          px-5
          py-3
        ">
          일정 추가
        </button>
      </div>
      <div
        className="
        grid
        grid-cols-7
        gap-2
      ">
        {days.map((day) => (
          <div
            key={day}
            className="
            min-h-[120px]
            rounded-xl
            border-2
            border-primary
            bg-white
            p-2
          ">
            <span className="font-semibold">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <>
      <PageHeader title="Calendar" description="일정을 관리하세요.">
        <Button>+ 일정 추가</Button>
      </PageHeader>

      <div
        className="
        grid
        gap-6
        lg:grid-cols-[280px_1fr]
      ">
        <UpcomingEvents
          events={[
            {
              id: "1",
              title: "프로젝트 회의",
              start: "2026-07-10 14:00",
            },
            {
              id: "2",
              title: "발표 준비",
              start: "2026-07-12 10:00",
            },
          ]}
        />

        <CalendarView events={mockEvents} />
      </div>
    </>
  );
}
