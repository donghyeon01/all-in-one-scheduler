import { useState } from "react";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/ui/Input";
import Card from "@/shared/components/card/Card";

interface SchedulingFormProps {
  onSubmit: (data: { title: string; startDate: string; endDate: string }) => void;
}

export default function SchedulingForm({ onSubmit }: SchedulingFormProps) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate || !endDate) {
      alert("모든 빈칸을 채워주세요!");
      return;
    }
    onSubmit({ title, startDate, endDate });
  };

  return (
    <Card className="h-fit border-3">
      <h3 className="text-xl font-black text-text mb-4">
        조율 조건 설정
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-text">
            약속/회의 제목
          </label>
          <Input
            placeholder="예: 캡스톤 디자인 기획 회의"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-text">
            검색 시작일
          </label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-text">
            검색 마감일
          </label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full justify-center text-center">
            ⚡ 최적의 시간 계산하기
          </Button>
        </div>
      </form>
    </Card>
  );
}
