import { useState } from "react";
import { useUIContext } from "@/providers/UIProvider";

export const useBudgetModal = () => {
  const { budgetModalData, closeBudgetModal } = useUIContext();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState(false);

  return {
    modalData: budgetModalData,
    closeModal: closeBudgetModal,
    setSuccessMessage: (message: string) => setSuccess(message),
    setErrorMessage: (message: string) => setError(message),
    error,
    success,
    loading: loadingState,
    setLoading: (state: boolean) => setLoadingState(state),
  };
};
