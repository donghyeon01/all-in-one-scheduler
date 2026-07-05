import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }> | string;
  style?: string;
  index?: number;
}
export const Card = ({ title, description, icon: IconOrPath, style, index }: CardProps) => {
  return (
    <div className={`relative group rounded-3xl border-3 bg-muted p-6 shadow-[3px_3px_0px_0px_#1e2538] transition-all duration-300 hover:-translate-y-1 ${style || ''}`}>
      {/* 왼쪽 위 스티커 스타일의 숫자 배지 */}
      {index !==undefined && (<div className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent-purple font-black text-white border-2 border-text shadow-[2px_2px_0px_0px_#1e2538]">
          {index + 1}
  </div>)}

      {/* icon이 존재 할 때만 넘겨줌 */}
      {IconOrPath && (
        <div className="mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-milk-white border-2 shadow-[3px_3px_0px_0px_#c8dbfe] ">
          {typeof IconOrPath === "string" ? (
            // 이미지 파일 경로일 경우 img 태그 사용
            <img
              src={IconOrPath}
              alt={`${title} 아이콘`}
              className="h-7 w-7 object-contain"
            />
          ) : (
            // 아이콘 컴포넌트일 경우 컴포넌트 렌더링
            <IconOrPath className="h-7 w-7" />
          )}
        </div>
      )}

      <h3 className="mt-6 text-xl font-semibold text-text">{title}</h3>

      <p className="mt-2 text-sm font-bold text-card-foreground/80 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
