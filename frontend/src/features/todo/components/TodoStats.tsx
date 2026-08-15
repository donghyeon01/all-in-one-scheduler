import { memo } from "react";
import Card from "@/shared/components/card/Card";

interface Props {
  total: number;
  active: number;
  completed: number;
}

// memo 적용: 숫자 props가 변경될 때만 리렌더
function TodoStats({ total, active, completed }: Props) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <Card>
        <p className="text-sm text-text-secondary">전체 작업</p>
        <h2 className="mt-2 text-3xl font-bold text-text">{total}</h2>
      </Card>

      <Card>
        <p className="text-sm text-text-secondary">진행중</p>
        <h2 className="mt-2 text-3xl font-bold text-text">{active}</h2>
      </Card>

      <Card>
        <p className="text-sm text-text-secondary">완료</p>
        <h2 className="mt-2 text-3xl font-bold text-text">{completed}</h2>
      </Card>
    </div>
  );
}

export default memo(TodoStats);
