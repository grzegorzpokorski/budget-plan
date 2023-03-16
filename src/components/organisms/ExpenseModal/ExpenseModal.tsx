/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUIContext } from "@/providers/UIProvider";
import { addExpenseFormSchema } from "@/shemas/shemas";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "../../molecules/Input/Input";
import { Textarea } from "@/components/molecules/Textarea/Textarea";
import { Select } from "@/components/molecules/Select/Select";

type InputsType = z.infer<typeof addExpenseFormSchema>;

export const ExpenseModal = () => {
  const { isExpenseModalOpen, closeExpenseModal, expenseModalData } =
    useUIContext();

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

  if (!isExpenseModalOpen) return null;
  return (
    <Modal
      title={expenseModalData ? "Edytuj wydatek" : "Dodaj wydatek"}
      closeModal={() => {
        closeExpenseModal();
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-6">
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
        <div className="w-full">
          <Select
            label="Wybierz budżet"
            {...register("budgetId")}
            isError={Boolean(errors.budgetId)}
            errormessage={errors.budgetId?.message || ""}
            defaultValue={expenseModalData?.budgetId}
            options={[
              {
                value: 1,
                label: "Transport",
              },
              {
                value: 2,
                label: "Jedzenie",
              },
              {
                value: 3,
                label: "Odzież",
              },
            ]}
          />
        </div>
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
            <Button type="button" variant="outline" className="w-full">
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
        {/* <FormInfo
          content="Wystąpił nieoczekiwany błąd. Spróbuj ponownie póżniej."
          error={true}
        /> */}
      </form>
    </Modal>
  );
};
