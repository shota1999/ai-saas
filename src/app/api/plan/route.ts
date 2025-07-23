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



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        plan: {
          select: {
            id: true,
            name: true,
            credits: true,
            price: true,
          },
        },
      },
    });

    if (!user || !user.plan) {
      return NextResponse.json({ error: "User or plan not found" }, { status: 404 });
    }

    return NextResponse.json({ plan: user.plan });
  } catch (error) {
    console.error("Error fetching plan:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
