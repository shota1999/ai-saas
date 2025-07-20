import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, creditsUsed } = await req.json();

    if (!userId || creditsUsed == null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const usage = await prisma.usageStat.create({
      data: { userId, creditsUsed },
    });

    return NextResponse.json(usage);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Missing userId query parameter" },
        { status: 400 }
      );
    }

    const usageStats = await prisma.usageStat.findMany({
      where: { userId },
      orderBy: { date: "desc" }, // newest first
    });

    return NextResponse.json(usageStats);
  } catch (error) {
    console.error("Error fetching usage stats:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}