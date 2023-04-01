"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { useGetBudgets } from "@/hooks/queries/useGetBudgets";
import { useUIContext } from "@/providers/UIProvider";
import { signOut } from "next-auth/react";
import {
  FaMoneyCheck,
  FaMoneyCheckAlt,
  FaPlus,
  FaPowerOff,
  FaFileCsv,
} from "react-icons/fa";

export const MainHeader = () => {
  const { openFinanceModal, openBudgetModal } = useUIContext();
  const budgets = useGetBudgets();

  const showExport = budgets.isSuccess && budgets.data.budgets.length > 0;

  const showAddExpenseButton =
    budgets.isSuccess &&
    budgets.data.budgets.some((budget) => budget.category === "EXPENSE");

  const showAddProfitButton =
    budgets.isSuccess &&
    budgets.data.budgets.some((budget) => budget.category === "PROFIT");

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
              {showAddExpenseButton && (
                <Button
                  variant="outline"
                  onClick={() => openFinanceModal({ category: "EXPENSE" })}
                >
                  wydatek
                  <FaPlus />
                </Button>
              )}
              {showAddProfitButton && (
                <Button
                  variant="outline"
                  onClick={() => openFinanceModal({ category: "PROFIT" })}
                >
                  zysk
                  <FaPlus />
                </Button>
              )}
              <Button variant="outline" onClick={() => openBudgetModal()}>
                budżet
                <FaMoneyCheck />
              </Button>
            </div>
            {showExport && (
              <a href="/api/export" target="_blank">
                <Button variant="outline">
                  Eksport CSV
                  <FaFileCsv />
                </Button>
              </a>
            )}
            <Button onClick={() => void signOut({ callbackUrl: "/login" })}>
              Wyloguj <FaPowerOff />
            </Button>
          </div>
        </Container>
      </header>
      <div className="fixed md:hidden left-0 bottom-0 w-full h-16 bg-blue-500 flex flex-row border-t-2 shadow z-20">
        <Container className="flex flex-row items-center justify-center">
          <div className="flex flex-row gap-2 overflow-x-auto">
            <Button variant="white-outline" onClick={() => openBudgetModal()}>
              budżet
              <FaMoneyCheck />
            </Button>
            {showAddExpenseButton && (
              <Button
                variant="white-outline"
                onClick={() => openFinanceModal({ category: "EXPENSE" })}
              >
                wydatek
                <FaPlus />
              </Button>
            )}
            {showAddProfitButton && (
              <Button
                variant="white-outline"
                onClick={() => openFinanceModal({ category: "PROFIT" })}
              >
                zysk
                <FaPlus />
              </Button>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};
