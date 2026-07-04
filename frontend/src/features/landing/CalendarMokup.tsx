export function CalendarMockups() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* Calendar */}
      <div
        className="
          rounded-3xl
          border
          border-border
          bg-white
          p-6
          shadow-xl
        ">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-bold text-lg">July 2026</h3>

          <span className="rounded-full bg-primary-soft px-3 py-1 text-sm">
            Calendar
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="font-semibold text-muted-foreground">
              {day}
            </div>
          ))}

          {Array.from({ length: 35 }, (_, i) => {
            const date = i + 1;

            const selected = date === 15 || date === 16 || date === 17;

            return (
              <div
                key={date}
                className={`
                  flex
                  h-10
                  items-center
                  justify-center
                  rounded-xl
                  text-sm
                  ${
                    selected
                      ? "bg-primary font-semibold"
                      : "hover:bg-primary-soft"
                  }
                `}>
                {date}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendation Card */}

      <div
        className="
          absolute
          -bottom-8
          -right-8
          w-72
          rounded-3xl
          border
          border-border
          bg-white
          p-5
          shadow-2xl
        ">
        <span
          className="
            rounded-full
            bg-green-100
            px-3
            py-1
            text-sm
            font-semibold
            text-green-700
          ">
          추천도 100%
        </span>

        <h4 className="mt-4 text-xl font-bold">추천 일정</h4>

        <p className="mt-2 text-muted-foreground">7월 15일</p>

        <p className="font-semibold">19:00 ~ 21:00</p>

        <div className="mt-4 rounded-2xl bg-primary-soft p-3">
          <p className="text-sm text-muted-foreground">참여 가능 인원</p>

          <p className="text-lg font-bold">5 / 5</p>
        </div>
      </div>
    </div>
  );
}

export default function CalendarMockup() {
  return (
    <div className="relative w-full max-w-md p-2">
      {/* 메인 캘린더 컴포넌트 카드 */}
      <div className="rounded-[32px] border-3 border-text bg-white p-6 shadow-[6px_6px_0px_0px_#c8dbfe]">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-black text-xl text-text">📅 2026년 7월</h3>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground border-2 border-secondary-foreground">
            FullCalendar Custom
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="font-bold text-text-gray">
              {day}
            </div>
          ))}

          {Array.from({ length: 31 }, (_, i) => {
            const date = i + i; // 날짜 배치용 더미 인덱스
            const dayNum = i + 1;
            const isSelected = dayNum === 15 || dayNum === 16 || dayNum === 17;

            return (
              <div
                key={dayNum}
                className={`flex h-10 items-center justify-center rounded-xl text-sm font-bold transition-all
                  ${
                    isSelected
                      ? "bg-primary border-2 border-text text-text"
                      : "hover:bg-primary-light text-text-gray"
                  }
                `}>
                {dayNum}
              </div>
            );
          })}
        </div>
      </div>

      {/* 실시간 매칭 추천 알림 팝업창 카드 */}
      <div className="absolute -bottom-6 -right-4 w-64 rounded-2xl border-3 border-text bg-milk-white p-4 shadow-[3px_3px_0px_0px_#7b61ff]">
        <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-700 border border-emerald-400">
          추천도 100%
        </span>
        <h4 className="mt-3 text-lg font-black text-text"> 최적의 시간</h4>
        <p className="mt-1 text-sm font-bold text-text-gray">7월 15일 (수)</p>
        <p className="font-extrabold text-accent-purple">오후 07:00 ~ 09:00</p>

        <div className="mt-3 rounded-xl bg-white border-2  border-border p-2 text-center">
          <p className="text-xs font-bold text-text-gray">참여 가능 인원</p>
          <p className="text-sm font-black text-text"> 5 / 5명 참가 가능</p>
        </div>
      </div>
    </div>
  );
}
