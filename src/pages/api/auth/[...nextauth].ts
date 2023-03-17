import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

if (!process.env.GITHUB_ID) throw new Error("Missed GITHUB_ID");
if (!process.env.GITHUB_SECRET) throw new Error("Missed GITHUB_SECRET");

export const authOptions: NextAuthOptions = {
  callbacks: {
    // jwt({ token, account, user }) {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //     token.id = user?.id;
    //   }
    //   return token;
    // },
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};
export default NextAuth(authOptions);
