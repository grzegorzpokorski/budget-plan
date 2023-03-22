"use client";

import { Button } from "@/components/atoms/Button/Button";
import { CenterBox } from "@/components/atoms/CenterBox/CenterBox";
import { Input } from "@/components/molecules/Input/Input";
import { useRedirectAuthenticated } from "@/hooks/useRedirectAuthenticated";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub, FaMoneyCheckAlt } from "react-icons/fa";
import { z } from "zod";

type InputsType = {
  email: string;
};

const loginFormSchema = z.object({
  email: z.string().email({ message: "Nie poprawny adres email." }),
});

export const LoginPage = () => {
  useRedirectAuthenticated({ path: "/" });
  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<InputsType> = async (data) => {
    const email = data.email;
    await signIn("email", { email, callbackUrl: "/check-email" });
  };

  return (
    <CenterBox>
      <section className="flex flex-col gap-4">
        <header className="flex flex-col items-center gap-2 py-4">
          <h1 className="flex flex-row items-center font-bold text-xl">
            <FaMoneyCheckAlt className="text-2xl mr-2" />
            Budget<span className="font-normal">Plan</span>
          </h1>
          <p className="text-sm">Trzymaj swój budżet pod kontrolą.</p>
        </header>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className="flex flex-col"
            disabled={status !== "unauthenticated"}
          >
            <Input
              type="email"
              errormessage={errors.email?.message || ""}
              label="Email"
              isError={Boolean(errors.email)}
              placeholder="adres@email.com"
              hiddenLabel
              textCenter
              {...register("email")}
            />
            <Button type="submit">Zaloguj się emailem</Button>
          </fieldset>
        </form>
        <hr />
        <Button
          variant="github"
          disabled={status !== "unauthenticated"}
          onClick={async () => await signIn("github", { callbackUrl: "/" })}
        >
          Zaloguj się kontem Github
          <FaGithub />
        </Button>
      </section>
    </CenterBox>
  );
};
