import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  size?: "default" | "large" | "square";
  variant?: "default" | "outline" | "white-outline";
  disabled?: boolean;
  onClick?: () => void;
};

const defaultStyles = twMerge(
  "inline-flex gap-1.5 justify-center items-center rounded text-white transition-colors",
  "disabled:cursor-not-allowed disabled:bg-gray-300",
);

const variants = {
  default: twMerge("bg-blue-500 hover:bg-blue-600 border-blue-500"),
  outline: twMerge(
    "bg-transparent hover:bg-blue-600 border-2 border-blue-500 text-blue-500 hover:text-white focus:text-white",
  ),
  "white-outline": twMerge(
    "bg-transparent hover:bg-white border-2 border-white-500 text-white hover:text-blue-500 focus:text-blue-500",
  ),
} as const;

const sizes = {
  default: "py-2 px-4 text-sm",
  large: "py-2 px-4 text-base",
  square: "p-2",
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
