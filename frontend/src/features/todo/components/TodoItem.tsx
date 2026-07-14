import Badge from "@/shared/components/badge/Badge";
import Card from "@/shared/components/card/Card";

interface Props {
  id: number; // [추가] 토글을 위한 고유식별자 수신
  title: string;
  completed: boolean;
  dueDate: string;
  onToggle: (id: number) => void; // [추가] 클릭 시 부모 상태를 바꿀 콜백 수신
}

export default function TodoItem({
  id,
  title,
  completed,
  dueDate,
  onToggle,
}: Props) {
  return (
    <Card className="mb-3">
      {/* 텍스트나 체크박스 영역 어디를 눌러도 인터랙션이 발생하도록 label 구조화 또는 클릭 이벤트 부여 */}
      <div
        onClick={() => onToggle(id)}
        className="flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none">
        <div className="flex flex-1 min-w-0 gap-4 items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => {}} // 부모의 onClick에서 처리하므로 경고 방지용 빈 함수 지정
            className="w-5 h-5 cursor-pointer accent-success-dark"
          />

          <div>
            <h3
              className={`font-semibold ${completed ? "line-through text-slate-400" : ""}`}>
              {title}
            </h3>

            <p className="text-sm text-slate-500">{dueDate}</p>
          </div>
        </div>

        <div className="shrink-0">
          {completed ? (
            <Badge variant="success">완료</Badge>
          ) : (
            <Badge variant="warning">진행중</Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
