import { z } from "zod";
import { expenseSchema, expensesSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export const deleteExpenseQuery = async ({ id }: { id: number }) =>
  await fetcher({
    url: `/api/expenses/${id}`,
    method: "DELETE",
    schema: expenseSchema,
  });

export const useDeleteExpense = () => {
  return useMutation({
    mutationFn: deleteExpenseQuery,
    onSuccess: (deletedExpense) =>
      queryClient.setQueryData<z.infer<typeof expensesSchema>>(
        ["expenses"],
        (prev) => {
          return prev
            ? {
                ...prev,
                expenses: prev.expenses.filter(
                  (prevItem) => prevItem.id !== deletedExpense.id,
                ),
              }
            : prev;
        },
      ),
  });
};
