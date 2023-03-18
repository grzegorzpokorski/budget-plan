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
  maxAmount: number;
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
  isExpenseModalOpen: boolean;
  openExpenseModal: (modalData?: ExpenseModalData) => void;
  closeExpenseModal: () => void;
  isBudgetModalOpen: boolean;
  openBudgetModal: (modalData?: BudgetModalData) => void;
  closeBudgetModal: () => void;
  expenseModalData: ExpenseModalData | null;
  budgetModalData: BudgetModalData | null;
};

const UIContext = createContext<UIProviderValue | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [expenseModalData, setExpenseModalData] =
    useState<ExpenseModalData | null>(null);
  const [budgetModalData, setBudgetModalData] =
    useState<BudgetModalData | null>(null);

  const openExpenseModal = useCallback((modalData?: ExpenseModalData) => {
    document.body.classList.add("overflow-hidden");
    if (modalData) setExpenseModalData(modalData);
    setIsExpenseModalOpen(true);
  }, []);

  const closeExpenseModal = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    setIsExpenseModalOpen(false);
    setExpenseModalData(null);
  }, []);

  const openBudgetModal = useCallback((modalData?: BudgetModalData) => {
    document.body.classList.add("overflow-hidden");
    if (modalData) setBudgetModalData(modalData);
    setIsBudgetModalOpen(true);
  }, []);

  const closeBudgetModal = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    setIsBudgetModalOpen(false);
    setBudgetModalData(null);
  }, []);

  const value = useMemo(
    () => ({
      isExpenseModalOpen,
      openExpenseModal,
      closeExpenseModal,
      isBudgetModalOpen,
      openBudgetModal,
      closeBudgetModal,
      expenseModalData,
      budgetModalData,
    }),
    [
      budgetModalData,
      closeBudgetModal,
      closeExpenseModal,
      expenseModalData,
      isBudgetModalOpen,
      isExpenseModalOpen,
      openBudgetModal,
      openExpenseModal,
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
