import Card from "@/shared/components/card/Card";

interface Props {
  total: number;
  active: number;
  completed: number;
}

export default function TodoStats({ total, active, completed }: Props) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <Card>
        <p className="text-sm text-slate-500">전체 작업</p>

        <h2 className="mt-2 text-3xl font-bold">{total}</h2>
      </Card>

      <Card>
        <p className="text-sm text-slate-500">진행중</p>

        <h2 className="mt-2 text-3xl font-bold">{active}</h2>
      </Card>

      <Card>
        <p className="text-sm text-slate-500">완료</p>

        <h2 className="mt-2 text-3xl font-bold">{completed}</h2>
      </Card>
    </div>
  );
}
