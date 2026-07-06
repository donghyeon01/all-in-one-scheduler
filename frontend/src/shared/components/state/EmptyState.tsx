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
      border
      border-dashed
      p-10
      text-center
    ">
      <p
        className="
        text-lg
        font-semibold
      ">
        {title}
      </p>

      {description && (
        <p
          className="
          mt-2
          text-sm
          text-slate-500
        ">
          {description}
        </p>
      )}
    </div>
  );
}
