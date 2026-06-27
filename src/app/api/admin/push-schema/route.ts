import { NextResponse } from "next/server";
import { runDbPushSchema } from "@/lib/push-db-schema.server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.PAYLOAD_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "PAYLOAD_SECRET is not configured" },
      { status: 500 },
    );
  }

  const provided =
    request.headers.get("x-push-secret") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runDbPushSchema();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("push-schema failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Schema push failed",
      },
      { status: 500 },
    );
  }
}
