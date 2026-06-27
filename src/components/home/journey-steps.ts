export type JourneyStepKey =
  | "learn"
  | "apply"
  | "grow"
  | "influence"
  | "impact";

export const JOURNEY_STEP_KEYS: JourneyStepKey[] = [
  "learn",
  "apply",
  "grow",
  "influence",
  "impact",
];

export type ResolvedJourneyStep = {
  key: JourneyStepKey;
  label: string;
  desc: string;
  image: string;
  imageAlt: string;
};
