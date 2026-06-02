import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const phone =
      typeof body.phone === "string" ? body.phone.trim() : undefined;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const payload = await getPayloadClient();
    await payload.create({
      collection: "contact-submissions",
      data: {
        name: "WhatsApp chat visitor",
        email: "whatsapp-chat@profitableliving.network",
        phone: phone || undefined,
        message,
        inquiryType: "whatsapp",
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
