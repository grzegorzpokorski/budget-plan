import { queryClient } from "@/lib/queryClient";
import { financeSchema, financesSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const createFinanceQuery = async ({
  finance,
}: {
  finance: {
    title: string;
    amount: number;
    budgetId: number;
    description: string;
  };
}) =>
  await fetcher({
    url: `/api/finances`,
    method: "POST",
    schema: financeSchema,
    body: finance,
  });

export const useCreateFinance = () => {
  return useMutation({
    mutationFn: createFinanceQuery,
    onSuccess: (created) => {
      queryClient.setQueryData<z.infer<typeof financesSchema>>(
        ["finances"],
        (prev) => {
          return prev
            ? { ...prev, finances: [created, ...prev.finances] }
            : prev;
        },
      );
    },
  });
};
