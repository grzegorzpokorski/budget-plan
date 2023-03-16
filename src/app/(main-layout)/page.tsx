"use client";

import { Container } from "@/components/atoms/Container/Container";
import { Private } from "@/components/atoms/Private/Private";
import { BudgetRealization } from "@/components/molecules/BudgetRealization/BudgetRealization";
import { MainHeader } from "@/components/molecules/MainHeader/MainHeader";
import { BudgetModal } from "@/components/organisms/BudgetModal/BudgetModal";
import { ExpenseModal } from "@/components/organisms/ExpenseModal/ExpenseModal";
import { Expenses } from "@/components/organisms/Expenses/Expenses";
import { Summary } from "@/components/organisms/Summary/Summary";

export default function Home() {
  return (
    <Private>
      <MainHeader />
      <Container className="flex flex-col gap-8 py-8">
        <BudgetRealization current={2300} max={3550} name="Realizacja" />
        <Summary />
        <Expenses />
      </Container>
      <ExpenseModal />
      <BudgetModal />
    </Private>
  );
}
