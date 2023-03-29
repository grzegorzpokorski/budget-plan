import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { z } from "zod";

const requestedIdSchema = z.coerce.number().int().positive();

export const GET = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ statusCode: 403, error: "Forbidden" }),
      { status: 403 },
    );
  }

  const requestedId = requestedIdSchema.safeParse(context.params.id);
  if (!requestedId.success) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  const budget = await prisma.budget.findUnique({
    where: {
      id: requestedId.data,
    },
  });

  if (!budget) {
    return new Response(
      JSON.stringify({ statusCode: 404, error: "Not found" }),
      { status: 404 },
    );
  }

  const sumOfExpenses = await prisma.expense.aggregate({
    where: {
      userId: session.user.id,
      budgetId: budget.id,
    },
    _sum: {
      amount: true,
    },
  });

  return new Response(
    JSON.stringify({
      budget: {
        ...budget,
        sumOfExpenses: sumOfExpenses._sum.amount || 0,
      },
    }),
    { status: 200 },
  );
};

export const DELETE = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ statusCode: 403, error: "Forbidden" }),
      { status: 403 },
    );
  }

  const requestedId = requestedIdSchema.safeParse(parseInt(context.params.id));
  if (!requestedId.success) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  const deletedBudget = await prisma.budget.delete({
    where: {
      id: requestedId.data,
    },
  });

  if (!deletedBudget) {
    return new Response(
      JSON.stringify({ statusCode: 404, error: "Not found" }),
      { status: 404 },
    );
  }

  return new Response(JSON.stringify({ ...deletedBudget }), {
    status: 200,
  });
};

const patchBudgetSchemaBody = z.object({
  name: z.string(),
  maxAmount: z.coerce.number(),
  category: z.enum(["EXPENSE", "PROFIT"]),
});

export const PATCH = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ statusCode: 403, error: "Forbidden" }),
      { status: 403 },
    );
  }

  const requestedId = requestedIdSchema.safeParse(context.params.id);
  const requestBody = patchBudgetSchemaBody.safeParse(await request.json());

  if (!requestedId.success || !requestBody.success) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  const updatedBudget = await prisma.budget.update({
    where: {
      id: requestedId.data,
    },
    data: requestBody.data,
  });

  if (!updatedBudget) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify({ ...updatedBudget }), {
    status: 200,
  });
};
