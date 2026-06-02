import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { getSeedAdminCredentials, seedAdminUser } from "@/lib/seed-admin";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    const payload = await getPayloadClient();
    const admin = await seedAdminUser(payload);
    const { email } = getSeedAdminCredentials();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3010";

    return NextResponse.json({
      success: true,
      admin,
      loginUrl: `${baseUrl}/admin`,
      email,
      message: admin.created
        ? "Admin user created."
        : "Admin user updated (password reset to seed value).",
    });
  } catch (error) {
    console.error("Admin seed failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Admin seed failed" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return POST();
}
