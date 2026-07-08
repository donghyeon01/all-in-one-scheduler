export interface MatchResult {
  id: string;
  percent: string;
  date: string;
  time: string;
  availableCount: number;
  totalCount: number;
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
              <div
                key={res.id}
                className={`rounded-2xl border-3 border-text p-5 shadow-[4px_4px_0px_0px_#1e2538] transition-transform hover:-translate-y-0.5 ${
                  index === 0 ? "bg-primary-bg" : "bg-white"
                }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-black ${
                          index === 0
                            ? "bg-emerald-100 border-emerald-400 text-emerald-700"
                            : "bg-amber-100 border-amber-400 text-amber-700"
                        }`}>
                        추천도 {res.percent}%
                      </span>
                      {index === 0 && (
                        <span className="text-xs font-bold text-accent-purple">
                          ★ 최적의 선택
                        </span>
                      )}
                    </div>
                    <h4 className="mt-2 text-lg font-black text-text">
                      {res.date}
                    </h4>
                    <p className="text-sm font-bold text-text-gray mt-0.5">
                      {res.time}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                    <span className="text-sm font-extrabold text-text">
                      참여 가능: {res.availableCount} / {res.totalCount}명
                    </span>
                    <button
                      onClick={() => onConfirmTime(res)}
                      className="rounded-xl border-2 border-text bg-white px-4 py-2 text-xs font-black text-text shadow-[2px_2px_0px_0px_#1e2538] hover:bg-secondary transition-all">
                      이 시간으로 확정
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-8 text-center bg-white">
          <span className="text-4xl mb-2">⏱️</span>
          <p className="text-lg font-bold text-text">
            아직 계산된 일정이 없습니다
          </p>
          <p className="text-sm text-text-gray mt-1">
            좌측 서식에 조건을 입력하고 버튼을 눌러 모임을 자동 매칭해
            보세요.
          </p>
        </div>
      )}
    </div>
  );
}
