import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { syncPeterYoutubeVideos } from "@/lib/sync-youtube-videos";
import { PETER_YOUTUBE_CHANNEL } from "@/lib/peter-youtube-videos";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 },
    );
  }

  try {
    const payload = await getPayloadClient();
    const result = await syncPeterYoutubeVideos(payload);

    await payload.updateGlobal({
      slug: "site-settings",
      data: { youtubeChannelUrl: PETER_YOUTUBE_CHANNEL },
    });

    return NextResponse.json({
      success: true,
      channel: PETER_YOUTUBE_CHANNEL,
      ...result,
    });
  } catch (error) {
    console.error("YouTube sync failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "YouTube sync failed",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return POST();
}
