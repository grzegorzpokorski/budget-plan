import { formatCurrency } from "@/utils/formatCurrency";
import { Progressbar } from "../../atoms/Progressbar/Progressbar";

type Props = {
  name: string;
  max: number;
  current: number;
  as?: "li" | "div";
};

export const SummaryItem = ({ as: Tag = "li", name, max, current }: Props) => {
  return (
    <Tag className="flex flex-col gap-2 pt-4">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold">{name}</h2>
        <div className="font-base text-sm">
          {formatCurrency(current)} /{" "}
          <span className="font-semibold">{formatCurrency(max)}</span>
        </div>
      </div>
      <Progressbar progress={(current / max) * 100} />
    </Tag>
  );
};
