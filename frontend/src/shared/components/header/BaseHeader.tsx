import React, { useState } from "react";
import { Menu, X } from "lucide-react";

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
  // 모바일 드롭다운 메뉴 열림 상태
  // 라우트가 바뀌면 상위(MainHeader)에서 key를 변경해 이 컴포넌트가 remount되면서
  // isMobileMenuOpen이 false로 초기화됩니다.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background border-b-2 border-border">
      <div className="h-[76px] px-4 sm:px-6 flex items-center">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 items-center">
          {/* 왼쪽 영역 */}
          {leftSlot && <div className="flex justify-start">{leftSlot}</div>}

          {/* 가운데 영역 (네비게이션 바) - 데스크탑 전용
           */}
          {centerSlot && (
            <nav className="hidden md:flex justify-center space-x-8 h-16 items-center">
              {centerSlot}
            </nav>
          )}

          {/* 오른쪽 영역 (버튼 + 모바일 메뉴 토글)
           */}
          <div className="flex justify-end items-center gap-2 sm:gap-3 text-text font-bold col-start-2 md:col-start-3">
            {rightSlot && <>{rightSlot}</>}

            {centerSlot && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={isMobileMenuOpen}
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border-2 border-border text-text transition hover:bg-primary-bg">
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 모바일 전용 드롭다운 네비게이션 */}
      {centerSlot && isMobileMenuOpen && (
        <nav className="md:hidden flex flex-col gap-1 border-t border-border bg-background px-4 py-3">
          {centerSlot}
        </nav>
      )}
    </header>
  );
}
