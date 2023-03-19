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
import { Loader } from "@/components/molecules/Loader/loader";
import { useExpenseModal } from "@/hooks/useExpenseModal";
import { useGetBudgets } from "@/hooks/useGetBudgets";
import { useCreateExpense } from "@/hooks/useCreateExpense";
import { useUpdateExpense } from "@/hooks/useUpdateExpense";
import { useDeleteExpense } from "@/hooks/useDeteteExpense";

type InputsType = z.infer<typeof expenseFormSchema>;

export const ExpenseModal = () => {
  const {
    modalData,
    budgets,
    closeModal,
    success,
    setSuccessMessage,
    error,
    setErrorMessage,
    loading,
    setLoading,
  } = useExpenseModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(expenseFormSchema),
  });

  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    setLoading(true);

    if (!modalData) {
      createExpense.mutate(
        { expense: data },
        {
          onSuccess: () => {
            setSuccessMessage(`Pomyślnie dodano nowy wydatek: "${data.title}"`);
          },
          onError: () => {
            setErrorMessage(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
          },
          onSettled: () => setLoading(false),
        },
      );
    }

    if (modalData) {
      updateExpense.mutate(
        { id: modalData.id, expense: data },
        {
          onSuccess: () => {
            setSuccessMessage(`Pomyślnie zaktualizowano wydatek.`);
          },
          onError: () => {
            setErrorMessage(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
          },
          onSettled: () => setLoading(false),
        },
      );
    }
  };

  const disabled = Boolean(error) || Boolean(success);

  return (
    <Modal
      title={modalData ? "Edytuj wydatek" : "Dodaj wydatek"}
      closeModal={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-6">
        <fieldset disabled={disabled}>
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
                  const confirmed = confirm(
                    `Czy potwierdzasz usunięcie wydatku ${modalData.title}?`,
                  );

                  if (!confirmed) return;

                  setLoading(true);
                  deleteExpense.mutate(
                    { id: modalData.id },
                    {
                      onSuccess: () => {
                        setSuccessMessage(
                          `Pomyślnie usunięto wydatek "${modalData.title}".`,
                        );
                      },
                      onError: () => {
                        setErrorMessage(
                          `Coś poszło nie tak. Spróbuj ponownie póżniej.`,
                        );
                      },
                      onSettled: () => setLoading(false),
                    },
                  );
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
        {success && <FormInfo content={success} error={false} />}
        {error && <FormInfo content={error} error={true} />}
        {loading && (
          <div className="mt-4">
            <Loader />
          </div>
        )}
      </form>
    </Modal>
  );
};
