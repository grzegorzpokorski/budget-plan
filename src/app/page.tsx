import { Container } from "@/components/atoms/Container/Container";
import { BudgetRealization } from "@/components/molecules/BudgetRealization/BudgetRealization";
import { MainHeader } from "@/components/molecules/MainHeader/MainHeader";
import { Expenses } from "@/components/organisms/Expenses/Expenses";
import { Summary } from "@/components/organisms/Summary/Summary";

export default function Home() {
  return (
    <>
      <MainHeader />
      <Container className="flex flex-col gap-8 py-8">
        <BudgetRealization />
        <Summary />
        <Expenses />
      </Container>
    </>
  );
}
