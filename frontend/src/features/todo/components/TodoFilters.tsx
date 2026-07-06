interface Props {
  current: string;
  onChange: (value: string) => void;
}

export default function TodoFilter({ current, onChange }: Props) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="mb-6 flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`
            rounded-xl
            px-4
            py-2

            ${current === filter ? "bg-primary text-white" : "border"}
          `}>
          {filter}
        </button>
      ))}
    </div>
  );
}
