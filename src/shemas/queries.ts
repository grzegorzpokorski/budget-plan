import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().nonnegative(),
  title: z.string().nonempty(),
  amount: z.number().nonnegative(),
  budgetId: z.number().int().nonnegative(),
  description: z.string(),
  userId: z.string().nonempty(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budget: z.object({
    name: z.string().nonempty(),
  }),
});

export const expensesSchema = z.object({
  expenses: z.array(expenseSchema),
});

export const budgetWithSumOfExpensesSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().nonempty(),
  maxAmount: z.number().nonnegative(),
  userId: z.string().nonempty(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sumOfExpenses: z.number().nonnegative(),
  category: z.enum(["EXPENSE", "PROFIT"]),
});

export const budgetShema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().nonempty(),
  maxAmount: z.number().nonnegative(),
  userId: z.string().nonempty(),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: z.enum(["EXPENSE", "PROFIT"]),
});

export const budgetsSchema = z.object({
  budgets: z.array(budgetShema),
});
