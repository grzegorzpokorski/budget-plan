import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { z } from "zod";

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ statusCode: 403, error: "Forbidden" }),
      { status: 403 },
    );
  }

  const budgets = await prisma.budget.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      id: "asc",
    },
  });

  return new Response(
    JSON.stringify({
      budgets,
    }),
    {
      status: 200,
    },
  );
};

const newBudgetSchema = z.object({
  name: z.string(),
  maxAmount: z.coerce.number(),
});

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ statusCode: 403, error: "Forbidden" }),
      { status: 403 },
    );
  }

  const requestBody = newBudgetSchema.safeParse(await request.json());
  if (!requestBody.success) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  const alreadyExists = await prisma.budget.findFirst({
    where: {
      name: requestBody.data.name,
      userId: session.user.id,
    },
  });

  if (alreadyExists) {
    return new Response(
      JSON.stringify({
        statusCode: 409,
        error: "Budget with given name already exists",
      }),
      {
        status: 409,
      },
    );
  }

  const createBudget = await prisma.budget.create({
    data: {
      name: requestBody.data.name,
      maxAmount: requestBody.data.maxAmount,
      userId: session.user.id,
    },
  });

  if (!createBudget) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify({ ...createBudget }), {
    status: 201,
  });
};
