import { queryClient } from "@/lib/queryClient";
import { expenseSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] }),
  });
};
