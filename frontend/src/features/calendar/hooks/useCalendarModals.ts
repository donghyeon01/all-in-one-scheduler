import { useState } from "react";
import { useEventStore } from "../store/EventStore";
import { eventsApi } from "../api/eventsApi";

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

// ISO 8601 datetime-local 문자열을 백엔드 LocalDateTime 포맷(초까지)으로 변환
const toBackendDateTime = (datetimeLocal: string) => {
  if (!datetimeLocal) return "";
  return datetimeLocal.length === 16 ? `${datetimeLocal}:00` : datetimeLocal;
};

export function useCalendarModals() {
  const { setEvents } = useEventStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // 서버에서 최신 이벤트 목록을 가져와 store 갱신
  const refreshEvents = async () => {
    try {
      const data = await eventsApi.getEvents();
      setEvents(data);
    } catch (error) {
      console.error("일정 새로고침 실패:", error);
    }
  };

  const handleDateClick = (date: string) => {
    // date가 "2026-07-13" 형태로 들어오면 현재 시간 또는 기본값(예: 오전 09:00)을 붙여서 포맷팅합니다.
    const defaultDateTime = `${date}T09:00`;
    setSelectedDate(defaultDateTime);
    setIsAddOpen(true);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: formatToDateTimeLocal(event.start),
      end:
        formatToDateTimeLocal(event.end) || formatToDateTimeLocal(event.start),
      location: event.extendedProps?.location || "",
    });
    setIsDetailOpen(true);
  };

  const handleDeleteTrigger = () => {
    setIsDetailOpen(false);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEvent?.id) {
      try {
        await eventsApi.deleteEvent(selectedEvent.id);
        await refreshEvents();
      } catch (error) {
        console.error("일정 삭제 실패:", error);
      }
    }
    setIsConfirmDeleteOpen(false);
    setSelectedEvent(null);
  };

  const handleEditTrigger = () => {
    setIsDetailOpen(false);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (data: {
    id: string;
    title: string;
    start: string;
    end: string;
    location: string;
  }) => {
    try {
      await eventsApi.updateEvent(data.id, {
        title: data.title,
        startTime: toBackendDateTime(data.start),
        endTime: toBackendDateTime(data.end),
        location: data.location,
        allDay: false,
      });
      await refreshEvents();
    } catch (error) {
      console.error("일정 수정 실패:", error);
    }
    setIsEditOpen(false);
    setSelectedEvent(null);
  };

  const handleAddSubmit = async (data: {
    title: string;
    start: string;
    end: string;
    location: string;
  }) => {
    try {
      await eventsApi.createEvent({
        title: data.title,
        startTime: toBackendDateTime(data.start),
        endTime: toBackendDateTime(data.end),
        location: data.location,
        allDay: false,
      });
      await refreshEvents();
    } catch (error) {
      console.error("일정 추가 실패:", error);
    }
    setIsAddOpen(false);
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
