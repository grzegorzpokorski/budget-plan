import { financesSchema } from "@/shemas/queries";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

const getFinancesQuery = async () =>
  await fetcher({
    url: `/api/finances`,
    method: "GET",
    schema: financesSchema,
  });

export const useGetFinances = () => {
  return useQuery({
    queryKey: ["finances"],
    queryFn: getFinancesQuery,
  });
};
