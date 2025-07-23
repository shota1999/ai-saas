import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { PLAN_LIMITS } from "@/features/generations/constants/planLimits";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Get user plan
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        plan: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user || !user.plan) {
      return NextResponse.json({ error: "User or plan not found" }, { status: 404 });
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Get usage for today
    const usage = await prisma.usageStat.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    const usedCredits = usage?.creditsUsed || 0;
    const dailyLimit = PLAN_LIMITS[user.plan.id];
    const remaining = dailyLimit - usedCredits;

    return NextResponse.json({
      usedCredits,
      dailyLimit,
      remaining,
      plan: user.plan.id,
    });
  } catch (error) {
    console.error("Error fetching usage:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
