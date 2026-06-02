import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { runSeed } from "@/lib/seed-data";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    const payload = await getPayloadClient();
    const stats = await runSeed(payload);
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Seed failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return POST();
}
