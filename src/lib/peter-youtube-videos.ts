import { PETER_SOCIAL_URLS } from "@/lib/social-links";
import type { YoutubeVideoItem } from "@/lib/youtube";

/** @the148peter — https://www.youtube.com/@the148peter */
export const PETER_YOUTUBE_CHANNEL = PETER_SOCIAL_URLS.youtube;

export const PETER_YOUTUBE_CHANNEL_ID = "UCmElR2x8PFXsNZyyQ__ktIQ";

export type PeterYoutubeVideoSeed = {
  title: string;
  youtubeId: string;
  description?: string;
  featured?: boolean;
  showOnHomepage?: boolean;
  order: number;
};

/** Latest public uploads from @the148peter (sync via npm run sync:youtube) */
export const PETER_YOUTUBE_VIDEOS: PeterYoutubeVideoSeed[] = [
  {
    title: "Wisdom Snippets: Simplicity",
    youtubeId: "_LDd67BG4bo",
    featured: true,
    showOnHomepage: true,
    order: 1,
  },
  {
    title: "Wisdom Snippets: Excuses",
    youtubeId: "Dz6cgIcbuMM",
    featured: true,
    showOnHomepage: true,
    order: 2,
  },
  {
    title: "Wisdom Snippets: Right Information",
    youtubeId: "L1JSmrcl6jc",
    featured: true,
    showOnHomepage: true,
    order: 3,
  },
  {
    title: "Wisdom Snippets: Advantages of Adversities",
    youtubeId: "7IlXdC31QCg",
    featured: true,
    showOnHomepage: true,
    order: 4,
  },
  {
    title: "Wisdom Snippets: Commanding Respect",
    youtubeId: "tGM5M5QSaFI",
    order: 5,
  },
  {
    title: "Wisdom Snippets: A Healthy Self-Image",
    youtubeId: "13sMawxaxLU",
    order: 6,
  },
  {
    title: "Wisdom Snippets: Self-Control",
    youtubeId: "NFIOrkFnBb4",
    order: 7,
  },
  {
    title: "Wisdom Snippets: Attitude to Correction",
    youtubeId: "vBnN0dV4DQM",
    order: 8,
  },
  {
    title: "Wisdom Snippets: Vision & Competition",
    youtubeId: "gUKL5_JLH5g",
    order: 9,
  },
  {
    title: "Wisdom Snippets: Decisiveness",
    youtubeId: "dCaRJk1qEHg",
    order: 10,
  },
  {
    title: "Wisdom Snippets: CAUSE & EFFECT",
    youtubeId: "zn92UeaHBBg",
    order: 11,
  },
  {
    title: "Wisdom Snippets: Humility",
    youtubeId: "maOeEjIqBvY",
    order: 12,
  },
  {
    title: "Faith, Foolishness & Wisdom- 5",
    youtubeId: "X0iUa0UwSyQ",
    order: 13,
  },
  {
    title: "Wisdom Snippets: Responsibility",
    youtubeId: "l7-EGSAnWQQ",
    order: 14,
  },
  {
    title: "Wisdom Snippets: Planning",
    youtubeId: "lJgD6DaEekw",
    order: 15,
  },
];

/** Placeholder IDs from old demo seed — replaced by @the148peter catalog */
export const LEGACY_DEMO_YOUTUBE_IDS = new Set([
  "M7lc1UVf-VE",
  "kJQP7kiw5Fk",
  "9bZkp7q19f0",
  "RgKAFK5djSk",
  "OPf0YbXqDm0",
  "y6120QOlsfU",
  "L_jWHffIx5E",
  "Zi_XLOBDo_Y",
]);

export function mapPeterYoutubeVideos(): YoutubeVideoItem[] {
  return PETER_YOUTUBE_VIDEOS.map((v) => ({
    id: v.order,
    title: v.title,
    youtubeId: v.youtubeId,
    description:
      v.description ??
      "Teaching from Peter Olusanjo on the 148Inspirations YouTube channel.",
  }));
}

export function isLegacyDemoYoutubeCatalog(
  videos: { youtubeId: string }[],
): boolean {
  if (!videos.length) return true;
  return videos.some((v) => LEGACY_DEMO_YOUTUBE_IDS.has(v.youtubeId));
}
