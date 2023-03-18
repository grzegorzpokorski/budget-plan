import { queryClient } from "@/lib/queryClient";
import { expenseSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";

export const deleteExpenseQuery = async (id: number) =>
  await fetcher({
    url: `/api/expense/${id}`,
    method: "DELETE",
    schema: expenseSchema,
  });

export const useDeleteExpense = () => {
  return useMutation({
    mutationFn: deleteExpenseQuery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] }),
  });
};
