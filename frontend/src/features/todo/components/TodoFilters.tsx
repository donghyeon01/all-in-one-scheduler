interface Props {
  current: string;
  onChange: (value: string) => void;
}

export default function TodoFilter({ current, onChange }: Props) {
  const filters = ["전체", "진행 중", "완료"];

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`
            rounded-full
            px-4
            py-2
            border-2
            border-border
            font-semibold
            transition-all duration-200

            ${current === filter ? "bg-surface-muted text-text shadow-brutal-sm" : "text-text-secondary hover:text-text"}
          `}>
          {filter}
        </button>
      ))}
    </div>
  );
}
