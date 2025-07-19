import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances of Prisma Client in development
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // Optional: shows SQL queries in your terminal (good for dev)
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
