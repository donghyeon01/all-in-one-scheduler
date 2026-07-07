import { create } from "zustand";

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
}

interface EventStore {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: CalendarEvent) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),

  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    })),
}));
