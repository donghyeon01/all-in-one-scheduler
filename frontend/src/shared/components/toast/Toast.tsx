import { useEffect } from "react";
import { Info, CheckCircle, AlertCircle } from "lucide-react";

type ToastVariant = "info" | "success" | "danger";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onClose: () => void;
  /** 자동 소멸 시간 (ms), 기본 3000 */
  duration?: number;
}

const variantClasses: Record<ToastVariant, string> = {
  info: "bg-accent text-white",
  success: "bg-success text-success-text",
  danger: "bg-danger text-danger-text",
};

const variantIcons: Record<ToastVariant, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle,
  danger: AlertCircle,
};

export default function Toast({
  message,
  variant = "info",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const Icon = variantIcons[variant];

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]
        flex items-center gap-2
        rounded-xl border-2 border-border-strong
        px-4 py-3
        text-sm font-bold
        shadow-brutal-sm
        animate-in fade-in slide-in-from-bottom-3 duration-200
        ${variantClasses[variant]}
      `}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-current opacity-70 hover:opacity-100 transition-opacity">
        ✕
      </button>
    </div>
  );
}
