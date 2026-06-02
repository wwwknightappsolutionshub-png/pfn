import type { ElementType } from "react";
import { Camera, CirclePlay, Video, X } from "lucide-react";

export type StreamingPlatformId =
  | "instagram"
  | "youtube"
  | "x"
  | "microsoft-teams";

export type StreamingPlatformLink = {
  platform: StreamingPlatformId;
  url: string;
};

export const STREAMING_PLATFORM_META: Record<
  StreamingPlatformId,
  { label: string; Icon: ElementType }
> = {
  instagram: { label: "Instagram", Icon: Camera },
  youtube: { label: "YouTube", Icon: CirclePlay },
  x: { label: "X", Icon: X },
  "microsoft-teams": { label: "Microsoft Teams", Icon: Video },
};

export const DEFAULT_STREAMING_PLATFORMS: StreamingPlatformLink[] = [
  {
    platform: "instagram",
    url: "https://www.instagram.com/profitablelivingnetwork",
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@ProfitableLivingNetwork",
  },
  { platform: "x", url: "https://x.com/ProfitableLivingNet" },
  {
    platform: "microsoft-teams",
    url: "https://teams.microsoft.com",
  },
];

export function normalizeStreamingPlatforms(
  links?: { platform?: string | null; url: string }[] | null,
): StreamingPlatformLink[] {
  if (!links?.length) return DEFAULT_STREAMING_PLATFORMS;

  const order: StreamingPlatformId[] = [
    "instagram",
    "youtube",
    "x",
    "microsoft-teams",
  ];

  const mapped = links
    .filter((l) => l.url && l.platform && l.platform in STREAMING_PLATFORM_META)
    .map((l) => ({
      platform: l.platform as StreamingPlatformId,
      url: l.url,
    }));

  if (!mapped.length) return DEFAULT_STREAMING_PLATFORMS;

  return order
    .map((id) => mapped.find((m) => m.platform === id))
    .filter((x): x is StreamingPlatformLink => Boolean(x));
}
