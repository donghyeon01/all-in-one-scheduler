import type { CalendarEvent } from "../types/event";

export const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "팀 회의",
    start: "2026-07-10T14:00:00",
    end: "2026-07-10T15:00:00",
    allDay: false,
    location: "Zoom",
  },

  {
    id: "2",
    title: "프로젝트 마감",
    start: "2026-07-15",
    end: "2026-07-15",
    allDay: true,
  },
];
