import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, inquiryType } = body;

    if (!name || !email || !message || !inquiryType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const payload = await getPayloadClient();
    await payload.create({
      collection: "contact-submissions",
      data: { name, email, phone, message, inquiryType },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 },
    );
  }
}
