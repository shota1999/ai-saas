import { prisma } from "@/shared/lib/prisma";

async function main() {
  console.log("🔍 Checking for users without plans...");
  
  // Find users without a plan
  const usersWithoutPlan = await prisma.user.findMany({
    where: { planId: null },
    select: { id: true, email: true }
  });

  console.log(`Found ${usersWithoutPlan.length} users without a plan`);

  if (usersWithoutPlan.length === 0) {
    console.log("✅ All users already have a plan assigned");
    return;
  }

  // Find the Free plan
  const freePlan = await prisma.plan.findFirst({ where: { name: "Free" } });

  if (!freePlan) {
    console.error("❌ Free plan not found. Please run the seed script first.");
    return;
  }

  // Assign Free plan to users without a plan
  await prisma.user.updateMany({
    where: { planId: null },
    data: { planId: freePlan.id }
  });

  console.log(`✅ Assigned Free plan to ${usersWithoutPlan.length} users`);
  
  // Log the affected users
  usersWithoutPlan.forEach(user => {
    console.log(`  - ${user.email} (${user.id})`);
  });
}

main()
  .catch((e) => console.error("❌ Error:", e))
  .finally(() => prisma.$disconnect()); 