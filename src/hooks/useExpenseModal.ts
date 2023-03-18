import { useUIContext } from "@/providers/UIProvider";
import { useCreateExpense } from "./useCreateExpense";
import { useDeleteExpense } from "./useDeteteExpense";
import { useUpdateExpense } from "./useUpdateExpense";

export const useExpenseModal = () => {
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
    updateExpense.mutate({ id, expense });
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
    createExpense.mutate({ expense });
  };

  const remove = ({ id }: { id: number }) => {
    deleteExpense.mutate(id);
  };

  const resetQueries = () => {
    deleteExpense.reset();
    updateExpense.reset();
    createExpense.reset();
  };

  return {
    isOpen: isExpenseModalOpen,
    closeModal: closeExpenseModal,
    modalData: expenseModalData,
    update,
    create,
    remove,
    resetQueries,
  };
};
