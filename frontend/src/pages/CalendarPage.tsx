import CalendarView from "@/features/calendar/components/CalendarView";
import PageHeader from "@/shared/components/header/PageHeader";
import Button from "@/shared/components/button/Button";
import { useEventStore } from "@/app/store/eventStore";
import { useState } from "react";
import EventModal from "@/features/calendar/components/EventModal";
import EventDetailModal from "@/features/calendar/components/EventDetailModal";
import CalendarSidebar from "@/features/calendar/components/CalendarSidebar";
import ConfirmModal from "@/shared/components/modal/ConfirmModal"; // [추가] 공통 ConfirmModal 임포트

export default function CalendarPage() {
  const { events, addEvent, deleteEvent } = useEventStore(); // [수정] deleteEvent 액션 가져오기

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  //  삭제 재확인 팝업 전용 상태 관리
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setOpen(true);
  };

  // 상세 모달에서 삭제 버튼을 눌렀을 때 트리거되는 함수
  const handleDeleteTrigger = () => {
    setDetailOpen(false); // 1. 상세 모달을 닫고
    setConfirmDeleteOpen(true); // 2. 삭제 확인 모달을 염
  };

  //  최종 삭제 승인 시 처리 함수
  const handleConfirmDelete = () => {
    if (selectedEvent?.id) {
      deleteEvent(selectedEvent.id); // 스토어에서 삭제
    }
    setConfirmDeleteOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <PageHeader title="캘린더" description="일정을 관리하세요.">
        <Button
          onClick={() =>
            handleDateClick(new Date().toISOString().split("T")[0])
          }>
          + 일정 추가
        </Button>
      </PageHeader>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="min-w-1/4">
          <CalendarSidebar />
        </div>

        <div className="w-full">
          <CalendarView
            events={events}
            onDateClick={handleDateClick}
            onEventClick={(event) => {
              // FullCalendar 이벤트 객체 구조에 맞춰 스토어 ID를 바인딩하여 저장
              setSelectedEvent({
                id: event.id, // [추가] 삭제 및 수정을 위한 ID 보존
                title: event.title,
                start: event.start?.toString(),
                end: event.end?.toString(),
                location: event.extendedProps?.location || "",
              });
              setDetailOpen(true);
            }}
          />
        </div>
      </div>

      {/* 일정 추가 모달 */}
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

      {/* 일정 상세 모달 */}
      <EventDetailModal
        open={detailOpen}
        event={selectedEvent}
        onClose={() => setDetailOpen(false)}
        onDelete={handleDeleteTrigger} // [수정] 바로 지우지 않고 확인 팝업을 띄우는 함수로 변경
        onEdit={() => alert("수정 기능은 다음 단계에서 진행됩니다.")}
      />

      {/* 삭제 재확인 팝업 컴포넌트 결합 */}
      <ConfirmModal
        open={confirmDeleteOpen}
        title="일정 삭제"
        message={`'${selectedEvent?.title}' 일정을 정말로 삭제하시겠습니까?\n삭제된 일정은 복구할 수 없습니다.`}
        confirmText="삭제하기"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
