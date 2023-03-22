import type { ReactNode } from "react";

export const CenterBox = ({ children }: { children: ReactNode }) => (
  <div className="max-w-sm w-full m-auto">
    <div className="flex flex-col bg-white p-8 m-3 shadow rounded">
      {children}
    </div>
  </div>
);
