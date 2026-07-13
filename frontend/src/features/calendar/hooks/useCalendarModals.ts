import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EventApi } from "@fullcalendar/core";
import {
  EVENTS_QUERY_KEY,
  eventsApi,
  type CalendarEvent,
} from "../api/eventsApi";

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
  const queryClient = useQueryClient();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  // 캐시 무효화 → CalendarPage/CalendarSidebar 등 EVENTS_QUERY_KEY를 구독 중인 곳들이 자동 재조회됨
  const invalidateEvents = () =>
    queryClient.invalidateQueries({ queryKey: EVENTS_QUERY_KEY });

  const createEventMutation = useMutation({
    mutationFn: eventsApi.createEvent,
    onSuccess: invalidateEvents,
    onError: (error) => console.error("일정 추가 실패:", error),
  });

  const updateEventMutation = useMutation({
    mutationFn: ({
      eventId,
      data,
    }: {
      eventId: string;
      data: Parameters<typeof eventsApi.updateEvent>[1];
    }) => eventsApi.updateEvent(eventId, data),
    onSuccess: invalidateEvents,
    onError: (error) => console.error("일정 수정 실패:", error),
  });

  const deleteEventMutation = useMutation({
    mutationFn: eventsApi.deleteEvent,
    onSuccess: invalidateEvents,
    onError: (error) => console.error("일정 삭제 실패:", error),
  });

  const handleDateClick = (date: string) => {
    // date가 "2026-07-13" 형태로 들어오면 현재 시간 또는 기본값(예: 오전 09:00)을 붙여서 포맷팅합니다.
    const defaultDateTime = `${date}T09:00`;
    setSelectedDate(defaultDateTime);
    setIsAddOpen(true);
  };

  const handleEventClick = (event: EventApi) => {
    setSelectedEvent({
      id: event.id,
      title: event.title || "",
      start: formatToDateTimeLocal(event.start),
      end:
        formatToDateTimeLocal(event.end) || formatToDateTimeLocal(event.start),
      location: (event.extendedProps?.location as string) || "",
      allDay: event.allDay,
    });
    setIsDetailOpen(true);
  };

  const handleDeleteTrigger = () => {
    setIsDetailOpen(false);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEvent?.id) {
      deleteEventMutation.mutate(selectedEvent.id);
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
    updateEventMutation.mutate({
      eventId: data.id,
      data: {
        title: data.title,
        startTime: toBackendDateTime(data.start),
        endTime: toBackendDateTime(data.end),
        location: data.location,
        allDay: false,
      },
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
    createEventMutation.mutate({
      title: data.title,
      startTime: toBackendDateTime(data.start),
      endTime: toBackendDateTime(data.end),
      location: data.location,
      allDay: false,
    });
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
