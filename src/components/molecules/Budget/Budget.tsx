"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useGetExpenses } from "@/hooks/queries/useGetExpenses";
import { useUIContext } from "@/providers/UIProvider";
import { formatCurrency } from "@/utils/formatCurrency";
import { FaEdit } from "react-icons/fa";
import { Progressbar } from "@/components/atoms/Progressbar/Progressbar";
import { Loader } from "@/components/molecules/Loader/loader";

type Props = {
  id: number;
  name: string;
  maxAmount: number;
  as?: "li" | "div";
};

export const Budget = ({ as: Tag = "li", id, name, maxAmount }: Props) => {
  const { openBudgetModal } = useUIContext();
  const { data, isSuccess, isError } = useGetExpenses();

  if (isError) return <p>error budget</p>;

  if (isSuccess) {
    const current = data.expenses.reduce(
      (sum, curr) => (curr.budgetId === id ? sum + curr.amount : sum),
      0,
    );

    return (
      <Tag className="flex flex-row gap-4 pt-4">
        <div className="flex flex-col gap-2 pt-4 w-full">
          <div className="flex flex-row justify-between">
            <h2 className="font-bold">{name}</h2>
            <div className="font-base text-sm">
              {formatCurrency(current)} /{" "}
              <span className="font-semibold">{formatCurrency(maxAmount)}</span>
            </div>
          </div>
          <Progressbar progress={(current / maxAmount) * 100} />
        </div>
        <div className="flex flex-col md:flex-row gap-2 ml-auto my-auto">
          <Button
            size="square"
            onClick={() => openBudgetModal({ id, name, maxAmount })}
          >
            <span className="sr-only">edytuj</span>
            <FaEdit />
          </Button>
        </div>
      </Tag>
    );
  }

  return null;
};
