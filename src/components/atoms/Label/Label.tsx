import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  htmlFor: string;
  hiddenLabel?: boolean;
};

export const Label = ({ children, htmlFor, hiddenLabel }: Props) => (
  <label
    htmlFor={htmlFor}
    className={twMerge(
      "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
      hiddenLabel && "sr-only",
    )}
  >
    {children}
  </label>
);
