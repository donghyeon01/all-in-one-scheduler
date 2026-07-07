import { useState } from "react";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/ui/Input";

interface Props {
  onAdd: (title: string, dueDate: string) => void;
}

export default function TodoInputForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, dueDate);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 rounded-2xl border-3 border-text bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="mb-1 block text-xs font-black text-text">
          무엇을 해야 하나요?
        </label>
        <Input
          placeholder="새로운 할 일을 입력해 주세요..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="w-full sm:w-48">
        <label className="mb-1 block text-xs font-black text-text">
          마감 기한
        </label>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="h-[46px] whitespace-nowrap">
        추가하기
      </Button>
    </form>
  );
}
