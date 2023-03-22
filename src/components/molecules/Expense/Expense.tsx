"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useUIContext } from "@/providers/UIProvider";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { FaEdit } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type ExpensesItemProps = {
  id: number;
  title: string;
  amount: number;
  budget: {
    name: string;
  };
  budgetId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
} & {
  displayDate: boolean;
};

export const Expense = ({
  id,
  title,
  amount,
  budget,
  budgetId,
  description,
  createdAt,
  displayDate,
}: ExpensesItemProps) => {
  const { openExpenseModal } = useUIContext();

  return (
    <li className="flex flex-col items-center md:items-start justify-start w-full">
      <time
        dateTime={createdAt}
        className={twMerge(
          "border-b-2 py-3 px-6 text-xs text-gray-500 capitalize",
          !displayDate && "sr-only",
        )}
      >
        {formatDate(createdAt)}
      </time>
      <article
        className={twMerge(
          "flex flex-row items-start justify-start gap-6 w-full px-6 py-4 bg-white shadow rounded",
        )}
      >
        <div className="flex flex-col gap-1 md:gap-4 md:flex-row md:items-center">
          <p className="font-medium text-red-500 mt-1.5 min-w-[105px]">
            -{formatCurrency(amount)}
          </p>
          <div className="flex flex-col text-sm mt-1">
            <h3 className="font-bold">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{budget.name}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 ml-auto my-auto">
          <Button
            size="square"
            onClick={() =>
              openExpenseModal({
                id,
                title,
                amount,
                budgetName: budget.name,
                budgetId,
                description,
              })
            }
          >
            <span className="sr-only">edytuj</span>
            <FaEdit />
          </Button>
        </div>
      </article>
    </li>
  );
};
