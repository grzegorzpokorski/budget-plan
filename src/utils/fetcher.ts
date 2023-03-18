import { z } from "zod";

export type HTTPMethod = "GET" | "POST" | "DELETE" | "PATCH";

export const fetcher = async <T>({
  url,
  method,
  schema,
  body,
}: {
  url: string;
  method: HTTPMethod;
  schema: z.ZodType<T>;
  body?: object;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    throw new Error(`Response with status ${response.status} is not ok.`);
  }

  return schema.parse(await response.json());
};
