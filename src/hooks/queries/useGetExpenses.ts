import { expensesSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

const getExpensesQuery = async () =>
  await fetcher({
    url: `/api/expenses`,
    method: "GET",
    schema: expensesSchema,
  });

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: getExpensesQuery,
  });
};
