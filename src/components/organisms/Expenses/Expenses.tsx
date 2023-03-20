import { Expense } from "@/components/molecules/Expense/Expense";
import { Loader } from "@/components/molecules/Loader/loader";
import { useGetExpenses } from "@/hooks/queries/useGetExpenses";
import { formatDate } from "@/utils/formatDate";

export const Expenses = () => {
  const { data, isSuccess, isError } = useGetExpenses();

  if (isError) {
    return <p>error expenses</p>;
  }

  if (isSuccess) {
    return (
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
    );
  }
  return <Loader />;
};
