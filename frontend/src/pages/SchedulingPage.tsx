import { useState } from "react";
import PageHeader from "@/shared/components/header/PageHeader";
import SchedulingForm from "@/features/scheduling/components/SchedulingForm";
import SchedulingResults, { type MatchResult } from "@/features/scheduling/components/SchedulingResults";

export default function SchedulingPage() {
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);

  // 매칭 엔진 가동 시뮬레이션 핸들러
  const handleCalculate = (data: {
    title: string;
    startDate: string;
    endDate: string;
  }) => {
    // 결과 데이터 생성 시뮬레이션
    setResults([
      {
        id: "1",
        percent: "100",
        date: data.startDate,
        time: "오후 02:00 ~ 오후 04:00",
        availableCount: 5,
        totalCount: 5,
      },
      {
        id: "2",
        percent: "80",
        date: data.endDate,
        time: "오전 10:00 ~ 오후 12:00",
        availableCount: 4,
        totalCount: 5,
      },
      {
        id: "3",
        percent: "60",
        date: data.startDate,
        time: "오후 06:00 ~ 오후 08:00",
        availableCount: 3,
        totalCount: 5,
      },
    ]);
    setIsCalculated(true);
  };

  const handleConfirmTime = (res: MatchResult) => {
    alert(`'${res.date} ${res.time}' 시간대로 일정을 확정합니다!`);
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
          <SchedulingForm onSubmit={handleCalculate} />
        </div>

        {/* 조율 결과 리포트 출력 영역 */}
        <SchedulingResults
          isCalculated={isCalculated}
          results={results}
          onConfirmTime={handleConfirmTime}
        />
      </div>
    </>
  );
}
