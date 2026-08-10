import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "brutal" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** 전달 시 react-router Link로 렌더링 */
  to?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  // 대시보드 기본 — 파스텔 필라형
  primary:
    "rounded-full border-2 border-primary bg-surface-muted font-semibold text-text hover:border-primary-dark hover:bg-primary",
  // 랜딩 CTA, 모달 확인 — 네오-브루탈 액센트
  brutal:
    "rounded-xl border-2 border-border-strong bg-accent text-white font-bold shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal-md",
  // 모달 취소, 보조 — 네오-브루탈 고스트
  ghost:
    "rounded-xl border-2 border-border-strong bg-surface text-text font-bold shadow-brutal-sm hover:bg-surface-muted hover:-translate-y-0.5",
  // 삭제, 거절 — 네오-브루탈 위험
  danger:
    "rounded-xl border-2 border-border-strong bg-danger text-danger-text font-bold shadow-brutal-sm hover:-translate-y-0.5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  to,
  children,
  className = "",
  ...props
}: Props) {
  const combined = `
    inline-flex items-center justify-center gap-1
    transition-all duration-200 cursor-pointer
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={combined}>
      {children}
    </button>
  );
}
