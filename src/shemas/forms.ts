import { z } from "zod";

export const budgetFormSchema = z.object({
  name: z.string().min(3, {
    message: "Nazwa budżetu musi składać się z co najmniej 3 znaków.",
  }),
  maxAmount: z.coerce.number().positive({
    message: "Docelowa wartość budżetu musi być większa od 0.",
  }),
});

export const expenseFormSchema = z.object({
  title: z.string().min(1, { message: "Tytuł nie może być pusty" }),
  amount: z.coerce.number().positive({
    message: "Wartość wydatku musi być większa od 0.",
  }),
  budgetId: z.coerce
    .number({ invalid_type_error: "Wybierz budżet" })
    .nonnegative({ message: "Wybierz budżet" }),
  description: z.string(),
});
