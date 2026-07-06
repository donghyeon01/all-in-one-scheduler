import Card from "@/shared/components/card/Card";

export default function CalendarSidebar() {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-bold">이번 주 일정</h3>

        <p
          className="
          mt-2
          text-sm
          text-slate-500
        ">
          예정된 일정 4개
        </p>
      </Card>

      <Card>
        <h3 className="font-bold">다가오는 마감</h3>

        <p className="mt-2">프로젝트 발표</p>

        <p
          className="
          text-sm
          text-red-500
        ">
          D-5
        </p>
      </Card>
    </div>
  );
}
