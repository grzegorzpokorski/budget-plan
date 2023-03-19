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

type InputsType = z.infer<typeof expenseFormSchema>;

export const ExpenseModal = () => {
  const {
    isOpen,
    closeModal,
    modalData,
    update,
    remove,
    create,
    resetQueries,
  } = useExpenseModal();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(expenseFormSchema),
  });
  const onCloseModal = () => {
    closeModal();
    reset();
    resetQueries();
  };

  const budgets = useGetBudgets();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    if (modalData) {
      update({
        id: modalData.id,
        expense: data,
      });
      onCloseModal();
      return;
    }

    create({ expense: data });
    onCloseModal();
  };

  if (!isOpen) return null;
  return (
    <Modal
      title={modalData ? "Edytuj wydatek" : "Dodaj wydatek"}
      closeModal={onCloseModal}
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
              defaultValue={modalData?.title}
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
              defaultValue={modalData?.amount}
            />
          </div>
          {budgets.data?.budgets && (
            <div className="w-full">
              <Select
                label="Wybierz budżet"
                {...register("budgetId")}
                isError={Boolean(errors.budgetId)}
                errormessage={errors.budgetId?.message || ""}
                defaultValue={modalData?.budgetId}
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
              defaultValue={modalData?.description}
            />
          </div>
          <div className="flex flex-row gap-2 justify-end">
            {modalData ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  remove({ id: modalData.id });
                  onCloseModal();
                }}
              >
                Usuń
              </Button>
            ) : (
              <Button type="reset" variant="outline" className="w-full">
                Reset
              </Button>
            )}
            <Button type="submit" className="w-full">
              {modalData ? "Aktualizuj" : "Dodaj"}
            </Button>
          </div>
        </fieldset>
        {/* {deleteExpense.isSuccess && (
          <FormInfo
            content={`Pomyślnie usunięto wydatek: "${modalData?.title}"!`}
            error={false}
          />
        )}
        {updateExpense.isSuccess && (
          <FormInfo
            content={`Pomyślnie edytowano wydatek: "${modalData?.title}"!`}
            error={false}
          />
        )}
        {createExpense.isSuccess && (
          <FormInfo content={`Pomyślnie dodano wydatek.`} error={false} />
        )}
        {(deleteExpense.isError ||
          updateExpense.isError ||
          createExpense.isError) && (
          <FormInfo
            content={`Coś poszło nie tak. Spróbuj ponownie póżniej.`}
            error
          />
        )} */}
      </form>
    </Modal>
  );
};
