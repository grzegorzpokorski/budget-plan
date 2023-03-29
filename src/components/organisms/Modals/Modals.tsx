import { BudgetModal } from "@/components/organisms/BudgetModal/BudgetModal";
import { FinanceModal } from "@/components/organisms/FinanceModal/FinanceModal";
import { useUIContext } from "@/providers/UIProvider";

export const Modals = () => {
  const { isBudgetModalOpen, isFinanceModalOpen } = useUIContext();
  return (
    <>
      {isFinanceModalOpen && <FinanceModal />}
      {isBudgetModalOpen && <BudgetModal />}
    </>
  );
};
