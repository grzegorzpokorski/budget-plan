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

  const finances = await prisma.finance.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      budget: {
        select: {
          name: true,
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return new Response(
    JSON.stringify({
      finances,
    }),
    {
      status: 200,
    },
  );
};

const newFinanceSchema = z.object({
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

  const requestBody = newFinanceSchema.safeParse(await request.json());
  if (!requestBody.success) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  const createFinance = await prisma.finance.create({
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

  if (!createFinance) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify({ ...createFinance }), {
    status: 201,
  });
};
