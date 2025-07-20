
import { prisma } from "@/shared/lib/prisma";

export async function createGenerationWithStats(userId: string, prompt: string, result: string) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); 

  const [generation] = await prisma.$transaction([
    prisma.generationHistory.create({
      data: { userId, prompt, result },
    }),
    prisma.apiRequestCounterLog.create({
      data: { userId },
    }),
    prisma.usageStat.upsert({
      where: { userId_date: { userId, date: today } },
      update: { creditsUsed: { increment: 1 } },
      create: { userId, creditsUsed: 1, date: today },
    }),
  ]);

  return generation;
}
