import Button from "../button/Button";
import Modal from "./Modal";

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal isOpen={open} title={title} onClose={onClose}>
      <p className="mb-6 text-text-secondary">{message}</p>

      <div className="flex justify-end gap-3">
        <Button variant="ghost" size="md" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="brutal" size="md" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
