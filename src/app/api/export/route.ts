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

  const exportFileName = `finances-export-${new Date(Date.now())
    .toJSON()
    .replaceAll(":", "-")
    .replaceAll(".", "-")}`;

  const generatedCSV = finances
    .map((finance) => ({
      id: finance.id,
      title: finance.title,
      amount:
        finance.budget.category === "EXPENSE"
          ? finance.amount * -1
          : finance.amount,
      budget: finance.budget.name,
      description: finance.description,
      createdAt: finance.createdAt,
      updatedAt: finance.updatedAt,
    }))
    .reduce((sum, curr) => {
      return (sum +=
        [
          curr.id,
          `"${curr.title}"`,
          curr.amount,
          `"${curr.budget}"`,
          `"${curr.description}"`,
          curr.createdAt.toJSON(),
          curr.updatedAt.toJSON(),
        ].join(",") + "\r\n");
    }, ["id", "title", "amount", "budget", "description", "createdAt", "updatedAt"].join(",") + "\r\n");

  return new Response(generatedCSV, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=UTF-8",
      "Content-Disposition": `attachment; filename="${exportFileName}.csv"`,
    },
  });
};
