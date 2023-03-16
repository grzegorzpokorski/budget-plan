/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBudgetFormSchema } from "@/shemas/shemas";
import { useUIContext } from "@/providers/UIProvider";
import { BaseModal } from "@/components/molecules/BaseModal/BaseModal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "../../molecules/Input/Input";
import { FormInfo } from "@/components/atoms/FormInfo/FormInfo";

type InputsType = z.infer<typeof addBudgetFormSchema>;

export const AddBudgetModal = () => {
  const { isAddBudgetModalOpen, closeAddBudgetModal } = useUIContext();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(addBudgetFormSchema),
  });

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    console.log(data);
    reset();
  };

  if (!isAddBudgetModalOpen) return null;

  return (
    <BaseModal
      title="Dodaj nowy budżet"
      closeModal={() => {
        closeAddBudgetModal();
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-6">
        <div className="w-full">
          <Input
            type="text"
            label="Nazwa budżetu"
            {...register("name")}
            isError={Boolean(errors.name)}
            errormessage={errors.name?.message || ""}
            required
          />
        </div>
        <div className="w-full">
          <Input
            type="number"
            label="Docelowa wartość"
            {...register("maxAmount")}
            isError={Boolean(errors.maxAmount)}
            errormessage={errors.maxAmount?.message || ""}
            required
            step={0.01}
            min={0.01}
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
          textCenter
        /> */}
      </form>
    </BaseModal>
  );
};
