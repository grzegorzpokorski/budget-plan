import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

if (!process.env.GITHUB_ID) throw new Error("Missed GITHUB_ID");
if (!process.env.GITHUB_SECRET) throw new Error("Missed GITHUB_SECRET");

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
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
        port: process.env.EMAIL_SERVER_PORT
          ? parseInt(process.env.EMAIL_SERVER_PORT)
          : 587,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);

        const html = (params: { url: string; host: string }) => {
          const { url, host } = params;

          const escapedHost = host.replace(/\./g, "&#8203;.");

          const brandColor = "#346df1";
          const color = {
            background: "#f9f9f9",
            text: "#444",
            mainBackground: "#fff",
            buttonBackground: brandColor,
            buttonBorder: brandColor,
            buttonText: "#fff",
          };

          return `
        <body style="background: ${color.background};">
          <table width="100%" border="0" cellspacing="20" cellpadding="0"
            style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
            <tr>
              <td align="center"
                style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
                Zaloguj się do <strong>${escapedHost}</strong>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                        target="_blank"
                        style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Zaloguj się</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center"
                style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
                Jeśli prośba o tę wiadomość nie pochodzi od Ciebie, możesz ją bezpiecznie zignorować.
              </td>
            </tr>
          </table>
        </body>
        `;
        };

        const text = ({ url, host }: { url: string; host: string }) => {
          return `Zaloguj się do ${host}\n${url}\n\n`;
        };

        await transport.sendMail({
          to: email,
          from,
          subject: `Zaloguj się do ${host}`,
          text: text({ url, host }),
          html: html({ url, host }),
        });
      },
    }),
  ],
};
export default NextAuth(authOptions);
