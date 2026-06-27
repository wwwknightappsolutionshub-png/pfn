import "server-only";

import type { Homepage, Media } from "@/payload-types";
import type { HomepageHeroFields } from "@/lib/cms-page-types";
import {
  JOURNEY_STEP_KEYS,
  type JourneyStepKey,
  type ResolvedJourneyStep,
} from "@/components/home/journey-steps";
import { mediaDocumentToUrl } from "@/lib/media";
import { resolveMediaMap } from "@/lib/media.server";
import { journeyPlaceholder } from "@/lib/placeholders";

export type { JourneyStepKey, ResolvedJourneyStep };

type JourneyImageGroup = Homepage["journeyStepImages"];

const STEP_MEDIA_FIELDS: Record<
  JourneyStepKey,
  keyof NonNullable<JourneyImageGroup>
> = {
  learn: "learnImage",
  apply: "applyImage",
  grow: "growImage",
  influence: "influenceImage",
  impact: "impactImage",
};

const STEP_ALT_FIELDS: Record<
  JourneyStepKey,
  keyof NonNullable<JourneyImageGroup>
> = {
  learn: "learnAlt",
  apply: "applyAlt",
  grow: "growAlt",
  influence: "influenceAlt",
  impact: "impactAlt",
};

function resolveStepImage(
  mediaRef: number | Media | null | undefined,
  mediaMap: Map<number, Media>,
  stepKey: JourneyStepKey,
): string {
  const resolved =
    typeof mediaRef === "number"
      ? mediaMap.get(mediaRef)
      : mediaRef && typeof mediaRef === "object"
        ? mediaRef
        : null;

  if (resolved) {
    const url = mediaDocumentToUrl(resolved);
    if (url) return url;
  }

  return journeyPlaceholder(stepKey);
}

export async function resolveJourneySteps(
  homepage?: (Homepage & HomepageHeroFields) | null,
): Promise<ResolvedJourneyStep[]> {
  const group = homepage?.journeyStepImages;
  const copy = homepage?.journeySteps ?? [];

  const ids = JOURNEY_STEP_KEYS.map((step) => {
    const field = group?.[STEP_MEDIA_FIELDS[step]];
    return typeof field === "number" ? field : null;
  }).filter((id): id is number => id !== null);

  const mediaMap = await resolveMediaMap(ids);

  return JOURNEY_STEP_KEYS.map((step, index) => {
    const mediaRef = group?.[STEP_MEDIA_FIELDS[step]] as
      | number
      | Media
      | null
      | undefined;
    const altField = group?.[STEP_ALT_FIELDS[step]];
    const stepCopy = copy[index];

    return {
      key: step,
      label: stepCopy?.label?.trim() || `Step ${index + 1}`,
      desc: stepCopy?.description?.trim() || "",
      image: resolveStepImage(mediaRef, mediaMap, step),
      imageAlt:
        (typeof altField === "string" && altField.trim()) ||
        stepCopy?.label?.trim() ||
        `Step ${index + 1}`,
    };
  });
}
