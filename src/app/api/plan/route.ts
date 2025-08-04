import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, planSlug } = await req.json();

    if (!userId || !planSlug) {
      return NextResponse.json({ error: "Missing userId or planSlug" }, { status: 400 });
    }

    // Find plan by slug
    const plan = await prisma.plan.findUnique({ where: { slug: planSlug } });

    if (!plan) {
      return NextResponse.json({ error: "Invalid planSlug" }, { status: 404 });
    }

    // Update user with plan's ID
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { planId: plan.id },
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
            slug: true,   // add slug here for clarity
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
