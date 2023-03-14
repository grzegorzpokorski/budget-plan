import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  size?: "default" | "large";
  variant?: "default";
  disabled?: boolean;
  onClick?: () => void;
};

const defaultStyles = twMerge(
  "inline-flex gap-1.5 justify-center items-center rounded text-white transition-colors",
  "disabled:cursor-not-allowed disabled:bg-gray-300",
);

const variants = {
  default: twMerge("bg-blue-500 hover:bg-blue-600 border-blue-500"),
} as const;

const sizes = {
  default: "py-2 px-4 text-sm",
  large: "py-2 px-4 text-base",
} as const;

export const Button = ({
  children,
  type = "button",
  variant = "default",
  size = "default",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={twMerge(defaultStyles, variants[variant], sizes[size])}
    >
      {children}
    </button>
  );
};
