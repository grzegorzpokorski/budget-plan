"use client";

import { Button } from "@/components/atoms/Button/Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub, FaGoogle, FaMoneyCheckAlt, FaSpinner } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { Input } from "../Input/Input";

export const LoginForm = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  // return <CenterBox></CenterBox>;

  if (status !== "unauthenticated") {
    return (
      <div className="max-w-[380px] w-full m-auto">
        <div className="flex flex-col items-center bg-white py-8 px-8 m-3 shadow rounded">
          <section className="flex flex-col items-center gap-4">
            <header className="flex flex-col items-center mt-4">
              <h1 className="font-bold flex flex-row items-center">
                <FaMoneyCheckAlt className="text-2xl mr-2" />
                Budget<span className="font-normal">Plan</span>
              </h1>
              <p className="text-center text-base mt-2">
                Trzymaj swój budżet pod kontrolą.
              </p>
            </header>
            <hr
              className={twMerge("relative bg-neutral-300 h-0.5 w-full my-2")}
            />
            <span
              role="status"
              className="flex flex-row items-center justify-center gap-2 h-9"
            >
              Ładowanie <FaSpinner className="animate-spin" />
            </span>
          </section>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-[380px] w-full m-auto">
      <div className="flex flex-col items-center bg-white py-8 px-8 m-3 shadow rounded">
        <section className="flex flex-col items-center gap-4">
          <header className="flex flex-col items-center mt-4">
            <h1 className="font-bold flex flex-row items-center">
              <FaMoneyCheckAlt className="text-2xl mr-2" />
              Budget<span className="font-normal">Plan</span>
            </h1>
            <p className="text-center text-base mt-2">
              Trzymaj swój budżet pod kontrolą.
            </p>
          </header>
          <hr
            className={twMerge("relative bg-neutral-300 h-0.5 w-full my-2")}
          />
          <form>
            <fieldset
              disabled={status !== "unauthenticated"}
              className="flex flex-col"
            >
              <div className="w-full">
                <Input
                  label="email"
                  isError={false}
                  type="email"
                  errormessage="podaj prawidłowy adres email"
                  onChange={() => null}
                  placeholder="adres@email.com"
                />
              </div>
              <Button type="submit" size="large">
                Zaloguj się emailem
              </Button>
            </fieldset>
          </form>
          <hr
            className={twMerge("relative bg-neutral-300 h-0.5 w-full my-2")}
          />
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => void signIn("github", { callbackUrl: "/" })}
              disabled={status !== "unauthenticated"}
              variant="github"
              size="large"
            >
              Zaloguj się kontem Github <FaGithub />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
