import { useEffect, useState } from "react";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/ui/Input";
import Modal from "@/shared/components/modal/Modal";
import type { CalendarEvent } from "../store/EventStore";

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
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");

  // 모달이 열리거나 타겟 일정이 바뀔 때 로컬 스테이트 초기화
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(event.start || "");
      setEnd(event.end || "");
      setLocation(event.location || "");
    }
  }, [event, open]);

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
    onClose();
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
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border-2 border-text bg-white px-4 py-2 font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] hover:bg-slate-50 transition">
            취소
          </button>
          <Button type="submit">수정 완료</Button>
        </div>
      </form>
    </Modal>
  );
}
