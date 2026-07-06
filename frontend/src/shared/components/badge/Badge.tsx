interface Props {
  children: React.ReactNode;

  variant?: "default" | "success" | "warning" | "danger";
}

export default function Badge({ children, variant = "default" }: Props) {
  const variants = {
    default: "bg-slate-100 text-slate-700",

    success: "bg-green-100 text-green-700",

    warning: "bg-yellow-100 text-yellow-700",

    danger: "bg-red-100 text-red-700",
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
