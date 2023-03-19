import { Budget } from "@/components/molecules/Budget/Budget";
import { Loader } from "@/components/molecules/Loader/loader";
import { useGetBudgets } from "@/hooks/useGetBudgets";

export const Budgets = () => {
  const { data, isSuccess, isError } = useGetBudgets();

  if (isError) {
    return <p>error budgets</p>;
  }

  if (isSuccess && data.budgets.length > 0) {
    return (
      <ul
        className="list-none flex flex-col gap-4 bg-white divide-y-2 p-6 pt-2 shadow rounded"
        role="list"
      >
        {data.budgets.map((item) => (
          <Budget key={item.id} {...item} />
        ))}
      </ul>
    );
  }

  if (isSuccess && data.budgets.length === 0) return null;

  return <Loader />;
};
