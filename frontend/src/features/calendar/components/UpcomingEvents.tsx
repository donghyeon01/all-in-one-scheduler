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
      <h3 className="mb-4 font-bold text-text">다가오는 일정</h3>

      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="border-b border-border pb-3">
            <p className="font-medium text-text">{event.title}</p>
            <p className="text-sm text-text-secondary">{event.start}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
