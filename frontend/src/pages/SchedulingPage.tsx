import { ResultCard } from "@/shared/components/card/ResultCard";

const results = [
  {
    percent: "100",
    start: "",
    end: "",
    max: "",
    can: "",
  },
  {
    percent: "100",
    start: "",
    end: "",
    max: "",
    can: "",
  },
  {
    percent: "100",
    start: "",
    end: "",
    max: "",
    can: "",
  },
];

export default function SchedulingPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-4xl font-bold">일정 조율</h1>

      <div className="space-y-5 rounded-2xl border p-6">
        <input
          placeholder="회의 제목"
          className="
          w-full
          rounded-xl
          border
          p-3
        "
        />
        <div className="flex justify-between gap-5">
          <div className="flex-1">
            <label>시작시간</label>
            <input
              type="date"
              className="
          w-full
          rounded-xl
          border
          p-3
        "
            />
          </div>
          <div className="flex-1">
            <label>종료시간</label>
            <input
              type="date"
              className="
          w-full
          rounded-xl
          border
          p-3
        "
            />
          </div>
        </div>

        <button
          className="
          rounded-xl
          bg-primary
          px-5
          py-3
        ">
          추천 시간 찾기
        </button>
      </div>

      <div className="mt-8">
        <h2 className=" text-2xl font-bold">추천 결과</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {results.map((result) => (
            <ResultCard />
          ))}
        </div>
      </div>
    </div>
  );
}
