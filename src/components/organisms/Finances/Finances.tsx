import { Finance } from "@/components/molecules/Finance/Finance";
import { useGetFinances } from "@/hooks/queries/useGetFinances";
import { formatDate } from "@/utils/formatDate";
import { Loader } from "./Loader";

export const Finances = () => {
  const { data, isSuccess, isError } = useGetFinances();

  if (isError) {
    return <p>error finances</p>;
  }

  if (isSuccess) {
    return (
      <section>
        <h2 className="sr-only">Wydatki</h2>
        <ul className="list-none flex flex-col divide-y-2 rounded" role="list">
          {data.finances.map((item, idx, arr) => {
            const currentDate = formatDate(item.createdAt);
            const nextDate =
              arr[idx - 1] !== undefined && formatDate(arr[idx - 1].createdAt);
            return (
              <Finance
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
