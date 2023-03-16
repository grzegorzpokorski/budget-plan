import { z } from "zod";

export const addBudgetFormSchema = z.object({
  name: z.string().min(3, {
    message: "Nazwa budżetu musi składać się z co najmniej 3 znaków.",
  }),
  maxAmount: z.coerce.number().positive({
    message: "Docelowa wartość budżetu musi być większa od 0.",
  }),
});

export const addExpenseFormSchema = z.object({
  title: z.string().min(1, { message: "Tytuł nie może być pusty" }),
  amount: z.coerce.number().positive({
    message: "Wartość wydatku musi być większa od 0.",
  }),
  budgetId: z.string().nonempty({ message: "Wybierz budżet" }),
  description: z.string(),
});
