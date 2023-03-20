import { queryClient } from "@/lib/queryClient";
import { budgetFormSchema } from "@/shemas/forms";
import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";

export const createBudgetQuery = async ({
  budget,
}: {
  budget: {
    name: string;
    maxAmount: number;
  };
}) =>
  await fetcher({
    url: `/api/budget`,
    method: "POST",
    schema: budgetFormSchema,
    body: budget,
  });

export const useCreateBudget = () => {
  return useMutation({
    mutationFn: createBudgetQuery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  });
};
