"use client";

import Link from "next/link";
import { CenterBox } from "@/components/atoms/CenterBox/CenterBox";
import { useRedirectAuthenticated } from "@/hooks/useRedirectAuthenticated";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/molecules/Loader/loader";

export const CheckEmailPage = () => {
  useRedirectAuthenticated({ path: "/" });
  const { status } = useSession();

  return (
    <CenterBox>
      <section className="flex flex-col gap-4">
        <header className="flex flex-col items-center gap-2 py-4">
          <Link href="/">
            <h1 className="flex flex-row items-center font-bold text-xl">
              <FaMoneyCheckAlt className="text-2xl mr-2" />
              Budget<span className="font-normal">Plan</span>
            </h1>
          </Link>
          <p className="text-sm">Trzymaj swój budżet pod kontrolą.</p>
        </header>
        {status !== "unauthenticated" ? (
          <Loader />
        ) : (
          <p className="text-center border-y-2 py-6">
            Link do logowania został wysłany na podany adres e-mail.
          </p>
        )}
      </section>
    </CenterBox>
  );
};
