interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      rounded-2xl
      border-2
      border-dashed
      border-border
      p-10
      text-center
    ">
      <p className="text-lg font-semibold text-text">{title}</p>

      {description && (
        <p className="mt-2 text-sm text-text-secondary">{description}</p>
      )}
    </div>
  );
}
