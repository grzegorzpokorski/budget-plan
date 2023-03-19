"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetFormSchema } from "@/shemas/forms";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/molecules/Input/Input";
import { FormInfo } from "@/components/atoms/FormInfo/FormInfo";
import { useBudgetModal } from "@/hooks/useBudgetModal";
import { useUIContext } from "@/providers/UIProvider";

type InputsType = z.infer<typeof budgetFormSchema>;

export const BudgetModal = () => {
  const { budgetModalData, closeBudgetModal } = useUIContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(budgetFormSchema),
  });

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    console.log(data);
  };

  return (
    <Modal
      title={budgetModalData ? "Edytuj budżet" : "Dodaj nowy budżet"}
      closeModal={closeBudgetModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-6">
        <fieldset>
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
              defaultValue={budgetModalData?.maxAmount}
            />
          </div>
          <div className="flex flex-row gap-2 justify-end">
            {budgetModalData ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => null}
              >
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
        </fieldset>
      </form>
    </Modal>
  );
};
