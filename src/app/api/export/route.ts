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
      createdAt: "asc",
    },
  });

  return new Response(
    JSON.stringify({
      finances: finances.map((item) => ({
        id: item.id,
        title: item.title,
        amount:
          item.budget.category === "EXPENSE" ? item.amount * -1 : item.amount,
        budget: item.budget.name,
        description: item.description,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    }),
    {
      status: 200,
    },
  );
};
