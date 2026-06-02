import "server-only";

import type { Homepage } from "@/payload-types";
import type { Media } from "@/payload-types";
import { mediaDocumentToUrl } from "@/lib/media";
import { resolveMediaMap } from "@/lib/media.server";
import {
  journeyPlaceholder,
  PLACEHOLDER_IMAGES,
} from "@/lib/placeholders";

export type HeroSlideImageKey = "mission" | "pillars" | "gather";

export type HeroSlideImages = Record<
  HeroSlideImageKey,
  { src: string; alt: string }
>;

const DEFAULT_ALTS: Record<HeroSlideImageKey, string> = {
  mission: "Teaching and wisdom",
  pillars: "Wisdom for everyday living",
  gather: "Peter Olusanjo",
};

function slideSrc(
  media: number | Media | null | undefined,
  mediaMap: Map<number, Media>,
  slide: HeroSlideImageKey,
): string {
  const resolved =
    typeof media === "number"
      ? mediaMap.get(media)
      : media && typeof media === "object"
        ? media
        : null;

  if (resolved) {
    const url = mediaDocumentToUrl(resolved);
    if (url) return url;
  }

  if (slide === "pillars") return journeyPlaceholder("grow");
  if (slide === "gather") return PLACEHOLDER_IMAGES.portrait;
  return PLACEHOLDER_IMAGES.article;
}

/** Resolve CMS hero uploads (handles unpopulated media IDs from globals) */
export async function resolveHeroSlideImages(
  homepage?: Homepage | null,
): Promise<HeroSlideImages> {
  const group = homepage?.heroRightImages;

  const refs = [
    group?.missionSlide,
    group?.pillarsSlide,
    group?.gatherSlide,
  ];

  const idsToFetch = refs.filter((m): m is number => typeof m === "number");

  const mediaMap = await resolveMediaMap(idsToFetch);

  return {
    mission: {
      src: slideSrc(group?.missionSlide, mediaMap, "mission"),
      alt: group?.missionAlt?.trim() || DEFAULT_ALTS.mission,
    },
    pillars: {
      src: slideSrc(group?.pillarsSlide, mediaMap, "pillars"),
      alt: group?.pillarsAlt?.trim() || DEFAULT_ALTS.pillars,
    },
    gather: {
      src: slideSrc(group?.gatherSlide, mediaMap, "gather"),
      alt: group?.gatherAlt?.trim() || DEFAULT_ALTS.gather,
    },
  };
}
