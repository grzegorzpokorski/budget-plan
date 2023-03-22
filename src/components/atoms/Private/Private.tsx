import { type ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRedirect } from "@/hooks/useRedirect";

export const Private = ({ children }: { readonly children: ReactNode }) => {
  useRedirect({ when: "unauthenticated", to: "/login" });
  const { status } = useSession();

  if (status !== "authenticated") return null;

  return <>{children}</>;
};
