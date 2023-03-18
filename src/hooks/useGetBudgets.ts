import { budgetsSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

const getBudgetsQuery = async () =>
  await fetcher({
    url: `/api/budgets`,
    method: "GET",
    schema: budgetsSchema,
  });

export const useGetBudgets = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgetsQuery,
  });
};
