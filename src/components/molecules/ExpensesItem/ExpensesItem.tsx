import { Button } from "@/components/atoms/Button/Button";
import { formatCurrency } from "@/utils/formatCurrency";
import { FaEdit, FaPlus } from "react-icons/fa";

type ExpensesItemProps = {
  amount: number;
  description: string;
  budgetName: string;
};

export const ExpensesItem = ({
  amount,
  description,
  budgetName,
}: ExpensesItemProps) => {
  return (
    <li className="flex flex-row items-start justify-start gap-6 px-6 py-4 w-full">
      <div className="flex flex-col gap-1 md:gap-4 md:flex-row md:items-center">
        <div className="font-medium text-red-500 mt-1.5 min-w-[105px]">
          -{formatCurrency(amount)}
        </div>
        <div className="flex flex-col text-sm mt-1">
          <h3 className="font-bold">{description}</h3>
          <p className="mt-1 text-sm text-gray-500">{budgetName}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 ml-auto my-auto">
        <Button size="square">
          <span className="sr-only">usuń</span>
          <FaPlus className="rotate-45" />
        </Button>
        <Button size="square">
          <span className="sr-only">edytuj</span>
          <FaEdit />
        </Button>
      </div>
    </li>
  );
};
