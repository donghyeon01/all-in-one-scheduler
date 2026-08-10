import React from "react";

// 신규 variant: clean | brutal | brutal-accent
// 구 variant 호환: default → clean, neo/landing → brutal
type CardVariant =
  | "clean"
  | "brutal"
  | "brutal-accent"
  | "default"
  | "neo"
  | "landing";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children?: React.ReactNode;

  // brutal variant에서 사용하는 콘텐츠 속성
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }> | string;
  index?: number;
}

// 구 variant명을 신규명으로 정규화
function normalizeVariant(
  variant: CardVariant,
): "clean" | "brutal" | "brutal-accent" {
  if (variant === "default") return "clean";
  if (variant === "neo" || variant === "landing") return "brutal";
  return variant;
}

const variantClasses = {
  // 대시보드 클린 카드
  clean:
    "rounded-2xl border border-border bg-surface p-5 shadow-card text-text-secondary",
  // 랜딩 네오-브루탈 카드
  brutal:
    "rounded-3xl border-3 border-border-strong bg-surface-muted p-6 shadow-brutal-lg transition-all duration-300 hover:-translate-y-1",
  // 포인트 액센트 카드
  "brutal-accent":
    "rounded-3xl border-3 border-border-strong bg-surface p-6 shadow-brutal-accent transition-all duration-300 hover:-translate-y-1",
};

export default function Card({
  variant = "clean",
  children,
  className = "",
  title,
  description,
  icon: IconOrPath,
  index,
  ...props
}: CardProps) {
  const normalized = normalizeVariant(variant);

  // brutal variant는 index 배지, 아이콘, 타이틀/설명을 지원
  if (normalized === "brutal") {
    return (
      <div
        className={`relative group ${variantClasses.brutal} ${className}`}
        {...props}>
        {/* 왼쪽 위 스티커 스타일의 숫자 배지 */}
        {index !== undefined && (
          <div className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent font-black text-white border-2 border-border-strong shadow-brutal-sm">
            {index + 1}
          </div>
        )}

        {/* 아이콘 표시 영역 */}
        {IconOrPath && (
          <div className="mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-milk-white border-2 shadow-[3px_3px_0px_0px_var(--color-primary)]">
            {typeof IconOrPath === "string" ? (
              <img
                src={IconOrPath}
                alt={`${title || ""} 아이콘`}
                className="h-7 w-7 object-contain"
              />
            ) : (
              <IconOrPath className="h-7 w-7" />
            )}
          </div>
        )}

        {/* 타이틀과 설명글 */}
        {title && <h3 className="mt-6 text-xl font-bold text-text">{title}</h3>}
        {description && (
          <p className="mt-2 text-sm font-medium text-text-secondary leading-relaxed">
            {description}
          </p>
        )}

        {/* 자식 요소 */}
        {children}
      </div>
    );
  }

  // brutal-accent variant
  if (normalized === "brutal-accent") {
    return (
      <div
        className={`relative group ${variantClasses["brutal-accent"]} ${className}`}
        {...props}>
        {children}
      </div>
    );
  }

  // clean variant (기본)
  return (
    <div className={`${variantClasses.clean} ${className}`} {...props}>
      {children}
    </div>
  );
}
