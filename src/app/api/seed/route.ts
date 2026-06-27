import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { runSeed } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

function readSeedSecret(request: Request): string | null {
  return (
    request.headers.get("x-seed-secret") ||
    request.headers.get("x-push-secret") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    null
  );
}

export async function POST(request: Request) {
  const secret = process.env.PAYLOAD_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "PAYLOAD_SECRET is not configured" },
      { status: 500 },
    );
  }

  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    const provided = readSeedSecret(request);
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const replace =
    request.headers.get("x-seed-replace") === "true" ||
    new URL(request.url).searchParams.get("replace") === "true";

  try {
    const payload = await getPayloadClient();
    const stats = await runSeed(payload, { replace });
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Seed failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  return POST(request);
}
