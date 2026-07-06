import CalendarView from "@/features/calendar/components/CalendarView";
import { mockEvents } from "@/features/calendar/mock/events";
import PageHeader from "@/shared/components/header/PageHeader";
import Button from "@/shared/components/button/Button";
import UpcomingEvents from "@/features/calendar/components/UpcomingEvents";
import { useEventStore } from "@/app/store/eventStore";
import { useState } from "react";
import EventModal from "@/features/calendar/components/EventModal";
import EventDetailModal from "@/features/calendar/components/EventDetailModal";

export default function CalendarPage() {
  const { events, addEvent } = useEventStore();

  const [open, setOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [detailOpen, setDetailOpen] = useState(false);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);

    setOpen(true);
  };
  return (
    <>
      <PageHeader title="캘린더" description="일정을 관리하세요.">
        <Button>+ 일정 추가</Button>
      </PageHeader>

      <CalendarView
        events={events}
        onDateClick={handleDateClick}
        onEventClick={(event) => {
          setSelectedEvent({
            title: event.title,
            start: event.start?.toString(),
            end: event.end?.toString(),
          });

          setDetailOpen(true);
        }}
      />
      <EventModal
        open={open}
        selectedDate={selectedDate}
        onClose={() => setOpen(false)}
        onSubmit={(data) =>
          addEvent({
            id: crypto.randomUUID(),

            title: data.title,

            start: data.start,

            end: data.end,

            allDay: false,

            location: data.location,
          })
        }
      />
      <EventDetailModal
        open={detailOpen}
        event={selectedEvent}
        onClose={() => setDetailOpen(false)}
        onDelete={() => {
          console.log("삭제");
        }}
        onEdit={() => {
          console.log("수정");
        }}
      />
    </>
  );
}
