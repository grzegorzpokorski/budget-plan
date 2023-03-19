"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { expenseFormSchema } from "@/shemas/forms";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "../../molecules/Input/Input";
import { Textarea } from "@/components/molecules/Textarea/Textarea";
import { Select } from "@/components/molecules/Select/Select";
import { FormInfo } from "@/components/atoms/FormInfo/FormInfo";
import { useExpenseModal } from "@/hooks/useExpenseModal";
import { useGetBudgets } from "@/hooks/useGetBudgets";
import { useUIContext } from "@/providers/UIProvider";

type InputsType = z.infer<typeof expenseFormSchema>;

export const ExpenseModal = () => {
  const { expenseModalData, closeExpenseModal } = useUIContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(expenseFormSchema),
  });

  const budgets = useGetBudgets();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    console.log(data);
  };

  return (
    <Modal
      title={expenseModalData ? "Edytuj wydatek" : "Dodaj wydatek"}
      closeModal={closeExpenseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-6">
        <fieldset>
          <div className="w-full">
            <Input
              type="text"
              label="Tytuł"
              {...register("title")}
              isError={Boolean(errors.title)}
              errormessage={errors.title?.message || ""}
              required
              defaultValue={expenseModalData?.title}
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
              defaultValue={expenseModalData?.amount}
            />
          </div>
          {budgets.data?.budgets && (
            <div className="w-full">
              <Select
                label="Wybierz budżet"
                {...register("budgetId")}
                isError={Boolean(errors.budgetId)}
                errormessage={errors.budgetId?.message || ""}
                defaultValue={expenseModalData?.budgetId}
                options={budgets.data?.budgets.map((option) => ({
                  label: option.name,
                  value: option.id,
                }))}
              />
            </div>
          )}
          <div className="w-full">
            <Textarea
              label="Dodatkowe informacje"
              {...register("description")}
              isError={Boolean(errors.description)}
              errormessage={errors.description?.message || ""}
              defaultValue={expenseModalData?.description}
            />
          </div>
          <div className="flex flex-row gap-2 justify-end">
            {expenseModalData ? (
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
              {expenseModalData ? "Aktualizuj" : "Dodaj"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Modal>
  );
};
