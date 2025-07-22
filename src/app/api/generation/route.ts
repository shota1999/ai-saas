import { createGenerationWithStats } from "@/features/generations/services/generationSevice";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, prompt, result } = await req.json();

    if (!userId || !prompt || !result) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const generation = await createGenerationWithStats(userId, prompt, result);

    return NextResponse.json(generation, { status: 201 });
  } catch (error: unknown) {
    console.error("Error saving generation:", error);

    // Narrow error to extract message safely
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
