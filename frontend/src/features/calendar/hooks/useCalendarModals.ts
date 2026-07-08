import { useState } from "react";
import { useEventStore } from "../store/EventStore";

// JavaScript Date 객체를 <input type="datetime-local"> 에 맞는 YYYY-MM-DDTHH:mm 포맷으로 변환
const formatToDateTimeLocal = (date: Date | null) => {
  if (!date) return "";
  const pad = (num: number) => String(num).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export function useCalendarModals() {
  const { addEvent, deleteEvent, updateEvent } = useEventStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
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
      start: formatToDateTimeLocal(event.start),
      end: formatToDateTimeLocal(event.end) || formatToDateTimeLocal(event.start),
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

  const handleEditTrigger = () => {
    setIsDetailOpen(false);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (data: {
    id: string;
    title: string;
    start: string;
    end: string;
    location: string;
  }) => {
    updateEvent({
      id: data.id,
      title: data.title,
      start: data.start,
      end: data.end,
      allDay: false,
      location: data.location,
    });
    setIsEditOpen(false);
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
      isEditOpen,
      isConfirmDeleteOpen,
      selectedDate,
      selectedEvent,
    },
    actions: {
      setIsAddOpen,
      setIsDetailOpen,
      setIsEditOpen,
      setIsConfirmDeleteOpen,
      handleDateClick,
      handleEventClick,
      handleDeleteTrigger,
      handleDeleteConfirm,
      handleEditTrigger,
      handleEditSubmit,
      handleAddSubmit,
    },
  };
}

