import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";

import timeGridPlugin from "@fullcalendar/timegrid";

import interactionPlugin from "@fullcalendar/interaction";

interface Props {
  events: any[];

  onDateClick: (date: string) => void;

  onEventClick: (event: any) => void;
}
export default function CalendarView({
  events,
  onDateClick,
  onEventClick,
}: Props) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      height="80vh"
      events={events}
      dateClick={(info) => onDateClick(info.dateStr)}
      eventClick={(info) => onEventClick(info.event)}
    />
  );
}
