import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <main className="pb-16 md:pt-16 md:pb-0">{children}</main>;
}
