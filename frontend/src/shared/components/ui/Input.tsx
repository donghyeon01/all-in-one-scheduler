import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", ...props }: Props) {
  return (
    <div className="w-full">
      {label && (
        <label
          className="
          mb-2
          block
          text-sm
          font-medium
        ">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          outline-none
          transition
          focus:border-primary
          ${className}
        `}
      />
    </div>
  );
}
