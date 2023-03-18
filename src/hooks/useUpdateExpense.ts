import { queryClient } from "@/lib/queryClient";
import { expenseSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
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
    url: `/api/expense/${id}`,
    method: "PATCH",
    schema: expenseSchema,
    body: expense,
  });

export const useUpdateExpense = () => {
  return useMutation({
    mutationFn: updateExpenseQuery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] }),
  });
};
