interface MatchBadgeProps {
  percent: number;
}

export default function MatchBadge({ percent }: MatchBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-success-soft px-2.5 py-1 text-xs font-extrabold text-success-text border border-success">
      추천도 {percent}%
    </span>
  );
}
