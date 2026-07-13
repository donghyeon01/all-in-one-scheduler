import CalendarView from "@/features/calendar/components/CalendarView";
import PageHeader from "@/shared/components/header/PageHeader";
import EventModal from "@/features/calendar/components/EventModal";
import EventDetailModal from "@/features/calendar/components/EventDetailModal";
import EventEditModal from "@/features/calendar/components/EventEditModal";
import CalendarSidebar from "@/features/calendar/components/CalendarSidebar";
import ConfirmModal from "@/shared/components/modal/ConfirmModal";
import { useCalendarModals } from "@/features/calendar/hooks/useCalendarModals";
import { eventsApi, EVENTS_QUERY_KEY } from "@/features/calendar/api/eventsApi";
import { useQuery } from "@tanstack/react-query";

export default function CalendarPage() {
  const { state, actions } = useCalendarModals();

  // react-query로 일정 목록 조회
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: EVENTS_QUERY_KEY,
    queryFn: eventsApi.getEvents,
  });

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="캘린더 관리"
          description="내 일정과 모임 스케줄을 한눈에 확인하세요."
        />

        <div className="p-6 text-center text-slate-500">
          일정을 불러오는 중입니다...
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <PageHeader
          title="캘린더 관리"
          description="내 일정과 모임 스케줄을 한눈에 확인하세요."
        />

        <div className="p-6 text-center text-red-500">
          일정을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="캘린더 관리"
        description="내 일정과 모임 스케줄을 한눈에 확인하세요."
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* 사이드바 영역 */}
        <div className="lg:col-span-1">
          <CalendarSidebar events={events} />
        </div>

        {/* 메인 캘린더 영역 */}
        <div className="lg:col-span-3">
          <CalendarView
            events={events}
            onDateClick={actions.handleDateClick}
            onEventClick={actions.handleEventClick}
          />
        </div>
      </div>

      {/* 일정 추가 모달 */}
      <EventModal
        key={state.isAddOpen ? state.selectedDate : "closed"}
        open={state.isAddOpen}
        selectedDate={state.selectedDate}
        onClose={() => actions.setIsAddOpen(false)}
        onSubmit={actions.handleAddSubmit}
      />

      {/* 일정 상세 모달 */}
      <EventDetailModal
        open={state.isDetailOpen}
        event={state.selectedEvent}
        onClose={() => actions.setIsDetailOpen(false)}
        onDelete={actions.handleDeleteTrigger}
        onEdit={actions.handleEditTrigger}
      />

      {/* 일정 수정 모달 */}
      <EventEditModal
        key={state.isEditOpen ? (state.selectedEvent?.id ?? "edit") : "closed"}
        open={state.isEditOpen}
        event={state.selectedEvent}
        onClose={() => actions.setIsEditOpen(false)}
        onSubmit={actions.handleEditSubmit}
      />

      {/* 삭제 재확인 팝업 */}
      <ConfirmModal
        open={state.isConfirmDeleteOpen}
        title="일정 삭제"
        message="정말로 이 일정을 삭제하시겠습니까? 삭제된 일정은 복구할 수 없습니다."
        onClose={() => actions.setIsConfirmDeleteOpen(false)}
        onConfirm={actions.handleDeleteConfirm}
      />
    </>
  );
}
