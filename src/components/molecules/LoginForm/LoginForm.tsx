"use client";

import { Button } from "@/components/atoms/Button/Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub, FaMoneyCheckAlt, FaSpinner } from "react-icons/fa";

export const LoginForm = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  return (
    <div className="max-w-xs w-full bg-white shadow py-14 px-8 m-auto rounded">
      <div className="flex flex-col items-center">
        <h1 className="font-bold flex flex-row items-center">
          <FaMoneyCheckAlt className="text-2xl mr-2" />
          Budget<span className="font-normal">Plan</span>
        </h1>
        <p className="text-center text-base mt-2">
          Trzymaj swój budżet pod kontrolą.
        </p>
        <LoginButtons />
      </div>
    </div>
  );
};

export const LoginButtons = () => {
  const { status } = useSession();

  if (status !== "unauthenticated") {
    return (
      <span
        role="status"
        className="flex flex-row items-center justify-center gap-2 mt-3 h-9"
      >
        Ładowanie <FaSpinner className="animate-spin" />
      </span>
    );
  }

  return (
    <div className="mt-3">
      <Button
        onClick={() => void signIn("github", { callbackUrl: "/" })}
        disabled={status !== "unauthenticated"}
      >
        Zaloguj się przez Githuba <FaGithub />
      </Button>
    </div>
  );
};
