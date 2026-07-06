import React, { useEffect } from "react";

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
      {/* 2. 실제 모달 콘텐츠 영역 (안쪽 클릭 시 닫히는 현상 방지를 위해 e.stopPropagation 적용) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        {title && (
          <h2
            className="
            text-xl
            font-bold
          ">
            {title}
          </h2>
        )}
        {/* 우측 상단 X 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 z-10 font-bold">
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

// interface Props {
//   open: boolean;
//   title: string;
//   children: React.ReactNode;
//   onClose: () => void;
// }

// export default function Modal({
//   open,
//   title,
//   children,
//   onClose,
// }: Props) {
//   if (!open) return null;

//   return (
//     <div
//       className="
//       fixed
//       inset-0
//       z-50
//       flex
//       items-center
//       justify-center
//       bg-black/40
//     "
//     >
//       <div
//         className="
//         w-full
//         max-w-lg
//         rounded-2xl
//         bg-white
//         p-6
//       "
//       >
//         <div
//           className="
//           mb-4
//           flex
//           items-center
//           justify-between
//         "
//         >
//           <h2
//             className="
//             text-xl
//             font-bold
//           "
//           >
//             {title}
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-xl"
//           >
//             ×
//           </button>
//         </div>

//         {children}
//       </div>
//     </div>
//   );
// }
