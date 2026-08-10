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
      <span className="inline-block rounded-full bg-surface-muted border-2 border-border px-4 py-2 text-sm font-bold text-text-secondary">
        {badge}
      </span>
      <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-text leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg font-medium text-text-secondary max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
