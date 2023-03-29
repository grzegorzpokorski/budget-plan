"use client";

import { Container } from "@/components/atoms/Container/Container";
import { Private } from "@/components/atoms/Private/Private";
import { BudgetRealization } from "@/components/molecules/BudgetRealization/BudgetRealization";
import { MainHeader } from "@/components/molecules/MainHeader/MainHeader";
import { Budgets } from "@/components/organisms/Budgets/Budgets";
import { Finances } from "@/components/organisms/Finances/Finances";
import { Modals } from "@/components/organisms/Modals/Modals";

export const HomePage = () => (
  <Private>
    <MainHeader />
    <Container className="flex flex-col py-8">
      <BudgetRealization name="Realizacja" />
      <Budgets />
      <Finances />
    </Container>
    <Modals />
  </Private>
);
