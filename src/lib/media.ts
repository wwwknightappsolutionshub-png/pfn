import type { Media } from "@/payload-types";
import {
  mediaFilenameToUploadsPath,
  normalizeMediaSrc,
} from "@/lib/media-urls";
import {
  PLACEHOLDER_IMAGES,
  type PlaceholderKind,
} from "@/lib/placeholders";

/** Build a browser-ready URL from a Payload media document */
export function mediaDocumentToUrl(media: Media): string | null {
  if (media.url) {
    const raw =
      media.url.startsWith("/") || media.url.startsWith("http")
        ? media.url
        : `/${media.url}`;
    return raw.includes("/api/media/file/")
      ? normalizeMediaSrc(raw)
      : raw;
  }
  if (media.filename) {
    return mediaFilenameToUploadsPath(media.filename);
  }
  return null;
}

export function getMediaUrl(
  media: number | Media | null | undefined,
): string | null {
  if (!media || typeof media === "number") return null;
  return mediaDocumentToUrl(media);
}

/** CMS media URL, or a local placeholder when missing */
export function getMediaUrlOrPlaceholder(
  media: number | Media | null | undefined,
  fallback: PlaceholderKind,
): string {
  return getMediaUrl(media) ?? PLACEHOLDER_IMAGES[fallback];
}
