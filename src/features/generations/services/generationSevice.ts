import { prisma } from "@/shared/lib/prisma";
import { PLAN_LIMITS } from "../constants/planLimits";


export async function createGenerationWithStats(
  userId: string,
  prompt: string,
  result: string
) {
  // ✅ Get User Plan
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: { plan: true }, // returns plan object or null
});

if (!user) {
  throw new Error("User not found");
}

if (!user.plan) {
  throw new Error("User plan not found");
}

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

const usage = await prisma.usageStat.findUnique({
  where: {
    userId_date: {
      userId,
      date: today,
    },
  },
});

const usedCredits = usage?.creditsUsed || 0;

// Access the plan name property for indexing
const dailyLimit = PLAN_LIMITS[user.plan.name];

if (usedCredits >= dailyLimit) {
  throw new Error(`Daily limit reached for your plan (${user.plan.name})`);
}

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

return generation
}