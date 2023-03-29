import { z } from "zod";
import { useState } from "react";
import { FinanceModalType, useUIContext } from "@/providers/UIProvider";
import { useGetBudgets } from "@/hooks/queries/useGetBudgets";
import { useCreateFinance } from "@/hooks/queries/useCreateFinance";
import { useUpdateFinance } from "@/hooks/queries/useUpdateFinance";
import { useDeleteFinance } from "@/hooks/queries/useDeteteFinance";
import { financeFormSchema } from "@/shemas/forms";

type FinanceFromForm = z.infer<typeof financeFormSchema>;

export const useFinanceModal = () => {
  const { financeModalData, closeFinanceModal, financeModalType } =
    useUIContext();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);

  const getBudgetsHook = useGetBudgets();
  const budgets = getBudgetsHook.data?.budgets.filter(
    (budget) => budget.category === financeModalType,
  );

  const disabledForm =
    Boolean(error) || Boolean(success) || loading || budgets === undefined;

  const createFinanceHook = useCreateFinance();
  const createFinance = ({
    data,
  }: {
    data: FinanceFromForm & { category: FinanceModalType };
  }) => {
    setLoading(true);
    createFinanceHook.mutate(
      { finance: data },
      {
        onSuccess: () => {
          setSuccess(
            `Pomyślnie dodano nowy ${
              financeModalType === "PROFIT" ? "zysk" : "wydatek"
            }: "${data.title}"`,
          );
        },
        onError: () => {
          setError(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
        },
        onSettled: () => setLoading(false),
      },
    );
  };

  const updateFinanceHook = useUpdateFinance();
  const updateFinance = ({
    id,
    data,
  }: {
    id: number;
    data: FinanceFromForm;
  }) => {
    setLoading(true);
    updateFinanceHook.mutate(
      { id, finance: data },
      {
        onSuccess: () => {
          setSuccess(
            `Pomyślnie zaktualizowano ${
              financeModalType === "PROFIT" ? "zysk" : "wydatek"
            }.`,
          );
        },
        onError: () => {
          setError(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
        },
        onSettled: () => setLoading(false),
      },
    );
  };

  const deleteFinanceHook = useDeleteFinance();
  const deleteFinance = ({ id, title }: { id: number; title: string }) => {
    setLoading(true);
    const confirmed = confirm(
      `Czy potwierdzasz usunięcie  ${
        financeModalType === "PROFIT" ? "zysku" : "wydateku"
      } ${title}?`,
    );

    if (!confirmed) return setLoading(false);

    setLoading(true);
    deleteFinanceHook.mutate(
      { id },
      {
        onSuccess: () => {
          setSuccess(
            `Pomyślnie usunięto  ${
              financeModalType === "PROFIT" ? "zysk" : "wydatek"
            } "${title}".`,
          );
        },
        onError: () => {
          setError(`Coś poszło nie tak. Spróbuj ponownie póżniej.`);
        },
        onSettled: () => setLoading(false),
      },
    );
  };

  return {
    modalData: financeModalData,
    closeModal: closeFinanceModal,
    error,
    success,
    loading,
    disabledForm,
    budgets,
    formWasEdited: wasEdited,
    setFormWasEdited: (state: boolean) => setWasEdited(state),
    createFinance,
    updateFinance,
    deleteFinance,
    financeModalType,
  };
};
