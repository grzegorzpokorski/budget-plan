"use client";

import { Container } from "@/components/atoms/Container/Container";
import { Private } from "@/components/atoms/Private/Private";
import { BudgetRealization } from "@/components/molecules/BudgetRealization/BudgetRealization";
import { MainHeader } from "@/components/molecules/MainHeader/MainHeader";
import { Expenses } from "@/components/organisms/Expenses/Expenses";
import { Budgets } from "@/components/organisms/Budgets/Budgets";
import { Toaster } from "sonner";
import { Modals } from "@/components/organisms/Modals/Modals";

export default function Home() {
  return (
    <Private>
      <MainHeader />
      <Container className="flex flex-col gap-8 py-8">
        <BudgetRealization name="Realizacja" />
        <Budgets />
        <Expenses />
      </Container>
      <Modals />
      <Toaster position="top-center" />
    </Private>
  );
}
