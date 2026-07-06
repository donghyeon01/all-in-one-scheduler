import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  // 'default'는 기존 투두/캘린더용 스타일, 'neo'는 랜딩 페이지용 네오브루탈리즘 스타일
  variant?: "default" | "neo";
}

export default function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  // 기본 스타일 정의 (둥근 모서리, 배경색 등)
  const baseStyle = "w-full transition-all duration-200";

  // variant에 따른 스타일 분기
  const variantStyles = {
    default: "rounded-2xl border border-border bg-white p-5 shadow-sm",
    neo: "rounded-[32px] border-4 border-text bg-white p-8 shadow-[8px_8px_0px_0px_#1e2538] hover:translate-y-[-2px]",
  };

  return (
    <div
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}>
      {children}
    </div>
  );
}
