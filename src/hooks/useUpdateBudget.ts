import { queryClient } from "@/lib/queryClient";
import { budgetShema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";

export const updateBudgetQuery = async ({
  id,
  budget,
}: {
  id: number;
  budget: {
    name: string;
    maxAmount: number;
  };
}) =>
  await fetcher({
    url: `/api/budget/${id}`,
    method: "PATCH",
    schema: budgetShema,
    body: budget,
  });

export const useUpdateBudget = () => {
  return useMutation({
    mutationFn: updateBudgetQuery,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["budgets"] }),
        queryClient.invalidateQueries({ queryKey: ["expenses"] }),
      ]),
  });
};
