import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children: ReactNode;
  as?: "div";
  className?: string;
};

export const Container = ({
  as: Tag = "div",
  children,
  className,
}: ContainerProps) => (
  <Tag className={twMerge("max-w-2xl w-full mx-auto px-3", className)}>
    {children}
  </Tag>
);
