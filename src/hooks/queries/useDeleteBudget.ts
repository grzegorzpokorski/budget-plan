import { queryClient } from "@/lib/queryClient";
import { budgetShema, budgetsSchema, financesSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const deleteBudgetQuery = async ({ id }: { id: number }) =>
  await fetcher({
    url: `/api/budgets/${id}`,
    method: "DELETE",
    schema: budgetShema,
  });

export const useDeleteBudget = () => {
  return useMutation({
    mutationFn: deleteBudgetQuery,
    onSuccess: (deletedBudget) => {
      queryClient.setQueryData<z.infer<typeof budgetsSchema>>(
        ["budgets"],
        (prev) => {
          return prev
            ? {
                ...prev,
                budgets: [
                  ...prev.budgets.filter(
                    (budget) => budget.id !== deletedBudget.id,
                  ),
                ],
              }
            : prev;
        },
      );

      queryClient.setQueryData<z.infer<typeof financesSchema>>(
        ["finances"],
        (prev) => {
          return prev
            ? {
                ...prev,
                finances: [
                  ...prev.finances.filter(
                    (expense) => expense.budgetId !== deletedBudget.id,
                  ),
                ],
              }
            : prev;
        },
      );
    },
  });
};
