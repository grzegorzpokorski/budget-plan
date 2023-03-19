import { BudgetModal } from "@/components/organisms/BudgetModal/BudgetModal";
import { ExpenseModal } from "@/components/organisms/ExpenseModal/ExpenseModal";
import { useUIContext } from "@/providers/UIProvider";

export const Modals = () => {
  const { isBudgetModalOpen, isExpenseModalOpen } = useUIContext();
  return (
    <>
      {isExpenseModalOpen && <ExpenseModal />}
      {isBudgetModalOpen && <BudgetModal />}
    </>
  );
};
