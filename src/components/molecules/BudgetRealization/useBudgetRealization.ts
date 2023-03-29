import { useEffect, useState } from "react";
import { useGetBudgets } from "@/hooks/queries/useGetBudgets";
import { useGetFinances } from "@/hooks/queries/useGetFinances";

export const useBudgetRealization = () => {
  const [max, setMax] = useState(0);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const budgets = useGetBudgets();
  const finances = useGetFinances();

  useEffect(() => {
    if (budgets.status !== "loading" && finances.status !== "loading") {
      setLoading(false);
    }
  }, [budgets.status, finances.status]);

  useEffect(() => {
    if (budgets.status === "success" && budgets.data) {
      setMax(
        budgets.data.budgets.reduce((sum, curr) => sum + curr.maxAmount, 0),
      );
    }
  }, [budgets.data, budgets.status]);

  useEffect(() => {
    if (finances.status === "success" && finances.data) {
      setCurrent(
        finances.data.finances.reduce((sum, curr) => sum + curr.amount, 0),
      );
    }
  }, [finances.data, finances.status]);

  return {
    current,
    max,
    loading,
  };
};
