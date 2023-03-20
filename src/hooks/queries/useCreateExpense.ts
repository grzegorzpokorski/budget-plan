import { queryClient } from "@/lib/queryClient";
import { expenseSchema, expensesSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const createExpenseQuery = async ({
  expense,
}: {
  expense: {
    title: string;
    amount: number;
    budgetId: number;
    description: string;
  };
}) =>
  await fetcher({
    url: `/api/expenses`,
    method: "POST",
    schema: expenseSchema,
    body: expense,
  });

export const useCreateExpense = () => {
  return useMutation({
    mutationFn: createExpenseQuery,
    onSuccess: (createdExpense) => {
      queryClient.setQueryData<z.infer<typeof expensesSchema>>(
        ["expenses"],
        (prev) => {
          return prev
            ? { ...prev, expenses: [...prev.expenses, createdExpense] }
            : prev;
        },
      );
    },
  });
};
