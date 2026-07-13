import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventApi } from "@fullcalendar/core";
import type { CalendarEvent } from "../api/eventsApi";

interface Props {
  events: CalendarEvent[];
  onDateClick: (date: string) => void;
  onEventClick: (event: EventApi) => void;
}

export default function CalendarView({
  events,
  onDateClick,
  onEventClick,
}: Props) {
  return (
    <div className="calendar-container bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="75vh"
        events={events}
        dateClick={(info) => onDateClick(info.dateStr)}
        eventClick={(info) => onEventClick(info.event)}
        locale="ko"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
        }}
        dayMaxEvents={true}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* ======= 1. [핵심 수정] 붙어있는 버튼 그룹 분리 ======= */
        /* < > 버튼 사이, 그리고 Month Week 버튼 사이를 강제로 갈라놓기 */
        .fc .fc-button-group {
          display: inline-flex !important;
          gap: 6px !important; /* 이미지의 빨간 선 자리에 6px 여백 생성 */
          background-color: transparent !important;
          border: none !important;
        }

        /* FullCalendar가 그룹 버튼들의 경계면 라운딩을 깎아버리는 기본 속성 해제 */
        .fc .fc-button-group > .fc-button {
          border-radius: 0.5rem !important; /* 모든 모서리를 다시 둥글게 */
          margin-left: 0 !important; /* 좌측 마진 겹침 현상 제거 */
        }

        /* 좌측 툴바 덩어리들(< > 그룹과 Today 버튼) 사이의 간격 */
        .fc .fc-toolbar-chunk:first-child {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }

        /* ======= 2. 버튼 디자인 및 1초 뒤 포커스 해제 효과 ======= */
        .fc .fc-button-primary {
          background-color: #ffffff !important;
          border: 2px solid var(--color-accent-purple) !important;
          color: var(--color-accent-purple) !important;
          font-weight: 700 !important;
          padding: 0.4rem 0.8rem !important;
          box-shadow: none !important;
          
          /* 포커스가 빠질 때 보라색 라인과 잔상이 1초 동안 부드럽게 사라짐 */
          transition: background-color 1s ease, box-shadow 1s ease, border-color 1s ease !important;
        }
        
        .fc .fc-button-primary:hover {
          background-color: rgba(118, 75, 162, 0.08) !important;
          transition: none !important; /* 마우스 올릴 땐 즉시 반응 */
        }

        /* 클릭하는 순간(Active)과 강제 포커스 상태 오버라이드 */
        .fc .fc-button-primary:focus,
        .fc .fc-button-primary:not(:disabled):active {
          background-color: rgba(118, 75, 162, 0.15) !important;
          border-color: var(--color-accent-purple) !important;
          box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.25) !important;
          outline: none !important;
          transition: none !important; 
        }

        /* 활성화된 스위치 버튼 스타일 유지 */
        .fc .fc-button-primary:not(:disabled).fc-button-active {
          background-color: var(--color-accent-purple) !important;
          border-color: var(--color-accent-purple) !important;
          color: #ffffff !important;
          box-shadow: 0 2px 6px rgba(118, 75, 162, 0.3) !important;
          transition: none !important;
        }

        /* ======= 3. 기본 달력 격자선 및 테이블 틀 ======= */
        .fc {
          --fc-border-color: #cbd5e1 !important; 
        }
        .fc-theme-standard .fc-scrollgrid {
          border: 2px solid #cbd5e1 !important;
          border-radius: 0.75rem !important;
          overflow: hidden;
        }
        .fc .fc-col-header-cell {
          background-color: #e2e8f0 !important; 
          padding: 6px 0 !important;
        }

        /* ======= 4. 탠저린 오렌지 이벤트 바 ======= */
        .fc .fc-event,
        .fc .fc-h-event,
        .fc .fc-v-event {
          background-color: #ff8c00 !important; 
          border: 1px solid #e07b00 !important; 
          color: #ffffff !important; 
          padding: 4px 6px !important;
          font-weight: 700 !important;
          font-size: 0.825rem !important;
          border-radius: 4px !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) !important;
          cursor: pointer !important;
        }
        .fc .fc-event-title,
        .fc .fc-event-time {
          color: #ffffff !important;
          font-weight: 700 !important;
        }

        /* ======= 5. 오늘 날짜 하이라이트 인셋 링 ======= */
        .fc .fc-day-today {
          background-color: #ffffff !important; 
          position: relative;
          box-shadow: inset 0 0 0 3px var(--color-accent-purple) !important; 
        }
        .fc .fc-day-today .fc-daygrid-day-number {
          color: var(--color-accent-purple) !important;
          font-weight: 800 !important;
        }

        /* ======= 6. 제목 연도/월 타이틀 ======= */
        .fc .fc-toolbar-title {
          font-size: 1.4rem !important;
          font-weight: 800;
          color: var(--color-text);
        }
      `,
        }}
      />
    </div>
  );
}
