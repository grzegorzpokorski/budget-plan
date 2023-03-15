import { SummaryItem } from "../SummaryItem/SummaryItem";

export const BudgetRealization = () => {
  return (
    <div className="pt-0 pb-4 px-6 bg-white rounded shadow">
      <SummaryItem name="Realizacja" current={1542.25} max={3400} as="div" />
    </div>
  );
};
