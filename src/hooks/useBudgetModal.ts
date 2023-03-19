import { useUIContext } from "@/providers/UIProvider";
import { useCreateBudget } from "./useCreateBudget";
import { useDeleteBudget } from "./useDeleteBudget";
import { useUpdateBudget } from "./useUpdateBudget";

export const useBudgetModal = () => {
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
    return createBudget.mutate({ budget });
  };

  const remove = ({ id }: { id: number }) => {
    return deleteBudget.mutate(id);
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
    updateBudget.mutate({ id, budget });
  };

  const resetQueries = () => {
    deleteBudget.reset();
    updateBudget.reset();
    createBudget.reset();
  };

  return {
    isOpen: isBudgetModalOpen,
    closeModal: closeBudgetModal,
    openModal: openBudgetModal,
    modalData: budgetModalData,
    create,
    resetQueries,
    remove,
    update,
  };
};
