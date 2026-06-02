import type { Media } from "@/payload-types";
import {
  PLACEHOLDER_IMAGES,
  type PlaceholderKind,
} from "@/lib/placeholders";

export function getMediaUrl(
  media: number | Media | null | undefined,
): string | null {
  if (!media || typeof media === "number") return null;
  return media.url ?? null;
}

/** CMS media URL, or a local placeholder when missing */
export function getMediaUrlOrPlaceholder(
  media: number | Media | null | undefined,
  fallback: PlaceholderKind,
): string {
  return getMediaUrl(media) ?? PLACEHOLDER_IMAGES[fallback];
}
