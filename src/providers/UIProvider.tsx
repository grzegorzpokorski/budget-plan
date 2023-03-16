"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type BudgetModalData = {
  id: number;
  name: string;
  max: number;
};

type ExpenseModalData = {
  id: number;
  title: string;
  amount: number;
  budgetName: string;
  budgetId: number;
  description: string;
};

type UIProviderValue = {
  isAddExpenseModalOpen: boolean;
  openAddExpenseModal: (modalData?: ExpenseModalData) => void;
  closeAddExpenseModal: () => void;
  isAddBudgetModalOpen: boolean;
  openAddBudgetModal: (modalData?: BudgetModalData) => void;
  closeAddBudgetModal: () => void;
  expenseModalData: ExpenseModalData | null;
  budgetModalData: BudgetModalData | null;
};

const UIContext = createContext<UIProviderValue | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  const [expenseModalData, setExpenseModalData] =
    useState<ExpenseModalData | null>(null);
  const [budgetModalData, setBudgetModalData] =
    useState<BudgetModalData | null>(null);

  const openAddExpenseModal = useCallback((modalData?: ExpenseModalData) => {
    document.body.classList.add("overflow-hidden");
    if (modalData) setExpenseModalData(modalData);
    setIsAddExpenseModalOpen(true);
  }, []);

  const closeAddExpenseModal = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    setIsAddExpenseModalOpen(false);
    setExpenseModalData(null);
  }, []);

  const openAddBudgetModal = useCallback((modalData?: BudgetModalData) => {
    document.body.classList.add("overflow-hidden");
    if (modalData) setBudgetModalData(modalData);
    setIsAddBudgetModalOpen(true);
  }, []);

  const closeAddBudgetModal = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    setIsAddBudgetModalOpen(false);
    setBudgetModalData(null);
  }, []);

  const value = useMemo(
    () => ({
      isAddExpenseModalOpen,
      openAddExpenseModal,
      closeAddExpenseModal,
      isAddBudgetModalOpen,
      openAddBudgetModal,
      closeAddBudgetModal,
      expenseModalData,
      budgetModalData,
    }),
    [
      budgetModalData,
      closeAddBudgetModal,
      closeAddExpenseModal,
      expenseModalData,
      isAddBudgetModalOpen,
      isAddExpenseModalOpen,
      openAddBudgetModal,
      openAddExpenseModal,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUIContext = () => {
  const ctx = useContext(UIContext);

  if (!ctx) {
    throw new Error("UIContext must be use inside Provider!");
  }

  return ctx;
};
