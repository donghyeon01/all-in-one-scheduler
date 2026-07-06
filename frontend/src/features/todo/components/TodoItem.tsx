import Badge from "@/shared/components/badge/Badge";
import Card from "@/shared/components/card/Card";

interface Props {
  title: string;
  completed: boolean;
  dueDate: string;
}

export default function TodoItem({ title, completed, dueDate }: Props) {
  return (
    <Card className="mb-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <input type="checkbox" checked={completed} readOnly />

          <div>
            <h3 className="font-semibold">{title}</h3>

            <p className="text-sm text-slate-500">{dueDate}</p>
          </div>
        </div>

        {completed ? (
          <Badge variant="success">완료</Badge>
        ) : (
          <Badge>진행중</Badge>
        )}
      </div>
    </Card>
  );
}
