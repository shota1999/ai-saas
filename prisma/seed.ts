import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create plans with consistent naming
  await prisma.plan.createMany({
    data: [
      { name: "Free", credits: 10, price: 0, slug: "free" },
      { name: "Pro", credits: 100, price: 10, slug: "pro" },
      { name: "Enterprise", credits: 1000, price: 50, slug: "enterprise" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Plans seeded!");

  // Find the Free plan by name
  const freePlan = await prisma.plan.findFirst({ where: { name: "Free" } });
  
  if (freePlan) {
    // Assign Free plan to existing users without a plan
    await prisma.user.updateMany({
      where: { planId: null },
      data: { planId: freePlan.id },
    });

    console.log("✅ Assigned Free plan to users without a plan");
  } else {
    console.log("❌ Free plan not found");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
