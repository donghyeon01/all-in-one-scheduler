import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/ui/Input";
import Card from "@/shared/components/card/Card";
import { schedulingApi, type FriendUser } from "../api/schedulingApi";

interface SchedulingFormProps {
  onSubmit: (data: {
    title: string;
    startDate: string;
    endDate: string;
    friendIds: number[];
  }) => void;
}

export default function SchedulingForm({ onSubmit }: SchedulingFormProps) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 친구 선택을 위한 상태 값
  const [selectedFriendIds, setSelectedFriendIds] = useState<number[]>([]);

  // React Query로 친구 목록 로드 (캐싱 + 중복 요청 방지 + 로딩/에러 상태 관리)
  const { data: friends = [] } = useQuery<FriendUser[]>({
    queryKey: ["scheduling-friends"],
    queryFn: schedulingApi.getFriends,
  });

  // 체크박스 선택/해제 핸들러
  const handleFriendCheck = (friendId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedFriendIds((prev) => [...prev, friendId]);
    } else {
      setSelectedFriendIds((prev) => prev.filter((id) => id !== friendId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate || !endDate) {
      alert("모든 빈칸을 채워주세요!");
      return;
    }
    if (selectedFriendIds.length === 0) {
      alert("일정을 조율할 친구를 최소 1명 이상 선택해 주세요.");
      return;
    }
    // 부모에게 선택된 friendIds까지 포함하여 submit
    onSubmit({ title, startDate, endDate, friendIds: selectedFriendIds });
  };

  return (
    <Card variant="brutal" className="h-fit">
      <h3 className="text-xl font-black text-text mb-4">조율 조건 설정</h3>
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

        {/* 추가: 조율 참여 인원 (친구 목록) 선택 UI */}
        <div>
          <label className="mb-2 block text-sm font-bold text-text">
            참여할 친구 선택 ({selectedFriendIds.length}명 선택됨)
          </label>
          <div className="max-h-40 overflow-y-auto border border-border rounded-xl p-3 space-y-2 bg-surface-muted">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <label
                  key={friend.id}
                  className="flex items-center gap-3 cursor-pointer text-sm font-medium text-text select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-accent focus:ring-accent border-border"
                    checked={selectedFriendIds.includes(friend.id)}
                    onChange={(e) =>
                      handleFriendCheck(friend.id, e.target.checked)
                    }
                  />
                  <span>{friend.name}</span>
                </label>
              ))
            ) : (
              <p className="text-xs text-text-muted text-center py-4">
                등록된 친구가 없습니다.
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="brutal"
            size="md"
            type="submit"
            className="w-full justify-center">
            🚀 추천 시간대 분석하기
          </Button>
        </div>
      </form>
    </Card>
  );
}
