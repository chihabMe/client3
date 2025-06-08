// "use server";
import { prisma as db } from "./db";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/passwords";
import { redirect } from "next/navigation";
import { Provider } from "next-auth/providers";

const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/auth/login",
    error: "/admin/auth/error",
  },
  secret:process.env.SECRET??"owijfkdsgf",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    {
      ...Credentials({
        credentials: {
          email: { label: "Email", placeholder: "Email", type: "email" },
          password: {
            label: "Password",
            placeholder: "Password",
            type: "password",
          },
        },
        authorize: async (credentials) => {
          const email = credentials.email as string;
          const password = credentials.password as string;
          if (!email || !password) return null;
          try {
            const user = await db.user.findFirst({
              where: { email },
            });

            if (!user) return null;

            const isValid = await verifyPassword(
              password as string,
              user.password,
            );
            if (!isValid) return null;
            return {
              id: user.id,
              email: user.email,
              role: "admin",
            };
          } catch (err) {
            console.log("Error in auth.ts ", err);
            return null;
          }
        },
      }),
    } as Provider,
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
export const getUserOrRedirectToLogin = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/admin/auth/login");
  return session.user;
};
