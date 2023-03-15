"use client";

import { BaseModal } from "@/components/molecules/BaseModal/BaseModal";
import { useUIContext } from "@/providers/UIProvider";

export const AddExpenseModal = () => {
  const { isAddExpenseModalOpen, closeAddExpenseModal } = useUIContext();

  if (!isAddExpenseModalOpen) return null;

  return (
    <BaseModal title="Dodaj wydatek" closeModal={closeAddExpenseModal}>
      <div></div>
    </BaseModal>
  );
};
