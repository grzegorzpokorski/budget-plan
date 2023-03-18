import { Budget } from "@/components/molecules/Budget/Budget";
import { useGetBudgets } from "@/hooks/useGetBudgets";

export const Budgets = () => {
  const { data, isSuccess, isError } = useGetBudgets();

  if (isError) {
    return <p>error budgets</p>;
  }

  if (isSuccess) {
    return (
      <ul
        className="list-none flex flex-col gap-4 bg-white divide-y-2 p-6 pt-2 shadow rounded"
        role="list"
      >
        {data.budgets.map((item) => (
          <Budget key={item.id} {...item} current={50} />
        ))}
      </ul>
    );
  }

  return <p>loading</p>;
};
