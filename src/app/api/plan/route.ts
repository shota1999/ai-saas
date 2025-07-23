import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, planId } = await req.json();

    if (!userId || !planId) {
      return NextResponse.json({ error: "Missing userId or planId" }, { status: 400 });
    }

    const plan = await prisma.plan.findUnique({ where: { id: planId } });

    if (!plan) {
      return NextResponse.json({ error: "Invalid planId" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { planId },
      include: { plan: true },
    });

    return NextResponse.json(
      { message: `Plan updated to ${plan.name}`, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating plan:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
