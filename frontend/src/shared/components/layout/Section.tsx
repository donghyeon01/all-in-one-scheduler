import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "white" | "muted" | "primary"; // 배경색 분기용
  hasBorder?: boolean;
}

export default function Section({
  children,
  variant = "white",
  hasBorder = true,
  className = "",
  ...props
}: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    muted: "bg-background", // #f8fbff
    primary: "bg-primary-bg", // #edf4ff
  };

  return (
    <section
      className={`py-20 ${bgClasses[variant]} ${hasBorder ? "border-b-2 border-border" : ""} overflow-hidden ${className}`}
      {...props}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}
