import { z } from "zod";

export const financeSchema = z.object({
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
    category: z.enum(["PROFIT", "EXPENSE"]),
  }),
});

export const financesSchema = z.object({
  finances: z.array(financeSchema),
});

export const budgetWithSumOfFinancesSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().nonempty(),
  maxAmount: z.number().nonnegative(),
  userId: z.string().nonempty(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sumOfFinances: z.number().nonnegative(),
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
