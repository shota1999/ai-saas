import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const log = await prisma.apiRequestCounterLog.create({
      data: { userId },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error("Error logging API request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const count = await prisma.apiRequestCounterLog.count({
      where: { userId },
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching API request count:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
