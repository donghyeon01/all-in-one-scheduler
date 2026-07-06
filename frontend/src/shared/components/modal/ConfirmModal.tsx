import Button from "../ui/Button";
import Modal from "./Modal";

interface Props {
  open: boolean;

  title: string;

  message: string;

  confirmText?: string;

  cancelText?: string;

  onConfirm: () => void;

  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal isOpen={open} title={title} onClose={onCancel}>
      <p
        className="
        mb-6
        text-slate-600
      ">
        {message}
      </p>

      <div
        className="
        flex
        justify-end
        gap-3
      ">
        <button
          onClick={onCancel}
          className="
          rounded-xl
          border
          px-4
          py-2
        ">
          {cancelText}
        </button>

        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    </Modal>
  );
}
