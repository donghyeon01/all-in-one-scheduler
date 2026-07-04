import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }> | string;
}
export const Card = ({ title, description, icon: IconOrPath }: CardProps) => {
  return (
    <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* icon이 존재 할 때만 넘겨줌 */}
      {IconOrPath && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-bg">
          {typeof IconOrPath === "string" ? (
            // 이미지 파일 경로일 경우 img 태그 사용
            <img
              src={IconOrPath}
              alt={`${title} 아이콘`}
              className="h-7 w-7 object-contain"
            />
          ) : (
            // 아이콘 컴포넌트일 경우 컴포넌트 렌더링
            <IconOrPath className="h-7 w-7 text-slate-700" />
          )}
        </div>
      )}

      <h3 className="mt-6 text-xl font-semibold text-text">{title}</h3>

      <p className="mt-3 leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
