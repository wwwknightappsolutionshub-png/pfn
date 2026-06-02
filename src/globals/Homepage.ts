import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  fields: [
    {
      name: "cinematicHeadline",
      type: "text",
      defaultValue: "Belonging to God gives you an edge in life.",
    },
    {
      name: "cinematicSubheadline",
      type: "text",
      defaultValue: "Learn how to make it count.",
    },
    {
      name: "heroRightImages",
      type: "group",
      label: "Hero — right column images",
      admin: {
        description:
          "Background images for the three rotating panels on the right side of the homepage hero (Mission, Wisdom pillars, Meet Peter).",
      },
      fields: [
        {
          name: "missionSlide",
          type: "upload",
          relationTo: "media",
          label: "Slide 1 — Mission",
          admin: {
            description: "First hero slide (mission / PLN introduction).",
          },
        },
        {
          name: "missionAlt",
          type: "text",
          label: "Slide 1 — alt text",
          defaultValue: "Teaching and wisdom",
        },
        {
          name: "pillarsSlide",
          type: "upload",
          relationTo: "media",
          label: "Slide 2 — Wisdom pillars",
          admin: {
            description: "Second hero slide (six pillars of wisdom).",
          },
        },
        {
          name: "pillarsAlt",
          type: "text",
          label: "Slide 2 — alt text",
          defaultValue: "Wisdom for everyday living",
        },
        {
          name: "gatherSlide",
          type: "upload",
          relationTo: "media",
          label: "Slide 3 — Meet Peter",
          admin: {
            description: "Third hero slide (Peter Olusanjo / gather).",
          },
        },
        {
          name: "gatherAlt",
          type: "text",
          label: "Slide 3 — alt text",
          defaultValue: "Peter Olusanjo",
        },
      ],
    },
    {
      name: "wisdomSectionTitle",
      type: "text",
      defaultValue: "Wisdom for Everyday Living",
    },
    {
      name: "wisdomConstellationHoverImage",
      type: "upload",
      relationTo: "media",
      label: "Section I — hover thumbnail",
      admin: {
        description:
          "Portrait shown when visitors hover a topic node in the Section I constellation (right side). Recommended: square or portrait crop of Peter.",
      },
    },
    {
      name: "wisdomConstellationHoverImageAlt",
      type: "text",
      label: "Section I — hover thumbnail alt text",
      defaultValue: "Peter Olusanjo",
    },
    {
      name: "journeySectionTitle",
      type: "text",
      defaultValue: "The Wisdom Journey",
    },
    {
      name: "journeyStepImages",
      type: "group",
      label: "Section II — journey images",
      admin: {
        description:
          "Portrait images for each step in the scroll journey (Learn → Apply → Grow → Influence → Impact). Shown on the right as visitors scroll.",
      },
      fields: [
        {
          name: "learnImage",
          type: "upload",
          relationTo: "media",
          label: "01 — Learn",
        },
        { name: "learnAlt", type: "text", label: "01 — Learn alt text", defaultValue: "Learn" },
        {
          name: "applyImage",
          type: "upload",
          relationTo: "media",
          label: "02 — Apply",
        },
        { name: "applyAlt", type: "text", label: "02 — Apply alt text", defaultValue: "Apply" },
        {
          name: "growImage",
          type: "upload",
          relationTo: "media",
          label: "03 — Grow",
        },
        { name: "growAlt", type: "text", label: "03 — Grow alt text", defaultValue: "Grow" },
        {
          name: "influenceImage",
          type: "upload",
          relationTo: "media",
          label: "04 — Influence",
        },
        {
          name: "influenceAlt",
          type: "text",
          label: "04 — Influence alt text",
          defaultValue: "Influence",
        },
        {
          name: "impactImage",
          type: "upload",
          relationTo: "media",
          label: "05 — Impact",
        },
        { name: "impactAlt", type: "text", label: "05 — Impact alt text", defaultValue: "Impact" },
      ],
    },
    {
      name: "featuredTeachingsTitle",
      type: "text",
      defaultValue: "Featured Teachings",
    },
    {
      name: "featuredTeachingsHeroImage",
      type: "upload",
      relationTo: "media",
      label: "Section III — featured hero image",
      admin: {
        description:
          "Large image on the left of Section III. When set, overrides the cover image of the first featured article. Link and title still come from Featured Articles below.",
      },
    },
    {
      name: "featuredTeachingsHeroImageAlt",
      type: "text",
      label: "Section III — featured hero alt text",
    },
    {
      name: "eventsSectionTitle",
      type: "text",
      defaultValue: "Upcoming Events",
    },
    {
      name: "ctaTitle",
      type: "text",
      defaultValue: "Join Wisdom Snippets",
    },
    {
      name: "ctaDescription",
      type: "textarea",
      defaultValue:
        "Every Monday, receive practical wisdom for relationships, business, finance, career, health, and spiritual growth.",
    },
    {
      name: "ctaButtonLabel",
      type: "text",
      defaultValue: "Subscribe to Wisdom Snippets",
    },
    {
      name: "featuredArticles",
      type: "relationship",
      relationTo: "articles",
      hasMany: true,
      maxRows: 6,
    },
    {
      name: "featuredEvents",
      type: "relationship",
      relationTo: "events",
      hasMany: true,
      maxRows: 4,
    },
    {
      name: "videosSectionTitle",
      type: "text",
      defaultValue: "From the Teaching Channel",
    },
    {
      name: "videosSectionSubtitle",
      type: "textarea",
      defaultValue:
        "Watch practical wisdom on relationships, business, finance, and spiritual growth.",
    },
    {
      name: "featuredVideos",
      type: "relationship",
      relationTo: "youtube-videos",
      hasMany: true,
      maxRows: 4,
    },
  ],
};
