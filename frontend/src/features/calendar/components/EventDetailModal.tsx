import Button from "@/shared/components/button/Button";
import Modal from "@/shared/components/modal/Modal";

interface Props {
  open: boolean;
  event: {
    title: string;
    start: string;
    end: string;
    location?: string;
  } | null;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function EventDetailModal({
  open,
  event,
  onClose,
  onDelete,
  onEdit,
}: Props) {
  if (!event) return null;

  return (
    <Modal isOpen={open} title="일정 상세" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-secondary">제목</p>
          <p className="text-text">{event.title}</p>
        </div>

        <div>
          <p className="text-sm text-text-secondary">시작</p>
          <p className="text-text">{event.start}</p>
        </div>

        <div>
          <p className="text-sm text-text-secondary">종료</p>
          <p className="text-text">{event.end}</p>
        </div>

        <div>
          <p className="text-sm text-text-secondary">장소</p>
          <p className="text-text">{event.location || "-"}</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="primary" size="md" onClick={onEdit}>
            수정
          </Button>
          <Button variant="danger" size="md" onClick={onDelete}>
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
}
