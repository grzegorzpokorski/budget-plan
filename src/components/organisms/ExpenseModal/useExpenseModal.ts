import { z } from "zod";
import { useState } from "react";
import { useUIContext } from "@/providers/UIProvider";
import { useGetBudgets } from "@/hooks/queries/useGetBudgets";
import { useCreateExpense } from "@/hooks/queries/useCreateExpense";
import { useUpdateExpense } from "@/hooks/queries/useUpdateExpense";
import { useDeleteExpense } from "@/hooks/queries/useDeteteExpense";
import { budgetShema } from "@/shemas/queries";
import { expenseFormSchema } from "@/shemas/forms";

type Budget = z.infer<typeof budgetShema>;
type ExpenseFromForm = z.infer<typeof expenseFormSchema>;

export const useExpenseModal = () => {
  const { expenseModalData, closeExpenseModal } = useUIContext();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);

  const getBudgetsHook = useGetBudgets();
  const budgets = getBudgetsHook.data?.budgets.filter(
    (budget) => budget.category === "EXPENSE",
  );

  const disabledForm =
    Boolean(error) || Boolean(success) || loading || budgets === undefined;

  const createExpenseHook = useCreateExpense();
  const createExpense = ({ data }: { data: ExpenseFromForm }) => {
    setLoading(true);
    createExpenseHook.mutate(
      { expense: data },
      {
        onSuccess: () => {
          setSuccess(`Pomyślnie dodano nowy wydatek: "${data.title}"`);
        },
        onError: () => {
          setError(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
        },
        onSettled: () => setLoading(false),
      },
    );
  };

  const updateExpenseHook = useUpdateExpense();
  const updateExpense = ({
    id,
    data,
  }: {
    id: number;
    data: ExpenseFromForm;
  }) => {
    setLoading(true);
    updateExpenseHook.mutate(
      { id, expense: data },
      {
        onSuccess: () => {
          setSuccess(`Pomyślnie zaktualizowano wydatek.`);
        },
        onError: () => {
          setError(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
        },
        onSettled: () => setLoading(false),
      },
    );
  };

  const deleteExpenseHook = useDeleteExpense();
  const deleteExpense = ({ id, title }: { id: number; title: string }) => {
    setLoading(true);
    const confirmed = confirm(`Czy potwierdzasz usunięcie wydatku ${title}?`);

    if (!confirmed) return setLoading(false);

    setLoading(true);
    deleteExpenseHook.mutate(
      { id },
      {
        onSuccess: () => {
          setSuccess(`Pomyślnie usunięto wydatek "${title}".`);
        },
        onError: () => {
          setError(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
        },
        onSettled: () => setLoading(false),
      },
    );
  };

  return {
    modalData: expenseModalData,
    closeModal: closeExpenseModal,
    error,
    success,
    loading,
    disabledForm,
    budgets,
    formWasEdited: wasEdited,
    setFormWasEdited: (state: boolean) => setWasEdited(state),
    createExpense,
    updateExpense,
    deleteExpense,
  };
};
