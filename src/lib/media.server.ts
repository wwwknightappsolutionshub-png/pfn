import "server-only";

import type { Media } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";
import {
  PLACEHOLDER_IMAGES,
  type PlaceholderKind,
} from "@/lib/placeholders";
import { mediaDocumentToUrl } from "@/lib/media";

export async function resolveMediaUrl(
  media: number | Media | null | undefined,
): Promise<string | null> {
  if (!media) return null;
  if (typeof media === "object") return mediaDocumentToUrl(media);

  try {
    const payload = await getPayloadClient();
    const doc = await payload.findByID({
      collection: "media",
      id: media,
      depth: 0,
    });
    return mediaDocumentToUrl(doc as Media);
  } catch {
    return null;
  }
}

/** Batch-resolve numeric media IDs (e.g. unpopulated global upload fields) */
export async function resolveMediaMap(
  ids: number[],
): Promise<Map<number, Media>> {
  const unique = [...new Set(ids.filter(Boolean))];
  const map = new Map<number, Media>();
  if (!unique.length) return map;

  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "media",
      where: { id: { in: unique } },
      limit: unique.length,
      depth: 0,
    });
    for (const doc of res.docs) {
      const id = typeof doc.id === "number" ? doc.id : Number(doc.id);
      if (!Number.isNaN(id)) map.set(id, doc as Media);
    }
  } catch {
    /* return partial map */
  }
  return map;
}

export async function resolveMediaUrlOrPlaceholder(
  media: number | Media | null | undefined,
  fallback: PlaceholderKind,
): Promise<string> {
  return (await resolveMediaUrl(media)) ?? PLACEHOLDER_IMAGES[fallback];
}
