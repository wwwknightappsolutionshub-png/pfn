import "server-only";

import type { Homepage, Media } from "@/payload-types";
import {
  JOURNEY_STEP_META,
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
  homepage?: Homepage | null,
): Promise<ResolvedJourneyStep[]> {
  const group = homepage?.journeyStepImages;

  const ids = JOURNEY_STEP_META.map((step) => {
    const field = group?.[STEP_MEDIA_FIELDS[step.key]];
    return typeof field === "number" ? field : null;
  }).filter((id): id is number => id !== null);

  const mediaMap = await resolveMediaMap(ids);

  return JOURNEY_STEP_META.map((step) => {
    const mediaRef = group?.[STEP_MEDIA_FIELDS[step.key]] as
      | number
      | Media
      | null
      | undefined;
    const altField = group?.[STEP_ALT_FIELDS[step.key]];

    return {
      key: step.key,
      label: step.label,
      desc: step.desc,
      image: resolveStepImage(mediaRef, mediaMap, step.key),
      imageAlt:
        (typeof altField === "string" && altField.trim()) || step.label,
    };
  });
}
