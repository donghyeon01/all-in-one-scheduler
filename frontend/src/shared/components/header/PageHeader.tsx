interface Props {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: Props) {
  return (
    <div
      className="
      mb-8
      flex
      items-center
      justify-between
      gap-4
    ">
      <div>
        <h1
          className="
          text-4xl
          font-bold
        ">
          {title}
        </h1>

        {description && (
          <p
            className="
            mt-2
            text-slate-500
          ">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}
