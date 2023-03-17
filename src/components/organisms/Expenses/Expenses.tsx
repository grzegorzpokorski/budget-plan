import { formatDate } from "@/utils/formatDate";
import { ExpensesItem } from "../../molecules/ExpensesItem/ExpensesItem";

const dummy = [
  {
    id: 0,
    title: "Nowe piżamy",
    amount: 79,
    budgetName: "Odzież",
    budgetId: 2,
    description: "dfgdfg sfgsfg",
    createdAt: "2023-03-17T19:41:23.117Z",
  },
  {
    id: 1,
    title: "Ubezpieczenie samochodu",
    amount: 333,
    budgetName: "Transport",
    budgetId: 1,
    description: "sdf eeee",
    createdAt: "2023-03-17T19:41:23.117Z",
  },
  {
    id: 2,
    title: "Zapupy spożywcze",
    amount: 250,
    budgetName: "Jedzenie",
    budgetId: 2,
    description: " 856 85 ",
    createdAt: "2023-03-12T19:41:23.117Z",
  },
  {
    id: 3,
    title: "Torba gucci",
    amount: 96500.56,
    budgetName: "Odzież",
    budgetId: 3,
    description: "ewr kg",
    createdAt: "2023-03-10T19:41:23.117Z",
  },
];

export const Expenses = () => {
  return (
    <ul className="list-none flex flex-col divide-y-2 rounded" role="list">
      {dummy.map((item, idx, arr) => {
        const currentDate = formatDate(item.createdAt);
        const nextDate =
          arr[idx - 1] !== undefined && formatDate(arr[idx - 1].createdAt);

        return (
          <ExpensesItem
            key={item.id}
            {...item}
            displayDate={currentDate !== nextDate}
          />
        );
      })}
    </ul>
  );
};
