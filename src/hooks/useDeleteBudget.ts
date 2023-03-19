import { queryClient } from "@/lib/queryClient";
import { budgetShema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";

export const deleteBudgetQuery = async (id: number) =>
  await fetcher({
    url: `/api/budget/${id}`,
    method: "DELETE",
    schema: budgetShema,
  });

export const useDeleteBudget = () => {
  return useMutation({
    mutationFn: deleteBudgetQuery,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["budgets"] }),
        queryClient.invalidateQueries({ queryKey: ["expenses"] }),
      ]),
  });
};
