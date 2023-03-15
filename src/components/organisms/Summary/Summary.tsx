import { SummaryItem } from "@/components/molecules/SummaryItem/SummaryItem";

const dummy = [
  {
    id: 0,
    name: "Transport",
    max: 500,
    current: 160,
  },
  {
    id: 1,
    name: "Jedzenie",
    max: 1000,
    current: 1200,
  },
  {
    id: 2,
    name: "Odzież",
    max: 200,
    current: 79,
  },
];

export const Summary = () => {
  return (
    <ul
      className="list-none flex flex-col gap-4 bg-white divide-y-2 p-6 pt-2 shadow rounded"
      role="list"
    >
      {dummy.map((item) => (
        <SummaryItem key={item.id} {...item} />
      ))}
    </ul>
  );
};
