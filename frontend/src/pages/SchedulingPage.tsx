import { useState } from "react";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import Card from "@/shared/components/card/Card";
import PageHeader from "@/shared/components/header/PageHeader";

interface MatchResult {
  id: string;
  percent: string;
  date: string;
  time: string;
  availableCount: number;
  totalCount: number;
}

export default function SchedulingPage() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);

  // 매칭 엔진 가동 시뮬레이션 핸들러
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate || !endDate) {
      alert("모든 빈칸을 채워주세요!");
      return;
    }

    // 결과 데이터 생성 시뮬레이션
    setResults([
      {
        id: "1",
        percent: "100",
        date: startDate,
        time: "오후 02:00 ~ 오후 04:00",
        availableCount: 5,
        totalCount: 5,
      },
      {
        id: "2",
        percent: "80",
        date: endDate,
        time: "오전 10:00 ~ 오후 12:00",
        availableCount: 4,
        totalCount: 5,
      },
      {
        id: "3",
        percent: "60",
        date: startDate,
        time: "오후 06:00 ~ 오후 08:00",
        availableCount: 3,
        totalCount: 5,
      },
    ]);
    setIsCalculated(true);
  };

  return (
    <>
      <PageHeader
        title="스마트 일정 조율"
        description="팀원들이나 친구들의 캘린더 빈 시간을 분석해 최적의 약속 시간을 추천합니다."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 조건 입력 폼 필드 */}
        <div className="lg:col-span-1">
          <Card className="h-fit border-3">
            <h3 className="text-xl font-black text-text mb-4">
              조율 조건 설정
            </h3>
            <form onSubmit={handleCalculate} className="space-y-4">
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
        </div>

        {/* 조율 결과 리포트 출력 영역 */}
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
                          onClick={() =>
                            alert(
                              `'${res.date} ${res.time}' 시간대로 일정을 확정합니다!`,
                            )
                          }
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
      </div>
    </>
  );
}
