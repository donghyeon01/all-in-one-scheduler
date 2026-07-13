import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/shared/components/header/PageHeader";
import SchedulingForm from "@/features/scheduling/components/SchedulingForm";
import SchedulingResults from "@/features/scheduling/components/SchedulingResults";
import {
  schedulingApi,
  type MatchResult,
} from "@/features/scheduling/api/schedulingApi";
import { eventsApi } from "@/features/calendar/api/eventsApi";

export default function SchedulingPage() {
  const navigate = useNavigate();
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [meetingTitle, setMeetingTitle] = useState("");

  // 스마트 일정 조율 계산 (friendIds 매개변수 추가 및 전달)
  const handleCalculate = async (data: {
    title: string;
    startDate: string;
    endDate: string;
    friendIds: number[];
  }) => {
    try {
      setMeetingTitle(data.title);
      const dataResults = await schedulingApi.calculate({
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        friendIds: data.friendIds, // 백엔드로 넘겨줌
      });
      setResults(dataResults);
      setIsCalculated(true);
    } catch (error: any) {
      console.error("일정 조율 분석 실패:", error);
      alert("일정 조율 시간대를 분석하는 데 실패했습니다.");
    }
  };

  // 일정 조율 시간대 확정
  const handleConfirmTime = async (res: MatchResult) => {
    try {
      await eventsApi.createEvent({
        title: meetingTitle || "약속 조율 확정 일정",
        startTime: res.startTime,
        endTime: res.endTime,
        location: "조율된 약속",
        allDay: false,
      });
      alert(
        `'${res.date} ${res.time}' 시간대로 일정이 캘린더에 정상 등록되었습니다.`,
      );
      navigate("/calendar");
    } catch (error: any) {
      console.error("일정 등록 실패:", error);
      alert("일정 확정 및 등록에 실패했습니다.");
    }
  };

  return (
    <>
      <PageHeader
        title="스마트 일정 조율"
        description="팀원들이나 친구들의 캘린더 빈 시간을 분석해 최적의 약속 시간을 추천합니다."
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* 입력 폼 영역 */}
        <SchedulingForm onSubmit={handleCalculate} />

        {/* 결과 분석 리스트 영역 */}
        <SchedulingResults
          isCalculated={isCalculated}
          results={results}
          onConfirmTime={handleConfirmTime}
        />
      </div>
    </>
  );
}
