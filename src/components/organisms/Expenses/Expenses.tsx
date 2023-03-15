import { ExpensesItem } from "../../molecules/ExpensesItem/ExpensesItem";

const dummy = [
  {
    id: 0,
    amount: 79,
    description: "Nowe piżamy",
    budgetName: "Odzież",
  },
  {
    id: 1,
    amount: 333,
    description: "Ubezpieczenie samochodu",
    budgetName: "Wydatki samochód",
  },
  {
    id: 2,
    amount: 250,
    description: "Zapupy spożywcze",
    budgetName: "Jedzenie",
  },
  {
    id: 3,
    amount: 96500.56,
    description: "Nowy laptop",
    budgetName: "Sprzęty",
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
