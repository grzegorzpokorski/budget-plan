/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseModal } from "@/components/molecules/BaseModal/BaseModal";
import { useUIContext } from "@/providers/UIProvider";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "../Input/Input";

const inputsSchema = z.object({
  name: z.string().min(3, {
    message: "Nazwa budżetu musi składać się z co najmniej 3 znaków.",
  }),
  maxAmount: z.coerce.number().positive({
    message: "Docelowa wartość budżetu musi być większa od 0.",
  }),
});

type InputsType = z.infer<typeof inputsSchema>;

export const AddBudgetModal = () => {
  const { isAddBudgetModalOpen, closeAddBudgetModal } = useUIContext();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
  });
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    console.log(data);
    reset();
  };

  if (!isAddBudgetModalOpen) return null;
  return (
    <BaseModal title="Dodaj nowy budżet" closeModal={closeAddBudgetModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-6">
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
      </form>
    </BaseModal>
  );
};
