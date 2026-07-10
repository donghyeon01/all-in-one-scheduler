import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/ui/Input";
import Modal from "@/shared/components/modal/Modal";
import { useState } from "react";

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

  const [start, setStart] = useState(selectedDate);

  const [end, setEnd] = useState(selectedDate);

  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    onSubmit({
      title,
      start,
      end,
      location,
    });
    // onClose는 부모(useCalendarModals)의 handleAddSubmit에서 API 완료 후 호출함
  };

  return (
    <Modal isOpen={open} title="일정 추가" onClose={onClose}>
      <div className="space-y-3 mt-3">
        <Input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <Input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <Input
          placeholder="장소"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmit}>저장</Button>
        </div>
      </div>
    </Modal>
  );
}
