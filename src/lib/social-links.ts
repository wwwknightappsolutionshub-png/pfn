import type { ElementType } from "react";
import { Camera, CirclePlay, Link2, Users, X } from "lucide-react";

export type SocialPlatformId =
  | "youtube"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "twitter";

export type SocialLink = {
  platform: SocialPlatformId;
  url: string;
};

export const SOCIAL_PLATFORM_META: Record<
  SocialPlatformId,
  { label: string; Icon: ElementType }
> = {
  youtube: { label: "YouTube", Icon: CirclePlay },
  linkedin: { label: "LinkedIn", Icon: Link2 },
  facebook: { label: "Facebook", Icon: Users },
  instagram: { label: "Instagram", Icon: Camera },
  twitter: { label: "X", Icon: X },
};

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "youtube",
    url: "https://www.youtube.com/@ProfitableLivingNetwork",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/profitablelivingnetwork",
  },
  { platform: "twitter", url: "https://x.com/ProfitableLivingNet" },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/peter-olusanjo",
  },
];

export function normalizeSocialLinks(
  links?: { platform?: string | null; url: string }[] | null,
): SocialLink[] {
  if (!links?.length) return DEFAULT_SOCIAL_LINKS;

  const order: SocialPlatformId[] = [
    "youtube",
    "instagram",
    "twitter",
    "linkedin",
    "facebook",
  ];

  const mapped = links
    .filter((l) => l.url && l.platform && l.platform in SOCIAL_PLATFORM_META)
    .map((l) => ({
      platform: l.platform as SocialPlatformId,
      url: l.url,
    }));

  if (!mapped.length) return DEFAULT_SOCIAL_LINKS;

  return order
    .map((id) => mapped.find((m) => m.platform === id))
    .filter((x): x is SocialLink => Boolean(x));
}
