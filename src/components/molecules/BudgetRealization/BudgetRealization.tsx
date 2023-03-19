"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Progressbar } from "@/components/atoms/Progressbar/Progressbar";
import { useBudgetModal } from "@/hooks/useBudgetModal";
import { useBudgetRealization } from "@/hooks/useBudgetRealization";
import { formatCurrency } from "@/utils/formatCurrency";

type Props = {
  name: string;
};

export const BudgetRealization = ({ name }: Props) => {
  const data = useBudgetRealization();
  const { openModal } = useBudgetModal();

  if (data?.max) {
    return (
      <div className="pt-0 pb-4 px-6 bg-white rounded shadow">
        <div className="flex flex-col gap-2 pt-4">
          <div className="flex flex-row justify-between">
            <h2 className="font-bold">{name}</h2>
            <div className="font-base text-sm">
              {formatCurrency(data?.current || 0)} /{" "}
              <span className="font-semibold">
                {formatCurrency(data?.max || 0)}
              </span>
            </div>
          </div>
          <Progressbar
            progress={((data?.current || 0) / (data?.max || 0)) * 100}
          />
        </div>
      </div>
    );
  }

  return <Button onClick={() => openModal()}>Dodaj budżet</Button>;
};
