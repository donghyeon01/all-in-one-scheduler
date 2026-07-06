import Card from "@/shared/components/card/Card";

interface EventItem {
  id: string;

  title: string;

  start: string;
}

interface Props {
  events: EventItem[];
}

export default function UpcomingEvents({ events }: Props) {
  return (
    <Card>
      <h3
        className="
        mb-4
        font-bold
      ">
        다가오는 일정
      </h3>

      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="
              border-b
              pb-3
            ">
            <p className="font-medium">{event.title}</p>

            <p
              className="
              text-sm
              text-slate-500
            ">
              {event.start}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
