"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useBudgetRealization } from "./useBudgetRealization";
import { useUIContext } from "@/providers/UIProvider";
import { formatCurrency } from "@/utils/formatCurrency";
import { Loader } from "./Loader";
import { twMerge } from "tailwind-merge";
import { useGetBudgets } from "@/hooks/queries/useGetBudgets";

export const BudgetRealization = () => {
  const { sumOfExpenses, sumOfProfits, status } = useBudgetRealization();
  const { data, isSuccess } = useGetBudgets();
  const { openBudgetModal } = useUIContext();

  const thereIsNoBudgets = data?.budgets.length === 0 && isSuccess;

  if (status === "loading") {
    return <Loader />;
  }

  if (thereIsNoBudgets) {
    return <Button onClick={() => openBudgetModal()}>Dodaj budżet</Button>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <header className="sr-only">
        <h2>Podsumowanie</h2>
      </header>
      <div className="col-span-2 xs:col-span-1 flex flex-row sm:flex-col flex-wrap gap-2 items-center text-center justify-between p-6 bg-white rounded shadow">
        <h3 className="font-bold">Suma wydatków</h3>
        <p className="font-medium text-red-500">
          -{formatCurrency(sumOfExpenses)}
        </p>
      </div>
      <div className="col-span-2 sm:col-span-1 flex flex-row sm:flex-col flex-wrap gap-2 items-center text-center justify-between p-6 bg-white rounded shadow">
        <h3 className="font-bold">Suma zysków</h3>
        <p className="font-medium text-green-500">
          {formatCurrency(sumOfProfits)}
        </p>
      </div>
      <div className="col-span-2 sm:col-span-1 flex flex-row sm:flex-col flex-wrap gap-2 items-center text-center justify-between p-6 bg-white rounded shadow">
        <h3 className="font-bold">Podsumowanie</h3>
        <p
          className={twMerge(
            "font-medium",
            sumOfProfits - sumOfExpenses >= 0
              ? "text-green-500"
              : "text-red-500",
          )}
        >
          {formatCurrency(sumOfProfits - sumOfExpenses)}
        </p>
      </div>
    </section>
  );
};
