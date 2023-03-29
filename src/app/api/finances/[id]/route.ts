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

  const finance = await prisma.finance.findFirst({
    where: {
      id: requestedId.data,
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

  if (!finance) {
    return new Response(
      JSON.stringify({ statusCode: 404, error: "Not found" }),
      { status: 404 },
    );
  }

  return new Response(JSON.stringify({ finance }), {
    status: 200,
  });
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

  const requestedId = requestedIdSchema.safeParse(context.params.id);
  if (!requestedId.success) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  const sessionUserHaveThisFinance = await prisma.finance.findFirst({
    where: {
      id: requestedId.data,
      userId: session.user.id,
    },
  });

  if (!sessionUserHaveThisFinance) {
    return new Response(
      JSON.stringify({ statusCode: 404, error: "Not found" }),
      { status: 404 },
    );
  }

  const deletedFinance = await prisma.finance.delete({
    where: {
      id: requestedId.data,
    },
    include: {
      budget: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!deletedFinance) {
    return new Response(
      JSON.stringify({ statusCode: 404, error: "Not found" }),
      { status: 404 },
    );
  }

  return new Response(JSON.stringify({ ...deletedFinance }), {
    status: 200,
  });
};

export const patchFinanceSchemaBody = z.object({
  title: z.string(),
  amount: z.coerce.number(),
  budgetId: z.coerce.number().int(),
  description: z.string(),
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

  const requestedId = requestedIdSchema.safeParse(parseInt(context.params.id));
  const requestBody = patchFinanceSchemaBody.safeParse(await request.json());

  if (!requestedId.success || !requestBody.success) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  const sessionUserHaveThisFinance = await prisma.finance.findFirst({
    where: {
      id: requestedId.data,
      userId: session.user.id,
    },
  });

  if (!sessionUserHaveThisFinance) {
    return new Response(
      JSON.stringify({ statusCode: 404, error: "Not found" }),
      { status: 404 },
    );
  }

  const updatedFinance = await prisma.finance.update({
    where: {
      id: requestedId.data,
    },
    data: requestBody.data,
    include: {
      budget: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!updatedFinance) {
    return new Response(
      JSON.stringify({ statusCode: 400, error: "Bad request" }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify({ ...updatedFinance }), {
    status: 200,
  });
};
