"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Progressbar } from "@/components/atoms/Progressbar/Progressbar";
import { useBudgetRealization } from "./useBudgetRealization";
import { useUIContext } from "@/providers/UIProvider";
import { formatCurrency } from "@/utils/formatCurrency";
import { Loader } from "./Loader";

type Props = {
  name: string;
};

export const BudgetRealization = ({ name }: Props) => {
  const { current, max, loading } = useBudgetRealization();
  const { openBudgetModal } = useUIContext();

  if (loading) {
    return <Loader />;
  }
  if (!max) {
    return <Button onClick={() => openBudgetModal()}>Dodaj budżet</Button>;
  }

  return (
    <section className="pt-0 pb-4 px-6 bg-white rounded shadow">
      <div className="flex flex-col gap-2 pt-4">
        <div className="flex flex-row justify-between">
          <h2 className="font-bold">{name}</h2>
          <output className="font-base text-sm">
            {formatCurrency(current)} /{" "}
            <span className="font-semibold">{formatCurrency(max)}</span>
          </output>
        </div>
        <Progressbar progress={(current / max) * 100} />
      </div>
    </section>
  );
};
