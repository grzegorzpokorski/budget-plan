import { Budget } from "@/components/molecules/Budget/Budget";
import { Loader } from "./Loader";
import { useGetBudgets } from "@/hooks/queries/useGetBudgets";

export const Budgets = () => {
  const { data, isSuccess, isError } = useGetBudgets();

  if (isError) {
    return <p>error budgets</p>;
  }

  if (isSuccess && data.budgets.length > 0) {
    return (
      <section>
        <h2 className="border-b-2 py-3 px-6 text-xs text-gray-500 capitalize text-center md:text-start">
          Budżety
        </h2>
        <ul
          className="list-none flex flex-col gap-4 bg-white divide-y-2 p-6 pt-2 shadow rounded"
          role="list"
        >
          {data.budgets.map((item) => (
            <Budget key={item.id} {...item} />
          ))}
        </ul>
      </section>
    );
  }

  if (isSuccess && data.budgets.length === 0) return null;

  return <Loader />;
};
