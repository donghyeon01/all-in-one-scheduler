import React from "react";

interface BaseHeaderProps {
  leftSlot?: React.ReactNode; // 로고 등이 들어갈 왼쪽 영역
  centerSlot?: React.ReactNode; // 메뉴 네비게이션이 들어갈 가운데 영역
  rightSlot?: React.ReactNode; // 로그인/회원가입 등 우측 버튼 영역
}

export default function BaseHeader({
  leftSlot,
  centerSlot,
  rightSlot,
}: BaseHeaderProps): React.JSX.Element {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 h-[76px] bg-background border-b-2 border-border px-6 flex items-center">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 items-center">
        {/* 왼쪽 영역 */}
        {leftSlot && <div className="flex justify-start">{leftSlot}</div>}

        {/* 가운데 영역 (네비게이션 바)
         */}
        {centerSlot && (
          <nav className="hidden md:flex justify-center space-x-8 h-16 items-center">
            {centerSlot}
          </nav>
        )}

        {/* 오른쪽 영역 (버튼)
         */}
        <div className="flex justify-end gap-3 text-text font-bold col-start-2 md:col-start-3">
          {rightSlot && <>{rightSlot}</>}
        </div>
      </div>
    </header>
  );
}
