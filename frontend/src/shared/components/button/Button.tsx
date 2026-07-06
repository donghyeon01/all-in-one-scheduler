import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`
        rounded-full
        border-2
        border-primary
        px-4
        py-2
        font-semibold
        hover:border-primary-dark
        transition-all duration-200 
        cursor-pointer
        ${className}
      `}>
      {children}
    </button>
  );
}
