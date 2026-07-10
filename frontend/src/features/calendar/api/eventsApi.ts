import axiosInstance from "@/shared/api/axios";

// 프론트엔드 내부/FullCalendar에서 사용하는 인터페이스
export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO 8601 string (e.g. YYYY-MM-DDTHH:mm:ss)
  end: string;
  allDay: boolean;
  location?: string;
  description?: string;
}

export interface EventCreateRequest {
  title: string;
  description?: string;
  startTime: string; // 백엔드 LocalDateTime 포맷
  endTime: string;
  location?: string;
  allDay: boolean;
}

export interface EventUpdateRequest {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  allDay: boolean;
}

export const eventsApi = {
  getEvents: async (): Promise<CalendarEvent[]> => {
    const response = await axiosInstance.get("/api/events");
    return response.data.map((item: any) => ({
      id: String(item.id),
      title: item.title,
      start: item.startTime,
      end: item.endTime,
      allDay: item.allDay,
      location: item.location,
      description: item.description,
    }));
  },

  createEvent: async (data: EventCreateRequest): Promise<void> => {
    await axiosInstance.post("/api/events", data);
  },

  updateEvent: async (eventId: string | number, data: EventUpdateRequest): Promise<void> => {
    await axiosInstance.put(`/api/events/${eventId}`, data);
  },

  deleteEvent: async (eventId: string | number): Promise<void> => {
    await axiosInstance.delete(`/api/events/${eventId}`);
  },
};
