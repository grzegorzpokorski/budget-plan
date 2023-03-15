"use client";

import { BaseModal } from "@/components/molecules/BaseModal/BaseModal";
import { useUIContext } from "@/providers/UIProvider";

export const AddBudgetModal = () => {
  const { isAddBudgetModalOpen, closeAddBudgetModal } = useUIContext();

  if (!isAddBudgetModalOpen) return null;

  return (
    <BaseModal title="Dodaj nowy budżet" closeModal={closeAddBudgetModal}>
      <div></div>
    </BaseModal>
  );
};
