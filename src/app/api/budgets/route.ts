import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

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
