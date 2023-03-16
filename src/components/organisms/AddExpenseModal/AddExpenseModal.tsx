/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUIContext } from "@/providers/UIProvider";
import { addExpenseFormSchema } from "@/shemas/shemas";
import { BaseModal } from "@/components/molecules/BaseModal/BaseModal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "../../molecules/Input/Input";
import { Textarea } from "@/components/molecules/Textarea/Textarea";

type InputsType = z.infer<typeof addExpenseFormSchema>;

export const AddExpenseModal = () => {
  const { isAddExpenseModalOpen, closeAddExpenseModal } = useUIContext();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(addExpenseFormSchema),
  });

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    console.log(data);
    reset();
  };

  if (!isAddExpenseModalOpen) return null;

  return (
    <BaseModal title="Dodaj wydatek" closeModal={closeAddExpenseModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-6">
        <div className="w-full">
          <Input
            type="text"
            label="Tytuł"
            {...register("title")}
            isError={Boolean(errors.title)}
            errormessage={errors.title?.message || ""}
            required
          />
        </div>
        <div className="w-full">
          <Input
            type="number"
            label="Wartość"
            {...register("amount")}
            isError={Boolean(errors.amount)}
            errormessage={errors.amount?.message || ""}
            required
            step={0.01}
            min={0.01}
          />
        </div>
        <div className="w-full">
          <Input
            type="text"
            label="Wybierz budżet"
            {...register("budget")}
            isError={Boolean(errors.budget)}
            errormessage={errors.budget?.message || ""}
            required
            step={0.01}
            min={0.01}
          />
        </div>
        <div className="w-full">
          <Textarea
            label="Dodatkowe informacje"
            {...register("description")}
            isError={Boolean(errors.description)}
            errormessage={errors.description?.message || ""}
          />
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <Button type="reset" variant="outline" className="w-full">
            Reset
          </Button>
          <Button type="submit" className="w-full">
            Dodaj
          </Button>
        </div>
        {/* <FormInfo
          content="Wystąpił nieoczekiwany błąd. Spróbuj ponownie póżniej."
          error={true}
        /> */}
      </form>
    </BaseModal>
  );
};
