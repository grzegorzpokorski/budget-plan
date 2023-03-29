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
    <section className="flex flex-col md:flex-row gap-4 items-center justify-center">
      <header className="sr-only">
        <h2>Podsumowanie</h2>
      </header>
      <div className="flex flex-col gap-2 items-center p-6 bg-white rounded shadow w-full md:w-1/3">
        <h3 className="font-bold">Suma wydatków</h3>
        <p className="font-medium text-red-500">
          -{formatCurrency(sumOfExpenses)}
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center p-6 bg-white rounded shadow w-full md:w-1/3">
        <h3 className="font-bold">Suma zysków</h3>
        <p className="font-medium text-green-500">
          {formatCurrency(sumOfProfits)}
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center p-6 bg-white rounded shadow w-full md:w-1/3">
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
