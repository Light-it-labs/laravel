import { twMerge as tw } from "tailwind-merge";

export const IconWrapper = ({
  size = "md",
  className,
  style,
  children,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <div
    className={tw(
      "items-center flex flex-row",
      size === "sm" && "h-5 w-5",
      size === "md" && "h-6 w-6",
      size === "lg" && "h-6 w-6",
      size === "xl" && "h-10 w-10",
      className,
    )}
    style={style}
  >
    {children}
  </div>
);
