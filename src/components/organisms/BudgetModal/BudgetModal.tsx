"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBudgetFormSchema } from "@/shemas/shemas";
import { useUIContext } from "@/providers/UIProvider";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/molecules/Input/Input";
import { FormInfo } from "@/components/atoms/FormInfo/FormInfo";

type InputsType = z.infer<typeof addBudgetFormSchema>;

export const BudgetModal = () => {
  const { isBudgetModalOpen, closeBudgetModal, budgetModalData } =
    useUIContext();

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

  if (!isBudgetModalOpen) return null;

  return (
    <Modal
      title={budgetModalData ? "Edytuj budżet" : "Dodaj nowy budżet"}
      closeModal={() => {
        closeBudgetModal();
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
            defaultValue={budgetModalData?.name}
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
            defaultValue={budgetModalData?.max}
          />
        </div>
        <div className="flex flex-row gap-2 justify-end">
          {budgetModalData ? (
            <Button type="button" variant="outline" className="w-full">
              Usuń
            </Button>
          ) : (
            <Button type="reset" variant="outline" className="w-full">
              Reset
            </Button>
          )}
          <Button type="submit" className="w-full">
            {budgetModalData ? "Aktualizuj" : "Dodaj"}
          </Button>
        </div>
        {/* <FormInfo
          content="Wystąpił nieoczekiwany błąd. Spróbuj ponownie póżniej."
          error={true}
          textCenter
        /> */}
      </form>
    </Modal>
  );
};
