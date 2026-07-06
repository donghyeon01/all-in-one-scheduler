interface Props {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
}

export default function Avatar({ name, imageUrl, size = "md" }: Props) {
  const sizeClass = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-16 w-16 text-xl",
  };

  const initial = name.charAt(0);

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`
          rounded-full
          object-cover
          ${sizeClass[size]}
        `}
      />
    );
  }

  return (
    <div
      className={`
        flex
            items-center
            justify-center
            rounded-full
            bg-primary
            font-bold
            shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)]
        ${sizeClass[size]}
      `}>
      {initial}
    </div>
  );
}
