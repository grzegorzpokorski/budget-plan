import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { z } from "zod";

const newExpenseSchema = z.object({
  title: z.string(),
  amount: z.coerce.number(),
  budgetId: z.coerce.number().int(),
  description: z.string(),
});

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ statusCode: 403, error: "Forbidden" }),
      { status: 403 },
    );
  }

  const requestBody = newExpenseSchema.safeParse(await request.json());
  if (!requestBody.success) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  const createExpense = await prisma.expense.create({
    data: {
      title: requestBody.data.title,
      amount: requestBody.data.amount,
      description: requestBody.data.description,
      budgetId: requestBody.data.budgetId,
      userId: session.user.id,
    },
    include: {
      budget: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!createExpense) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify({ expense: createExpense }), {
    status: 201,
  });
};
