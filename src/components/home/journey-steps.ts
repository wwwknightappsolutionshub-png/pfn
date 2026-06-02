import { PLACEHOLDER_IMAGES } from "@/lib/placeholders";

export const JOURNEY_STEPS = [
  {
    key: "learn",
    label: "Learn",
    desc: "Receive timeless wisdom rooted in Scripture.",
    image: PLACEHOLDER_IMAGES.journey.learn,
  },
  {
    key: "apply",
    label: "Apply",
    desc: "Put truth into practice in daily decisions.",
    image: PLACEHOLDER_IMAGES.journey.apply,
  },
  {
    key: "grow",
    label: "Grow",
    desc: "Develop character, competence, and conviction.",
    image: PLACEHOLDER_IMAGES.journey.grow,
  },
  {
    key: "influence",
    label: "Influence",
    desc: "Lead others through exemplary living.",
    image: PLACEHOLDER_IMAGES.journey.influence,
  },
  {
    key: "impact",
    label: "Impact",
    desc: "Advance Kingdom purposes in your sphere.",
    image: PLACEHOLDER_IMAGES.journey.impact,
  },
] as const;

export type JourneyStep = (typeof JOURNEY_STEPS)[number];
