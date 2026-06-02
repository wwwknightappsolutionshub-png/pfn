import type { Payload } from "payload";
import { PETER_YOUTUBE_VIDEOS } from "@/lib/peter-youtube-videos";

/** Replace youtube-videos collection with @the148peter catalog */
export async function syncPeterYoutubeVideos(payload: Payload) {
  const existing = await payload.find({
    collection: "youtube-videos",
    limit: 500,
  });

  for (const doc of existing.docs) {
    await payload.delete({ collection: "youtube-videos", id: doc.id });
  }

  const ids: number[] = [];
  for (const video of PETER_YOUTUBE_VIDEOS) {
    const doc = await payload.create({
      collection: "youtube-videos",
      data: {
        title: video.title,
        youtubeId: video.youtubeId,
        description:
          video.description ??
          "Teaching from Peter Olusanjo on the Profitable Living Network YouTube channel.",
        featured: video.featured ?? false,
        showOnHomepage: video.showOnHomepage ?? false,
        order: video.order,
        publishedAt: new Date().toISOString(),
      },
    });
    ids.push(Number(doc.id));
  }

  return { count: ids.length, ids };
}
