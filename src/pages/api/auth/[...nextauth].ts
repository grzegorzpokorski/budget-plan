import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

if (!process.env.GITHUB_ID) throw new Error("Missed GITHUB_ID");
if (!process.env.GITHUB_SECRET) throw new Error("Missed GITHUB_SECRET");

// if (!process.env.GOOGLE_CLIENT_ID) throw new Error("Missed GITHUB_ID");
// if (!process.env.GOOGLE_CLIENT_SECRET) throw new Error("Missed GITHUB_SECRET");

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
