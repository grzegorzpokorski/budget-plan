import { useState } from "react";
import { useUIContext } from "@/providers/UIProvider";
import { useCreateExpense } from "./useCreateExpense";
import { useDeleteExpense } from "./useDeteteExpense";
import { useUpdateExpense } from "./useUpdateExpense";

export const useExpenseModal = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isExpenseModalOpen, closeExpenseModal, expenseModalData } =
    useUIContext();

  const deleteExpense = useDeleteExpense();
  const updateExpense = useUpdateExpense();
  const createExpense = useCreateExpense();

  const update = ({
    id,
    expense,
  }: {
    id: number;
    expense: {
      title: string;
      amount: number;
      budgetId: number;
      description: string;
    };
  }) => {
    updateExpense.mutate(
      { id, expense },
      { onError: () => setError(true), onSuccess: () => setSuccess(true) },
    );
  };

  const create = ({
    expense,
  }: {
    expense: {
      title: string;
      amount: number;
      budgetId: number;
      description: string;
    };
  }) => {
    createExpense.mutate(
      { expense },
      { onError: () => setError(true), onSuccess: () => setSuccess(true) },
    );
  };

  const remove = ({ id }: { id: number }) => {
    deleteExpense.mutate(id, {
      onError: () => setError(true),
      onSuccess: () => setSuccess(true),
    });
  };

  const resetQueries = () => {
    deleteExpense.reset();
    updateExpense.reset();
    createExpense.reset();
  };

  const clearError = () => setError(false);
  const clearSuccess = () => setSuccess(false);

  return {
    isOpen: isExpenseModalOpen,
    closeModal: () => {
      closeExpenseModal();
      clearError();
      clearSuccess();
    },
    modalData: expenseModalData,
    update,
    create,
    remove,
    resetQueries,
    error,
    success,
  };
};
