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
  category: string;
};

type FinanceModalData = {
  id: number;
  title: string;
  amount: number;
  budgetName: string;
  budgetId: number;
  description: string;
};

export type FinanceModalType = "PROFIT" | "EXPENSE";

type UIProviderValue = {
  isFinanceModalOpen: boolean;
  openFinanceModal: ({
    category,
    modalData,
  }: {
    category: FinanceModalType;
    modalData?: FinanceModalData;
  }) => void;
  closeFinanceModal: () => void;
  isBudgetModalOpen: boolean;
  openBudgetModal: (modalData?: BudgetModalData) => void;
  closeBudgetModal: () => void;
  financeModalData: FinanceModalData | null;
  budgetModalData: BudgetModalData | null;
  clearBudgetModal: () => void;
  clearFinanceModal: () => void;
  financeModalType: FinanceModalType;
};

const UIContext = createContext<UIProviderValue | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [financeModalData, setFinanceModalData] =
    useState<FinanceModalData | null>(null);
  const [budgetModalData, setBudgetModalData] =
    useState<BudgetModalData | null>(null);
  const [financeModalType, setFinanceModalType] =
    useState<FinanceModalType>("EXPENSE");

  const openFinanceModal = useCallback(
    ({
      category,
      modalData,
    }: {
      category: FinanceModalType;
      modalData?: FinanceModalData;
    }) => {
      document.body.classList.add("overflow-hidden");
      setFinanceModalType(category);
      if (modalData) setFinanceModalData(modalData);
      setIsFinanceModalOpen(true);
    },
    [],
  );

  const clearFinanceModal = useCallback(() => {
    setFinanceModalData(null);
  }, []);

  const closeFinanceModal = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    setIsFinanceModalOpen(false);
    clearFinanceModal();
  }, [clearFinanceModal]);

  const openBudgetModal = useCallback((modalData?: BudgetModalData) => {
    document.body.classList.add("overflow-hidden");
    if (modalData) setBudgetModalData(modalData);
    setIsBudgetModalOpen(true);
  }, []);

  const clearBudgetModal = useCallback(() => {
    setBudgetModalData(null);
  }, []);

  const closeBudgetModal = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    setIsBudgetModalOpen(false);
    clearBudgetModal();
  }, [clearBudgetModal]);

  const value = useMemo(
    () => ({
      budgetModalData,
      clearBudgetModal,
      clearFinanceModal,
      closeBudgetModal,
      closeFinanceModal,
      financeModalData,
      isBudgetModalOpen,
      isFinanceModalOpen,
      openBudgetModal,
      openFinanceModal,
      financeModalType,
    }),
    [
      budgetModalData,
      clearBudgetModal,
      clearFinanceModal,
      closeBudgetModal,
      closeFinanceModal,
      financeModalData,
      isBudgetModalOpen,
      isFinanceModalOpen,
      openBudgetModal,
      openFinanceModal,
      financeModalType,
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
