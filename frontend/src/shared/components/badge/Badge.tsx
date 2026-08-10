interface Props {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}

export default function Badge({ children, variant = "default" }: Props) {
  const variants = {
    default: "bg-surface-muted text-text-secondary",
    success: "bg-success text-success-text",
    warning: "bg-warning text-warning-text",
    danger: "bg-danger text-danger-text",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${variants[variant]}
      `}>
      {children}
    </span>
  );
}
