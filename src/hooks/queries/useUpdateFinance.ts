import { z } from "zod";
import { financeSchema, financesSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export const updateFinanceQuery = async ({
  id,
  finance,
}: {
  id: number;
  finance: {
    title: string;
    amount: number;
    budgetId: number;
    description: string;
  };
}) =>
  await fetcher({
    url: `/api/finances/${id}`,
    method: "PATCH",
    schema: financeSchema,
    body: finance,
  });

export const useUpdateFinance = () => {
  return useMutation({
    mutationFn: updateFinanceQuery,
    onSuccess: (updated) => {
      queryClient.setQueryData<z.infer<typeof financesSchema>>(
        ["finances"],
        (prev) => {
          return prev
            ? {
                ...prev,
                finances: prev.finances.map((prevItem) =>
                  prevItem.id === updated.id ? updated : prevItem,
                ),
              }
            : prev;
        },
      );
    },
  });
};
