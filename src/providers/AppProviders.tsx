"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { UIProvider } from "./UIProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    <UIProvider>{children}</UIProvider>
  </SessionProvider>
);
