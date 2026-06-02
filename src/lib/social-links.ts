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

/** Peter Olusanjo — canonical profile URLs (footer & fallbacks) */
export const PETER_SOCIAL_URLS = {
  youtube: "https://www.youtube.com/@the148peter",
  instagram: "https://www.instagram.com/the148peter/",
  linkedin: "https://uk.linkedin.com/in/peter-olusanjo-2a447390",
  facebook: "https://www.facebook.com/polayiwola/",
} as const;

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: "youtube", url: PETER_SOCIAL_URLS.youtube },
  { platform: "instagram", url: PETER_SOCIAL_URLS.instagram },
  { platform: "linkedin", url: PETER_SOCIAL_URLS.linkedin },
  { platform: "facebook", url: PETER_SOCIAL_URLS.facebook },
];

const CANONICAL_SOCIAL_PLATFORMS = new Set<SocialPlatformId>([
  "youtube",
  "instagram",
  "linkedin",
  "facebook",
]);

export function normalizeSocialLinks(
  links?: { platform?: string | null; url: string }[] | null,
): SocialLink[] {
  const result: SocialLink[] = [...DEFAULT_SOCIAL_LINKS];

  const twitter = links?.find(
    (l) => l.platform === "twitter" && l.url?.trim(),
  );
  if (twitter) {
    result.push({ platform: "twitter", url: twitter.url });
  }

  return result.filter(
    (l) =>
      CANONICAL_SOCIAL_PLATFORMS.has(l.platform) || l.platform === "twitter",
  );
}
