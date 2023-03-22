"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRedirectAuthenticated = ({ path }: { path: string }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(path);
    }
  }, [path, router, status]);
};
