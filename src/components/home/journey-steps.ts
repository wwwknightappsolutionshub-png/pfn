/** Copy for Section II journey steps (images come from CMS) */
export const JOURNEY_STEP_META = [
  {
    key: "learn" as const,
    label: "Learn",
    desc: "Receive timeless wisdom rooted in Scripture.",
  },
  {
    key: "apply" as const,
    label: "Apply",
    desc: "Put truth into practice in daily decisions.",
  },
  {
    key: "grow" as const,
    label: "Grow",
    desc: "Develop character, competence, and conviction.",
  },
  {
    key: "influence" as const,
    label: "Influence",
    desc: "Lead others through exemplary living.",
  },
  {
    key: "impact" as const,
    label: "Impact",
    desc: "Advance Kingdom purposes in your sphere.",
  },
];

export type JourneyStepKey = (typeof JOURNEY_STEP_META)[number]["key"];

export type ResolvedJourneyStep = {
  key: JourneyStepKey;
  label: string;
  desc: string;
  image: string;
  imageAlt: string;
};
