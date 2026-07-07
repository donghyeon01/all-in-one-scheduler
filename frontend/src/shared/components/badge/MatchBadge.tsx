interface MatchBadgeProps {
  percent: number | string;
}

export default function MatchBadge({ percent }: MatchBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-700 border border-emerald-400">
      추천도 {percent}%
    </span>
  );
}
