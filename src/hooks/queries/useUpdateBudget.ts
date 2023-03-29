import { z } from "zod";
import { budgetShema, budgetsSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { queryClient } from "@/lib/queryClient";
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
    url: `/api/budgets/${id}`,
    method: "PATCH",
    schema: budgetShema,
    body: budget,
  });

export const useUpdateBudget = () => {
  return useMutation({
    mutationFn: updateBudgetQuery,
    onSuccess: (updatedBudget) => {
      queryClient.setQueryData<z.infer<typeof budgetsSchema>>(
        ["budgets"],
        (prev) => {
          return prev
            ? {
                ...prev,
                budgets: prev.budgets.map((prevItem) =>
                  prevItem.id === updatedBudget.id ? updatedBudget : prevItem,
                ),
              }
            : prev;
        },
      );
    },
    onSettled: () =>
      Promise.all([queryClient.invalidateQueries({ queryKey: ["finances"] })]),
  });
};
