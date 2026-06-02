import type { AboutPageGlobal, SiteSetting } from "@/payload-types";

export const ABOUT_MINISTRIES = [
  [
    "Speaking Ministry",
    "Inspiring audiences with biblical wisdom and practical insight for transformation.",
  ],
  [
    "Teaching Ministry",
    "Equipping believers through Wisdom Snippets, School of Wisdom, and published resources.",
  ],
  [
    "Academic Profile",
    "A scholar whose credentials reflect intellectual rigour in service of Kingdom impact.",
  ],
] as const;

export const ABOUT_MISSION =
  "Profitable Living Network is a Christian mission dedicated to teaching how to live a godly and profitable life — disciplining ourselves for godliness, for it holds promise for the present life and also for the life to come.";

export const ABOUT_BIO =
  "Peter Olusanjo leads Profitable Living Network with a commitment to excellence, spiritual depth, and practical wisdom. His teaching integrates rigorous scholarship with lived faith — equipping individuals to flourish in relationships, business, finance, career, health, and spiritual growth.";

export type AboutPageViewProps = {
  portraitUrl: string;
  credentials?: AboutPageGlobal["credentials"];
  universityProfileUrl?: SiteSetting["universityProfileUrl"];
};
