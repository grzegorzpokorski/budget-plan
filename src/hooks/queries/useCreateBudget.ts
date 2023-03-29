import { queryClient } from "@/lib/queryClient";
import { budgetShema, budgetsSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const createBudgetQuery = async ({
  budget,
}: {
  budget: {
    name: string;
    maxAmount: number;
    category: string;
  };
}) =>
  await fetcher({
    url: `/api/budgets`,
    method: "POST",
    schema: budgetShema,
    body: budget,
  });

export const useCreateBudget = () => {
  return useMutation({
    mutationFn: createBudgetQuery,
    onSuccess: (createdBudget) => {
      queryClient.setQueryData<z.infer<typeof budgetsSchema>>(
        ["budgets"],
        (prev) => {
          return prev
            ? { ...prev, budgets: [...prev.budgets, createdBudget] }
            : prev;
        },
      );
    },
  });
};
