import Card from "@/shared/components/card/Card";
import Button from "@/shared/components/button/Button";
import EmptyState from "@/shared/components/state/EmptyState";

export interface MatchResult {
  id: string;
  percent: number;
  date: string;
  time: string;
  availableCount: number;
  totalCount: number;
  startTime: string;
  endTime: string;
}

interface SchedulingResultsProps {
  isCalculated: boolean;
  results: MatchResult[];
  onConfirmTime: (res: MatchResult) => void;
}

export default function SchedulingResults({
  isCalculated,
  results,
  onConfirmTime,
}: SchedulingResultsProps) {
  return (
    <div className="lg:col-span-2">
      {isCalculated ? (
        <div className="space-y-4">
          <h3 className="text-xl font-black text-text">
            🔍 SOSO 매칭 추천 결과
          </h3>

          <div className="grid gap-4">
            {results.map((res, index) => (
              <Card
                key={res.id}
                variant="brutal"
                className={index === 0 ? "bg-surface-muted" : "bg-surface"}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-black ${
                          index === 0
                            ? "bg-success-soft border-success text-success-text"
                            : "bg-warning border-warning-text text-warning-text"
                        }`}>
                        추천도 {res.percent}%
                      </span>
                      {index === 0 && (
                        <span className="text-xs font-bold text-accent">
                          ★ 최적의 선택
                        </span>
                      )}
                    </div>
                    <h4 className="mt-2 text-lg font-black text-text">
                      {res.date}
                    </h4>
                    <p className="text-sm font-bold text-text-secondary mt-0.5">
                      {res.time}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                    <span className="text-sm font-extrabold text-text">
                      참여 가능: {res.availableCount} / {res.totalCount}명
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onConfirmTime(res)}>
                      이 시간으로 확정
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title="아직 계산된 일정이 없습니다"
          description="좌측 서식에 조건을 입력하고 버튼을 눌러 모임을 자동 매칭해 보세요."
        />
      )}
    </div>
  );
}
