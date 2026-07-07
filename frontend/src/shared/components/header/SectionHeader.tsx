interface SectionHeaderProps {
  badge: string;
  title: string | React.ReactNode;
  description?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center mb-16">
      <span className="rounded-full bg-primary/30 px-4 py-2 text-2xl border-2 font-semibold text-slate-700 inline-block">
        {badge}
      </span>
      <h2 className="mt-6 text-3xl sm:text-4xl font-black text-text leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg font-medium text-text-gray max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
