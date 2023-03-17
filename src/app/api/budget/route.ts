import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ statusCode: 403, error: "Forbidden" }),
      { status: 403 },
    );
  }

  return new Response(JSON.stringify({ data: { budgets: [] } }), {
    status: 200,
  });
};
