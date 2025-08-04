import { prisma } from "@/shared/lib/prisma";

async function main() {
  // Find the Free plan
  const freePlan = await prisma.plan.findFirst({ where: { name: "Free" } });

  if (!freePlan) {
    console.error("No Free plan found. Create it in the Plan table first.");
    return;
  }

  // Update all users who don't have a planId
  await prisma.user.updateMany({
    where: { planId: null },
    data: { planId: freePlan.id },
  });

  console.log("✅ All users now have the Free plan.");
}

main().finally(() => prisma.$disconnect());
