import { useState } from "react";
import { useEventStore } from "../store/EventStore";

export function useCalendarModals() {
  const { addEvent, deleteEvent } = useEventStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsAddOpen(true);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.start?.toISOString().split("T")[0] || "",
      end: event.end?.toISOString().split("T")[0] || "",
      location: event.extendedProps?.location || "",
    });
    setIsDetailOpen(true);
  };

  const handleDeleteTrigger = () => {
    setIsDetailOpen(false);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEvent?.id) {
      deleteEvent(selectedEvent.id);
    }
    setIsConfirmDeleteOpen(false);
    setSelectedEvent(null);
  };

  const handleAddSubmit = (data: {
    title: string;
    start: string;
    end: string;
    location: string;
  }) => {
    addEvent({
      id: crypto.randomUUID(),
      title: data.title,
      start: data.start,
      end: data.end,
      allDay: false,
      location: data.location,
    });
  };

  return {
    state: {
      isAddOpen,
      isDetailOpen,
      isConfirmDeleteOpen,
      selectedDate,
      selectedEvent,
    },
    actions: {
      setIsAddOpen,
      setIsDetailOpen,
      setIsConfirmDeleteOpen,
      handleDateClick,
      handleEventClick,
      handleDeleteTrigger,
      handleDeleteConfirm,
      handleAddSubmit,
    },
  };
}
