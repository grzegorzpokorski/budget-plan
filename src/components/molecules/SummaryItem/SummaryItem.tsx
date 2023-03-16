"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useUIContext } from "@/providers/UIProvider";
import { formatCurrency } from "@/utils/formatCurrency";
import { FaEdit } from "react-icons/fa";
import { Progressbar } from "../../atoms/Progressbar/Progressbar";

type Props = {
  id: number;
  name: string;
  max: number;
  current: number;
  as?: "li" | "div";
};

export const SummaryItem = ({
  as: Tag = "li",
  id,
  name,
  max,
  current,
}: Props) => {
  const { openBudgetModal } = useUIContext();

  return (
    <Tag className="flex flex-row gap-4 pt-4">
      <div className="flex flex-col gap-2 pt-4 w-full">
        <div className="flex flex-row justify-between">
          <h2 className="font-bold">{name}</h2>
          <div className="font-base text-sm">
            {formatCurrency(current)} /{" "}
            <span className="font-semibold">{formatCurrency(max)}</span>
          </div>
        </div>
        <Progressbar progress={(current / max) * 100} />
      </div>
      <div className="flex flex-col md:flex-row gap-2 ml-auto my-auto">
        <Button
          size="square"
          onClick={() => openBudgetModal({ id, name, max })}
        >
          <span className="sr-only">edytuj</span>
          <FaEdit />
        </Button>
      </div>
    </Tag>
  );
};
