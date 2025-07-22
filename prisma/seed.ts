import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.plan.createMany({
    data: [
      { id: "FREE", name: "Free", credits: 10, price: 0 },
      { id: "PRO", name: "Pro", credits: 100, price: 10 },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Plans seeded!");

  // ✅ Assign FREE plan to existing users
  await prisma.user.updateMany({
    where: { planId: null },
    data: { planId: "FREE" },
  });

  console.log("✅ Assigned FREE plan to users without a plan");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
