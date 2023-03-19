import { useState } from "react";
import { useUIContext } from "@/providers/UIProvider";
import { useGetBudgets } from "./useGetBudgets";

export const useExpenseModal = () => {
  const { expenseModalData, closeExpenseModal } = useUIContext();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState(false);
  const budgets = useGetBudgets();

  return {
    modalData: expenseModalData,
    closeModal: closeExpenseModal,
    setSuccessMessage: (message: string) => setSuccess(message),
    setErrorMessage: (message: string) => setError(message),
    error,
    success,
    loading: loadingState,
    setLoading: (state: boolean) => setLoadingState(state),
    budgets,
  };
};
