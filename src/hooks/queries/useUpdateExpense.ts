import { z } from "zod";
import { expenseSchema, expensesSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export const updateExpenseQuery = async ({
  id,
  expense,
}: {
  id: number;
  expense: {
    title: string;
    amount: number;
    budgetId: number;
    description: string;
  };
}) =>
  await fetcher({
    url: `/api/expenses/${id}`,
    method: "PATCH",
    schema: expenseSchema,
    body: expense,
  });

export const useUpdateExpense = () => {
  return useMutation({
    mutationFn: updateExpenseQuery,
    onSuccess: (updatedExpense) => {
      queryClient.setQueryData<z.infer<typeof expensesSchema>>(
        ["expenses"],
        (prev) => {
          return prev
            ? {
                ...prev,
                expenses: prev.expenses.map((prevItem) =>
                  prevItem.id === updatedExpense.id ? updatedExpense : prevItem,
                ),
              }
            : prev;
        },
      );
    },
  });
};
