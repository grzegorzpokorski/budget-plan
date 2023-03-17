"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { UIProvider } from "./UIProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    <ReactQueryProvider>
      <UIProvider>{children}</UIProvider>
    </ReactQueryProvider>
  </SessionProvider>
);
