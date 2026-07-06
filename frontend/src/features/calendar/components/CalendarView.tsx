import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";

import timeGridPlugin from "@fullcalendar/timegrid";

import interactionPlugin from "@fullcalendar/interaction";

import type { CalendarEvent } from "../types/event";

interface Props {
  events: CalendarEvent[];
}

export default function CalendarView({ events }: Props) {
  return (
    <div
      className="
      rounded-2xl
      bg-white
      p-4
      shadow-sm
    ">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="80vh"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
      />
    </div>
  );
}
