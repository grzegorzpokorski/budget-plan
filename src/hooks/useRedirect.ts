"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type UseRedirectArgs = {
  when: "unauthenticated" | "authenticated";
  to: string;
};

export const useRedirect = ({ when, to }: UseRedirectArgs) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === when) {
      router.push(to);
    }
  }, [router, status, to, when]);
};
