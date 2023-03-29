import { useEffect, useState } from "react";
import { useGetFinances } from "@/hooks/queries/useGetFinances";

export const useBudgetRealization = () => {
  const [sumOfExpenses, setSumOfExpenses] = useState(0);
  const [sumOfProfits, setSumOfProfits] = useState(0);
  const finances = useGetFinances();

  useEffect(() => {
    if (finances.status === "success" && finances.data) {
      setSumOfExpenses(
        finances.data.finances
          .filter((item) => item.budget.category === "EXPENSE")
          .reduce((sum, curr) => sum + curr.amount, 0),
      );
      setSumOfProfits(
        finances.data.finances
          .filter((item) => item.budget.category === "PROFIT")
          .reduce((sum, curr) => sum + curr.amount, 0),
      );
    }
  }, [finances.data, finances.status]);

  return {
    sumOfProfits,
    sumOfExpenses,
    status: finances.status,
  };
};
