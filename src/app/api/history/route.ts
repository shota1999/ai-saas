import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Missing userId query parameter" }, { status: 400 });
  }

  try {
    const history = await prisma.generationHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    

    return NextResponse.json(history);
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
