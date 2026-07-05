export default function CalendarPage() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Calendar</h1>
          <p className="mt-2 text-text-gray">일정을 한눈에 확인하세요.</p>
        </div>

        <button
          className="
          rounded-xl
          bg-primary
          px-5
          py-3
        ">
          일정 추가
        </button>
      </div>
      <div
        className="
        grid
        grid-cols-7
        gap-2
      ">
        {days.map((day) => (
          <div
            key={day}
            className="
            min-h-[120px]
            rounded-xl
            border-2
            border-primary
            bg-white
            p-2
          ">
            <span className="font-semibold">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
