import type { Homepage } from "@/payload-types";
import type { HomepageHeroFields } from "@/lib/cms-page-types";
import type { HeroSlideImages } from "@/lib/hero-images";

export type HeroSlideHighlight = {
  label: string;
  value: string;
};

export type CinematicHeroSlide = {
  id: "mission" | "pillars" | "gather";
  kicker: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  panelTitle: string;
  panelBody: string;
  highlights?: HeroSlideHighlight[];
  pillarLabels?: string[];
  quote?: string;
  quoteCitation?: string;
};

const CONSTELLATION_LAYOUT = [
  { id: "relationships", x: 18, y: 28 },
  { id: "business", x: 72, y: 18 },
  { id: "finance", x: 82, y: 52 },
  { id: "career", x: 55, y: 68 },
  { id: "health", x: 22, y: 62 },
  { id: "spiritual", x: 42, y: 38 },
] as const;

export type ConstellationTopic = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export function resolveConstellationTopics(
  homepage?: (Homepage & HomepageHeroFields) | null,
): ConstellationTopic[] {
  const labels =
    homepage?.constellationTopics
      ?.map((topic) => topic.label?.trim())
      .filter(Boolean) ?? [];

  return CONSTELLATION_LAYOUT.map((layout, index) => ({
    id: layout.id,
    label: labels[index] ?? `Topic ${index + 1}`,
    x: layout.x,
    y: layout.y,
  }));
}

export function buildCinematicHeroSlides(
  homepage: Homepage & HomepageHeroFields,
  heroImages: HeroSlideImages,
): CinematicHeroSlide[] {
  const mission = homepage.heroMissionSlide;
  const pillars = homepage.heroPillarsSlide;
  const gather = homepage.heroGatherSlide;

  return [
    {
      id: "mission",
      kicker: mission?.kicker || "Profitable Living Network",
      title: homepage.cinematicHeadline || "",
      description: homepage.cinematicSubheadline || "",
      imageSrc: heroImages.mission.src,
      imageAlt: heroImages.mission.alt,
      panelTitle: mission?.panelTitle || "",
      panelBody: mission?.panelBody || "",
      highlights:
        mission?.highlights
          ?.filter((item) => item.label && item.value)
          .map((item) => ({
            label: item.label!,
            value: item.value!,
          })) ?? [],
    },
    {
      id: "pillars",
      kicker: pillars?.kicker || "",
      title: pillars?.title || "",
      description: pillars?.description || "",
      imageSrc: heroImages.pillars.src,
      imageAlt: heroImages.pillars.alt,
      panelTitle: pillars?.panelTitle || "",
      panelBody: pillars?.panelBody || "",
      pillarLabels:
        pillars?.pillarLabels
          ?.map((item) => item.label?.trim())
          .filter((label): label is string => Boolean(label)) ?? [],
    },
    {
      id: "gather",
      kicker: gather?.kicker || "",
      title: gather?.title || "",
      description: gather?.description || "",
      imageSrc: heroImages.gather.src,
      imageAlt: heroImages.gather.alt,
      panelTitle: gather?.panelTitle || "",
      panelBody: gather?.panelBody || "",
      quote: gather?.quote || "",
      quoteCitation: gather?.quoteCitation || "",
    },
  ];
}
