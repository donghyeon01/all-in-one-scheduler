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
            font-semibold
            

            ${current === filter ? "bg-success-muted text-black shadow-[1px_1px_0px_0px]" : "font-bold text-primary-dark"}
          `}>
          {filter}
        </button>
      ))}
    </div>
  );
}
