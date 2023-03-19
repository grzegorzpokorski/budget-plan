import { useEffect, useState } from "react";
import { useUIContext } from "@/providers/UIProvider";
import { useCreateBudget } from "./useCreateBudget";
import { useDeleteBudget } from "./useDeleteBudget";
import { useUpdateBudget } from "./useUpdateBudget";

export const useBudgetModal = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    isBudgetModalOpen,
    closeBudgetModal,
    budgetModalData,
    openBudgetModal,
  } = useUIContext();
  const createBudget = useCreateBudget();
  const deleteBudget = useDeleteBudget();
  const updateBudget = useUpdateBudget();

  const create = ({
    budget,
  }: {
    budget: {
      name: string;
      maxAmount: number;
    };
  }) => {
    return createBudget.mutate(
      { budget },
      { onError: () => setError(true), onSuccess: () => setSuccess(true) },
    );
  };

  const remove = ({ id }: { id: number }) => {
    return deleteBudget.mutate(id, {
      onError: () => setError(true),
      onSuccess: () => setSuccess(true),
    });
  };

  const update = ({
    id,
    budget,
  }: {
    id: number;
    budget: {
      name: string;
      maxAmount: number;
    };
  }) => {
    updateBudget.mutate(
      { id, budget },
      { onError: () => setError(true), onSuccess: () => setSuccess(true) },
    );
  };

  const resetQueries = () => {
    deleteBudget.reset();
    updateBudget.reset();
    createBudget.reset();
  };

  const clearError = () => setError(false);
  const clearSuccess = () => setSuccess(false);

  return {
    isOpen: isBudgetModalOpen,
    closeModal: () => {
      closeBudgetModal();
      clearError();
      clearSuccess();
    },
    openModal: openBudgetModal,
    modalData: budgetModalData,
    create,
    resetQueries,
    remove,
    update,
    error,
    success,
  };
};
