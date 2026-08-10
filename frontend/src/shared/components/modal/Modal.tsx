import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps): React.JSX.Element | null {
  // 모달이 열려있을 때 배경 페이지 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // 1. 어두운 배경 영역 (클릭 시 onClose 호출로 모달 닫힘)
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* 2. 실제 모달 콘텐츠 영역 (안쪽 클릭 시 닫히는 현상 방지) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200 rounded-3xl border-2 border-border bg-surface p-5 sm:p-8 shadow-brutal-md">
        {title && <h2 className="text-xl font-bold text-text">{title}</h2>}
        {/* 우측 상단 X 닫기 버튼 (Lucide 아이콘) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 text-text-muted hover:text-text z-10 transition-colors">
          <X className="h-5 w-5" />
        </button>

        {children}
      </div>
    </div>
  );
}
