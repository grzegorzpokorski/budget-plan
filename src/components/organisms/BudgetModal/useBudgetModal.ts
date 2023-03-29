import { z } from "zod";
import { useState } from "react";
import { useUIContext } from "@/providers/UIProvider";
import { useCreateBudget } from "@/hooks/queries/useCreateBudget";
import { useUpdateBudget } from "@/hooks/queries/useUpdateBudget";
import { useDeleteBudget } from "@/hooks/queries/useDeleteBudget";
import { budgetFormSchema } from "@/shemas/forms";

type BudgetFromForm = z.infer<typeof budgetFormSchema>;

export const useBudgetModal = () => {
  const { budgetModalData, closeBudgetModal } = useUIContext();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);
  const disabledForm = Boolean(error) || Boolean(success) || loadingState;
  const budgetCategories = [
    { label: "Zyski", value: "PROFIT" },
    { label: "Wydatki", value: "EXPENSE" },
  ];

  const createBudgetHook = useCreateBudget();
  const createBudget = ({ data }: { data: BudgetFromForm }) => {
    setLoadingState(true);
    createBudgetHook.mutate(
      { budget: data },
      {
        onSuccess: () => {
          setSuccess(`Pomyślnie dodano nowy budżet: "${data.name}"`);
        },
        onError: () => {
          setError(
            `Coś poszło nie tak. Spróbuj ponownie póżniej. Upewnij się, czy podany budżet już nie istnieje.`,
          );
        },
        onSettled: () => setLoadingState(false),
      },
    );
  };

  const updateBudgetHook = useUpdateBudget();
  const updateBudget = ({ id, data }: { id: number; data: BudgetFromForm }) => {
    setLoadingState(true);
    updateBudgetHook.mutate(
      { id, budget: data },
      {
        onSuccess: () => {
          setSuccess(`Pomyślnie zaktualizowano budżet.`);
        },
        onError: () => {
          setError(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
        },
        onSettled: () => setLoadingState(false),
      },
    );
  };

  const deleteBudgetHook = useDeleteBudget();
  const deleteBudget = ({ id, name }: { id: number; name: string }) => {
    const confirmed = confirm(
      `Usunięcie budżetu spowoduje również usunięcie powiązanych z nim wydatków. Czy potwierdzasz usunięcie budżetu ${name}?`,
    );

    if (!confirmed) return;

    setLoadingState(true);
    deleteBudgetHook.mutate(
      { id },
      {
        onSuccess: () => {
          setSuccess(`Pomyślnie usunięto budżet "${name}".`);
        },
        onError: () => {
          setError(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
        },
        onSettled: () => setLoadingState(false),
      },
    );
  };

  return {
    modalData: budgetModalData,
    closeModal: closeBudgetModal,
    error,
    success,
    loading: loadingState,
    disabledForm,
    formWasEdited: wasEdited,
    setFormWasEdited: (state: boolean) => setWasEdited(state),
    createBudget,
    updateBudget,
    deleteBudget,
    budgetCategories,
  };
};
