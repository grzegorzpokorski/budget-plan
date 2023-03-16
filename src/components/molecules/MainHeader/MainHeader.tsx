"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { useUIContext } from "@/providers/UIProvider";
import { signOut } from "next-auth/react";
import {
  FaMoneyCheck,
  FaMoneyCheckAlt,
  FaPlus,
  FaPowerOff,
} from "react-icons/fa";

export const MainHeader = () => {
  const { openExpenseModal, openBudgetModal } = useUIContext();
  return (
    <>
      <header className="md:fixed top-0 left-0 w-full h-16 bg-white flex flex-row shadow z-20">
        <Container className="flex flex-row items-center justify-between">
          <h1 className="font-bold flex flex-row items-center">
            <FaMoneyCheckAlt className="text-2xl mr-2" />
            Budget<span className="font-normal">Plan</span>
          </h1>
          <div className="flex flex-row gap-2">
            <div className="hidden md:flex flex-row gap-2">
              <Button variant="outline" onClick={() => openExpenseModal()}>
                Nowy wydatek
                <FaPlus />
              </Button>
              <Button variant="outline" onClick={() => openBudgetModal()}>
                Nowy budżet
                <FaMoneyCheck />
              </Button>
            </div>
            <Button onClick={() => void signOut({ callbackUrl: "/login" })}>
              Wyloguj <FaPowerOff />
            </Button>
          </div>
        </Container>
      </header>
      <div className="fixed md:hidden left-0 bottom-0 w-full h-16 bg-blue-500 flex flex-row border-t-2 shadow z-20">
        <Container className="flex flex-row items-center justify-center">
          <div className="flex flex-row gap-2">
            <Button variant="white-outline" onClick={() => openBudgetModal()}>
              Nowy budżet
              <FaMoneyCheck />
            </Button>
            <Button variant="white-outline" onClick={() => openExpenseModal()}>
              Nowy wydatek
              <FaPlus />
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};
