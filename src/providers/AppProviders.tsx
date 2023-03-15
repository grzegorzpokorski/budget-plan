import type { ReactNode } from "react";
import { UIProvider } from "./UIProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <UIProvider>{children}</UIProvider>
);
