import { useState } from "react";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/ui/Input";
import Modal from "@/shared/components/modal/Modal";

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: (email: string) => void;
}

export default function AddFriendModal({
  isOpen,
  onClose,
  onAddFriend,
}: AddFriendModalProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onAddFriend(email);
    setEmail("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} title="새로운 친구 초대" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="mb-2 block text-sm font-bold text-text">
            친구 이메일 주소
          </label>
          <Input
            type="email"
            placeholder="friend@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" size="md" type="button" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" size="md" type="submit">
            초대장 보내기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
