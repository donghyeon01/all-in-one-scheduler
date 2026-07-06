import Button from "@/shared/components/ui/Button";
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
          <p className="text-sm text-slate-500">제목</p>

          <p>{event.title}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">시작</p>

          <p>{event.start}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">종료</p>

          <p>{event.end}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">장소</p>

          <p>{event.location || "-"}</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={onEdit}>수정</Button>

          <button
            onClick={onDelete}
            className="
              rounded-xl
              border
              px-4
              py-2
              text-red-500
            ">
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
}
