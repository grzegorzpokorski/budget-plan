import { useGetBudgets } from "./useGetBudgets";
import { useGetExpenses } from "./useGetExpenses";

export const useBudgetRealization = () => {
  const budgets = useGetBudgets();
  const expenses = useGetExpenses();

  if (budgets.isSuccess && expenses.isSuccess) {
    const max = budgets.data.budgets.reduce(
      (sum, curr) => curr.maxAmount + sum,
      0,
    );
    const current = expenses.data.expenses.reduce(
      (sum, curr) => curr.amount + sum,
      0,
    );

    return {
      current,
      max,
    };
  }
};
