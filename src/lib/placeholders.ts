/**
 * Preview placeholders in /public/images.
 * JPEGs: run `npm run placeholders` (or use committed copies).
 * SVGs: same paths with .svg — fallback if a JPEG is missing.
 */

export const PLACEHOLDER_IMAGES = {
  portrait: "/images/placeholders/portrait.jpg",
  article: "/images/placeholders/article.jpg",
  testimonial: "/images/placeholders/testimonial.jpg",
  event: "/images/placeholders/event.jpg",
  journey: {
    learn: "/images/journey/learn.jpg",
    apply: "/images/journey/apply.jpg",
    grow: "/images/journey/grow.jpg",
    influence: "/images/journey/influence.jpg",
    impact: "/images/journey/impact.jpg",
  },
} as const;

export const PLACEHOLDER_IMAGES_SVG = {
  portrait: "/images/placeholders/portrait.svg",
  article: "/images/placeholders/article.svg",
  testimonial: "/images/placeholders/testimonial.svg",
  event: "/images/placeholders/event.svg",
  journey: {
    learn: "/images/journey/learn.svg",
    apply: "/images/journey/apply.svg",
    grow: "/images/journey/grow.svg",
    influence: "/images/journey/influence.svg",
    impact: "/images/journey/impact.svg",
  },
} as const;

export type PlaceholderKind = keyof Omit<
  typeof PLACEHOLDER_IMAGES,
  "journey"
>;

export function journeyPlaceholder(
  key: keyof typeof PLACEHOLDER_IMAGES.journey,
) {
  return PLACEHOLDER_IMAGES.journey[key];
}

export const OG_PLACEHOLDER = PLACEHOLDER_IMAGES.article;
