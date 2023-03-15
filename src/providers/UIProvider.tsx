"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type UIProviderValue = {
  isAddExpenseModalOpen: boolean;
  openAddExpenseModal: () => void;
  closeAddExpenseModal: () => void;
  isAddBudgetModalOpen: boolean;
  openAddBudgetModal: () => void;
  closeAddBudgetModal: () => void;
};

const UIContext = createContext<UIProviderValue | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);

  const openAddExpenseModal = useCallback(() => {
    document.body.classList.add("overflow-hidden");
    setIsAddExpenseModalOpen(true);
  }, []);

  const closeAddExpenseModal = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    setIsAddExpenseModalOpen(false);
  }, []);

  const openAddBudgetModal = useCallback(() => {
    document.body.classList.add("overflow-hidden");
    setIsAddBudgetModalOpen(true);
  }, []);

  const closeAddBudgetModal = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    setIsAddBudgetModalOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isAddExpenseModalOpen,
      openAddExpenseModal,
      closeAddExpenseModal,
      isAddBudgetModalOpen,
      openAddBudgetModal,
      closeAddBudgetModal,
    }),
    [
      closeAddBudgetModal,
      closeAddExpenseModal,
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
