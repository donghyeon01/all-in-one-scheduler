interface Props {
  children: React.ReactNode;

  variant?: "default" | "success" | "warning" | "danger";
}

export default function Badge({ children, variant = "default" }: Props) {
  const variants = {
    default: "bg-slate-100 text-slate-700",

    success: "bg-success-dark text-success-foreground",

    warning: "bg-warn text-warn-foreground",

    danger: "bg-danger text-danger-foreground",
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
