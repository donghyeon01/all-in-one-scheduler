import { Link } from "react-router-dom";

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string; // 주소가 있으면 Link로 렌더링
  variant?: "purple" | "white" | "primary";
  children: React.ReactNode;
}

export default function NeoButton({
  to,
  variant = "primary",
  children,
  className = "",
  ...props
}: NeoButtonProps) {
  const baseClass =
    "rounded-2xl px-6 py-4 font-extrabold border-2 border-border-strong shadow-brutal-md hover:translate-y-[-2px] transition-all duration-200 hover:scale-105 inline-block text-center";

  const variantClasses = {
    purple: "bg-accent text-white",
    white: "bg-milk-white text-text",
    primary: "bg-primary text-text",
  };

  const combinedClass = `${baseClass} ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
}
