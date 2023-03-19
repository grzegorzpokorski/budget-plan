import { useEffect, useState } from "react";
import { useGetBudgets } from "./useGetBudgets";
import { useGetExpenses } from "./useGetExpenses";

export const useBudgetRealization = () => {
  const [max, setMax] = useState(0);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const budgets = useGetBudgets();
  const expenses = useGetExpenses();

  useEffect(() => {
    if (budgets.status !== "loading" && expenses.status !== "loading") {
      setLoading(false);
    }
  }, [budgets.status, expenses.status]);

  useEffect(() => {
    if (budgets.status === "success" && budgets.data) {
      setMax(
        budgets.data.budgets.reduce((sum, curr) => sum + curr.maxAmount, 0),
      );
    }
  }, [budgets.data, budgets.status]);

  useEffect(() => {
    if (expenses.status === "success" && expenses.data) {
      setCurrent(
        expenses.data.expenses.reduce((sum, curr) => sum + curr.amount, 0),
      );
    }
  }, [expenses.data, expenses.status]);

  return {
    current,
    max,
    loading,
  };
};
