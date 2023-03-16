import { ExpensesItem } from "../../molecules/ExpensesItem/ExpensesItem";

const dummy = [
  {
    id: 0,
    title: "Nowe piżamy",
    amount: 79,
    budgetName: "Odzież",
    budgetId: 2,
    description: "dfgdfg sfgsfg",
  },
  {
    id: 1,
    title: "Ubezpieczenie samochodu",
    amount: 333,
    budgetName: "Transport",
    budgetId: 1,
    description: "sdf eeee",
  },
  {
    id: 2,
    title: "Zapupy spożywcze",
    amount: 250,
    budgetName: "Jedzenie",
    budgetId: 2,
    description: " 856 85 ",
  },
  {
    id: 3,
    title: "Torba gucci",
    amount: 96500.56,
    budgetName: "Odzież",
    budgetId: 3,
    description: "ewr kg",
  },
];

export const Expenses = () => {
  return (
    <ul
      className="list-none flex flex-col bg-white divide-y-2 shadow rounded"
      role="list"
    >
      {dummy.map((item) => (
        <ExpensesItem key={item.id} {...item} />
      ))}
    </ul>
  );
};
