import type { Media } from "@/payload-types";

/** CMS page global shapes (mirrors Payload globals until types are regenerated). */

export type ServicesPageGlobal = {
  heroKicker?: string | null;
  heroTitle?: string | null;
  heroDescription?: string | null;
  heroImage?: number | Media | null;
  heroImageAlt?: string | null;
};

export type ContactPageGlobal = {
  leftKicker?: string | null;
  leftTitle?: string | null;
  leftDescription?: string | null;
  inquiryTopics?: { topic?: string | null; id?: string | null }[] | null;
  rightKicker?: string | null;
  rightTitle?: string | null;
  rightDescription?: string | null;
};

export type EventsPageGlobal = {
  heroKicker?: string | null;
  heroTitle?: string | null;
  heroDescription?: string | null;
};

export type ResourcesPageGlobal = {
  heroKicker?: string | null;
  heroTitle?: string | null;
  heroDescription?: string | null;
  youtubeSectionLabel?: string | null;
  youtubeSectionTitle?: string | null;
  youtubeSectionSubtitle?: string | null;
  libraryKicker?: string | null;
  libraryTitle?: string | null;
};

export type HomepageHeroFields = {
  cinematicHeadline?: string | null;
  cinematicSubheadline?: string | null;
  heroMissionSlide?: {
    kicker?: string | null;
    panelTitle?: string | null;
    panelBody?: string | null;
    highlights?: { label?: string | null; value?: string | null }[] | null;
  } | null;
  heroPillarsSlide?: {
    kicker?: string | null;
    title?: string | null;
    description?: string | null;
    panelTitle?: string | null;
    panelBody?: string | null;
    pillarLabels?: { label?: string | null }[] | null;
  } | null;
  heroGatherSlide?: {
    kicker?: string | null;
    title?: string | null;
    description?: string | null;
    panelTitle?: string | null;
    panelBody?: string | null;
    quote?: string | null;
    quoteCitation?: string | null;
  } | null;
  wisdomSectionSubtitle?: string | null;
  wisdomSectionCtaLabel?: string | null;
  constellationTopics?: { label?: string | null }[] | null;
  journeySteps?: { label?: string | null; description?: string | null }[] | null;
  testimonialsSectionLabel?: string | null;
  testimonialsSectionTitle?: string | null;
};

export type AboutPageContent = {
  heroKicker?: string | null;
  heroTitle?: string | null;
  missionStatement?: unknown;
  scriptureReference?: string | null;
  biographySectionLabel?: string | null;
  biography?: unknown;
  ministriesSectionLabel?: string | null;
  speakingMinistryTitle?: string | null;
  speakingMinistry?: unknown;
  teachingMinistryTitle?: string | null;
  teachingMinistry?: unknown;
  academicProfileTitle?: string | null;
  academicProfile?: unknown;
  academicJourneyTitle?: string | null;
  academicJourneySubtitle?: string | null;
  universityProfileUrl?: string | null;
  universityProfileLabel?: string | null;
  credentials?: {
    title: string;
    institution: string;
    detail?: string | null;
    id?: string | null;
  }[] | null;
  portrait?: number | Media | null;
};
