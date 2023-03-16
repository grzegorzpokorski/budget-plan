import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  htmlFor: string;
};

export const Label = ({ children, htmlFor }: Props) => (
  <label
    htmlFor={htmlFor}
    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  >
    {children}
  </label>
);
