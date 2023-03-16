import { Progressbar } from "@/components/atoms/Progressbar/Progressbar";
import { formatCurrency } from "@/utils/formatCurrency";

type Props = {
  current: number;
  max: number;
  name: string;
};

export const BudgetRealization = ({ current, max, name }: Props) => {
  return (
    <div className="pt-0 pb-4 px-6 bg-white rounded shadow">
      <div className="flex flex-col gap-2 pt-4">
        <div className="flex flex-row justify-between">
          <h2 className="font-bold">{name}</h2>
          <div className="font-base text-sm">
            {formatCurrency(current)} /{" "}
            <span className="font-semibold">{formatCurrency(max)}</span>
          </div>
        </div>
        <Progressbar progress={(current / max) * 100} />
      </div>
    </div>
  );
};
