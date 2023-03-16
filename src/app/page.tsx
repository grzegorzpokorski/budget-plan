import { Container } from "@/components/atoms/Container/Container";
import { BaseModal } from "@/components/molecules/BaseModal/BaseModal";
import { BudgetRealization } from "@/components/molecules/BudgetRealization/BudgetRealization";
import { MainHeader } from "@/components/molecules/MainHeader/MainHeader";
import { AddBudgetModal } from "@/components/organisms/AddBudgetModal/AddBudgetModal";
import { AddExpenseModal } from "@/components/organisms/AddExpenseModal/AddExpenseModal";
import { Expenses } from "@/components/organisms/Expenses/Expenses";
import { Summary } from "@/components/organisms/Summary/Summary";

export default function Home() {
  return (
    <>
      <MainHeader />
      <Container className="flex flex-col gap-8 py-8">
        <BudgetRealization current={2300} max={3550} name="Realizacja" />
        <Summary />
        <Expenses />
      </Container>
      <AddExpenseModal />
      <AddBudgetModal />
    </>
  );
}
