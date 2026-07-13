import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/ui/Input";
import Modal from "@/shared/components/modal/Modal";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  selectedDate: string;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    start: string;
    end: string;
    location: string;
  }) => void;
}

export default function EventModal({
  open,
  selectedDate,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");

  // 모달이 열릴 때 부모의 날짜 정보를 기반으로 상태 초기화 및 자동 1시간 뒤 세팅
  useEffect(() => {
    if (open) {
      setTitle("");
      setStart(selectedDate);
      setLocation("");

      if (selectedDate) {
        const startDateObj = new Date(selectedDate);
        startDateObj.setHours(startDateObj.getHours() + 1);
        const pad = (num: number) => String(num).padStart(2, "0");
        const nextHourStr = `${startDateObj.getFullYear()}-${pad(startDateObj.getMonth() + 1)}-${pad(startDateObj.getDate())}T${pad(startDateObj.getHours())}:${pad(startDateObj.getMinutes())}`;
        setEnd(nextHourStr);
      } else {
        setEnd(selectedDate);
      }
    }
  }, [open, selectedDate]);

  // 사용자가 시작 시간을 직접 바꿀 때도 종료 시간을 지능적으로 한 시간 뒤로 밀어줌
  const handleStartChange = (newStart: string) => {
    setStart(newStart);
    if (newStart) {
      const dateObj = new Date(newStart);
      dateObj.setHours(dateObj.getHours() + 1);
      const pad = (num: number) => String(num).padStart(2, "0");
      const autoEnd = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}T${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
      setEnd(autoEnd);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      start,
      end,
      location,
    });
  };

  return (
    <Modal isOpen={open} title="새 일정 추가" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-3">
        <div>
          <label className="text-sm font-bold text-text mb-1 block">
            일정 제목
          </label>
          <Input
            placeholder="어떤 일정인가요?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* 편의성을 위해 시작 시간과 종료 시간을 그리드로 정렬 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-bold text-text mb-1 block">
              시작 일시
            </label>
            <Input
              type="datetime-local"
              value={start}
              onChange={(e) => handleStartChange(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-text mb-1 block">
              종료 일시
            </label>
            <Input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-text mb-1 block">장소</label>
          <Input
            placeholder="장소를 입력하세요 (선택)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4 py-2 font-bold text-slate-500 hover:bg-slate-50 transition">
            취소
          </button>
          <Button type="submit">저장</Button>
        </div>
      </form>
    </Modal>
  );
}
