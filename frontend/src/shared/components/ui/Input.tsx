import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "default" | "brutal";
}

const variantClasses = {
  // 대시보드 인풋 — 클린
  default: "rounded-xl border border-border bg-surface focus:border-accent",
  // 랜딩/모달 인풋 — 네오-브루탈
  brutal:
    "rounded-xl border-2 border-border-strong bg-surface shadow-brutal-sm focus:border-accent",
};

export default function Input({
  label,
  variant = "default",
  className = "",
  ...props
}: Props) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-text-secondary">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          px-4
          py-3
          outline-none
          transition
          ${variantClasses[variant]}
          ${className}
        `}
      />
    </div>
  );
}
