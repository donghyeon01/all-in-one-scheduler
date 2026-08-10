export default function CalendarMockup() {
  return (
    <div className="relative w-full max-w-md p-2">
      {/* 메인 캘린더 컴포넌트 카드 */}
      <div className="rounded-3xl border-3 border-border-strong bg-surface p-4 sm:p-6 shadow-brutal-accent">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-black text-xl text-text">📅 2026년 7월</h3>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-text border-2 border-border-strong">
            FullCalendar Custom
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="font-bold text-text-secondary">
              {day}
            </div>
          ))}

          {Array.from({ length: 31 }, (_, i) => {
            const dayNum = i + 1;
            const isSelected = dayNum === 15 || dayNum === 16 || dayNum === 17;

            return (
              <div
                key={dayNum}
                className={`flex h-8 sm:h-10 items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all
                  ${
                    isSelected
                      ? "bg-primary border-2 border-border-strong text-text"
                      : "hover:bg-surface-muted text-text-secondary"
                  }
                `}>
                {dayNum}
              </div>
            );
          })}
        </div>
      </div>

      {/* 실시간 매칭 추천 알림 팝업창 카드 */}
      <div className="absolute -bottom-4 sm:-bottom-6 right-0 sm:-right-4 w-48 sm:w-64 rounded-2xl border-3 border-border-strong bg-milk-white p-3 sm:p-4 shadow-brutal-sm">
        <span className="inline-block rounded-full bg-success-soft px-2.5 py-1 text-xs font-extrabold text-success-text border border-success">
          추천도 100%
        </span>
        <h4 className="mt-3 text-base sm:text-lg font-black text-text">
          {" "}
          최적의 시간
        </h4>
        <p className="mt-1 text-xs sm:text-sm font-bold text-text-secondary">
          7월 15일 (수)
        </p>
        <p className="font-extrabold text-accent text-sm sm:text-base">
          오후 07:00 ~ 09:00
        </p>

        <div className="mt-3 rounded-xl bg-surface border-2 border-border p-2 text-center">
          <p className="text-[10px] sm:text-xs font-bold text-text-secondary">
            참여 가능 인원
          </p>
          <p className="text-xs sm:text-sm font-black text-text">
            {" "}
            5 / 5명 참가 가능
          </p>
        </div>
      </div>
    </div>
  );
}
