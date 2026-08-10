import { useState } from "react";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/ui/Input";
import Modal from "@/shared/components/modal/Modal";
import type { CalendarEvent } from "../api/eventsApi";

interface Props {
  open: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onSubmit: (data: {
    id: string;
    title: string;
    start: string;
    end: string;
    location: string;
  }) => void;
}

export default function EventEditModal({
  open,
  event,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [start, setStart] = useState(event?.start ?? "");
  const [end, setEnd] = useState(event?.end ?? "");
  const [location, setLocation] = useState(event?.location ?? "");

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: event.id,
      title,
      start,
      end,
      location,
    });
    // onClose는 부모(useCalendarModals)의 handleEditSubmit에서 API 완료 후 호출함
  };

  return (
    <Modal isOpen={open} title="일정 수정" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-3">
        <div>
          <label className="text-sm font-bold text-text mb-1 block">제목</label>
          <Input
            placeholder="수정할 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-bold text-text mb-1 block">
            시작 시간
          </label>
          <Input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-bold text-text mb-1 block">
            종료 시간
          </label>
          <Input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-bold text-text mb-1 block">장소</label>
          <Input
            placeholder="장소를 입력하세요"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" size="md" type="button" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" size="md" type="submit">
            수정 완료
          </Button>
        </div>
      </form>
    </Modal>
  );
}
