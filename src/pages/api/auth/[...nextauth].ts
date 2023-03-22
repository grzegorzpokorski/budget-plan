import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

if (!process.env.GITHUB_ID) throw new Error("Missed GITHUB_ID");
if (!process.env.GITHUB_SECRET) throw new Error("Missed GITHUB_SECRET");

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
  pages: {
    verifyRequest: "/check-email",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      // sendVerificationRequest({
      //   identifier: email,
      //   url,
      //   provider: { server, from },
      // }) {
      //   /* your function */
      // },
    }),
  ],
};
export default NextAuth(authOptions);
