import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time } = body;

    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const message = `Consultation booking request.\nPreferred date: ${date}\nPreferred time: ${time}`;

    const payload = await getPayloadClient();
    await payload.create({
      collection: "contact-submissions",
      data: {
        name,
        email,
        phone,
        message,
        inquiryType: "consultancy",
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit consultation request" },
      { status: 500 },
    );
  }
}
