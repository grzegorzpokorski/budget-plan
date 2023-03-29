import { z } from "zod";
import { financeSchema, financesSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export const deleteFinanceQuery = async ({ id }: { id: number }) =>
  await fetcher({
    url: `/api/finances/${id}`,
    method: "DELETE",
    schema: financeSchema,
  });

export const useDeleteFinance = () => {
  return useMutation({
    mutationFn: deleteFinanceQuery,
    onSuccess: (deleted) =>
      queryClient.setQueryData<z.infer<typeof financesSchema>>(
        ["finances"],
        (prev) => {
          return prev
            ? {
                ...prev,
                finances: prev.finances.filter(
                  (prevItem) => prevItem.id !== deleted.id,
                ),
              }
            : prev;
        },
      ),
  });
};
