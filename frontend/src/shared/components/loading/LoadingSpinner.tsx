interface Props {
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({ size = "md" }: Props) {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className="
      flex
      items-center
      justify-center
    ">
      <div
        className={`
          animate-spin
          rounded-full
          border-4
          border-slate-200
          border-t-primary
          ${sizes[size]}
        `}
      />
    </div>
  );
}
