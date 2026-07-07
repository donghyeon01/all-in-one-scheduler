import React from "react";

// 공통 카드 프롭스 확장
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "neo" | "landing"; // 'landing' variant 추가
  children?: React.ReactNode;

  // 기존 LandingCard에서 쓰던 속성들을 선택적(Optional)으로 추가
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }> | string;
  index?: number;
}

export default function LandingCard({
  variant = "default",
  children,
  className = "",
  title,
  description,
  icon: IconOrPath,
  index,
  ...props
}: CardProps) {
  // 1. 기존 LandingCard 디자인 (landing 또는 neo)
  if (variant === "landing" || variant === "neo") {
    return (
      <div
        className={`relative group rounded-3xl border-3 bg-muted p-6 shadow-[3px_3px_0px_0px_#1e2538] transition-all duration-300 hover:-translate-y-1 ${className}`}
        {...props}>
        {/* 왼쪽 위 스티커 스타일의 숫자 배지 */}
        {index !== undefined && (
          <div className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent-purple font-black text-white border-2 border-text shadow-[2px_2px_0px_0px_#1e2538]">
            {index + 1}
          </div>
        )}

        {/* 아이콘 표시 영역 */}
        {IconOrPath && (
          <div className="mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-milk-white border-2 shadow-[3px_3px_0px_0px_#c8dbfe]">
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
        {title && (
          <h3 className="mt-6 text-xl font-semibold text-text">{title}</h3>
        )}
        {description && (
          <p className="mt-2 text-sm font-bold text-card-foreground/80 leading-relaxed">
            {description}
          </p>
        )}

        {/* 만약 자식이 따로 들어온다면 같이 렌더링 */}
        {children}
      </div>
    );
  }

  // 2. 대시보드/일반 페이지에서 쓰던 기본 Card 디자인
  return (
    <div
      className={`rounded-2xl border bg-card p-5 shadow-sm text-card-foreground ${className}`}
      {...props}>
      {children}
    </div>
  );
}
