"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useGetFinances } from "@/hooks/queries/useGetFinances";
import { useUIContext } from "@/providers/UIProvider";
import { formatCurrency } from "@/utils/formatCurrency";
import { FaEdit } from "react-icons/fa";
import { Progressbar } from "@/components/atoms/Progressbar/Progressbar";

type Props = {
  id: number;
  name: string;
  maxAmount: number;
  category: "PROFIT" | "EXPENSE";
  as?: "li" | "div";
};

export const Budget = ({
  as: Tag = "li",
  id,
  name,
  maxAmount,
  category,
}: Props) => {
  const { openBudgetModal } = useUIContext();
  const { data, isSuccess, isError } = useGetFinances();

  if (isError) return <p>error budget</p>;

  if (isSuccess) {
    const current = data.finances.reduce(
      (sum, curr) => (curr.budgetId === id ? sum + curr.amount : sum),
      0,
    );

    return (
      <Tag className="flex flex-row gap-4 pt-4">
        <div className="flex flex-col gap-2 pt-4 w-full">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold">{name}</h3>
            <p className="font-base text-sm text-end">
              {formatCurrency(current)} /{" "}
              <span className="font-semibold">{formatCurrency(maxAmount)}</span>
            </p>
          </div>
          <Progressbar progress={(current / maxAmount) * 100} />
        </div>
        <div className="flex flex-col md:flex-row gap-2 ml-auto my-auto">
          <Button
            size="square"
            onClick={() => openBudgetModal({ id, name, maxAmount, category })}
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
