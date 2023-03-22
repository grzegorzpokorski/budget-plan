import { Expense } from "@/components/molecules/Expense/Expense";
import { useGetExpenses } from "@/hooks/queries/useGetExpenses";
import { formatDate } from "@/utils/formatDate";
import { Loader } from "./Loader";

export const Expenses = () => {
  const { data, isSuccess, isError } = useGetExpenses();

  if (isError) {
    return <p>error expenses</p>;
  }

  if (isSuccess) {
    return (
      <section>
        <h2 className="sr-only">Wydatki</h2>
        <ul className="list-none flex flex-col divide-y-2 rounded" role="list">
          {data.expenses.map((item, idx, arr) => {
            const currentDate = formatDate(item.createdAt);
            const nextDate =
              arr[idx - 1] !== undefined && formatDate(arr[idx - 1].createdAt);
            return (
              <Expense
                key={item.id}
                {...item}
                displayDate={currentDate !== nextDate}
              />
            );
          })}
        </ul>
      </section>
    );
  }
  return <Loader />;
};
