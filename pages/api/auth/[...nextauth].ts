import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/shared/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user}) {
      // Check if user already has a plan
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { planId: true }
      });

      // If user doesn't have a plan, assign the Free plan
      if (existingUser && !existingUser.planId) {
        const freePlan = await prisma.plan.findFirst({ where: { name: "Free" } });
        if (freePlan) {
          await prisma.user.update({
            where: { id: user.id },
            data: { planId: freePlan.id }
          });
          console.log(`✅ Assigned Free plan to new user: ${user.email}`);
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
