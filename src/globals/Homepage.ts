import type { GlobalConfig } from "payload";
import { revalidateHomepageGlobal } from "@/lib/payload-revalidate";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  hooks: {
    afterChange: [revalidateHomepageGlobal],
  },
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
      name: "heroMissionSlide",
      type: "group",
      label: "Hero — slide 1 copy",
      fields: [
        {
          name: "kicker",
          type: "text",
          defaultValue: "Profitable Living Network",
        },
        {
          name: "panelTitle",
          type: "text",
          defaultValue: "Godly wisdom. Profitable life.",
        },
        {
          name: "panelBody",
          type: "textarea",
          defaultValue:
            "A Christian mission teaching how to live with excellence in every sphere — rooted in Scripture and proven in experience.",
        },
        {
          name: "highlights",
          type: "array",
          label: "Panel highlights",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "value", type: "text", required: true },
          ],
          defaultValue: [
            { label: "Weekly", value: "Wisdom Snippets" },
            { label: "Monthly", value: "School of Wisdom" },
            { label: "Mission", value: "1 Tim. 4:7–8" },
          ],
        },
      ],
    },
    {
      name: "heroPillarsSlide",
      type: "group",
      label: "Hero — slide 2 copy",
      fields: [
        {
          name: "kicker",
          type: "text",
          defaultValue: "Wisdom for everyday living",
        },
        {
          name: "title",
          type: "text",
          defaultValue: "Six pillars. One integrated life in Christ.",
        },
        {
          name: "description",
          type: "textarea",
          defaultValue:
            "Practical teaching across relationships, business, finance, career, health, and spiritual growth — connected, intentional, and transformative.",
        },
        {
          name: "panelTitle",
          type: "text",
          defaultValue: "The constellation of wisdom",
        },
        {
          name: "panelBody",
          type: "textarea",
          defaultValue:
            "Each area of life informs the others. PLN helps you apply godly principles with clarity and confidence.",
        },
        {
          name: "pillarLabels",
          type: "array",
          label: "Pillar labels",
          fields: [{ name: "label", type: "text", required: true }],
          defaultValue: [
            { label: "Relationships" },
            { label: "Business" },
            { label: "Finance" },
            { label: "Career" },
            { label: "Health" },
            { label: "Spiritual Growth" },
          ],
        },
      ],
    },
    {
      name: "heroGatherSlide",
      type: "group",
      label: "Hero — slide 3 copy",
      fields: [
        {
          name: "kicker",
          type: "text",
          defaultValue: "Join the journey",
        },
        {
          name: "title",
          type: "text",
          defaultValue: "Learn. Apply. Grow. Influence. Impact.",
        },
        {
          name: "description",
          type: "textarea",
          defaultValue:
            "Every Monday — Wisdom Snippets. Third Friday monthly — School of Wisdom. Step into a community pursuing godliness with purpose.",
        },
        {
          name: "panelTitle",
          type: "text",
          defaultValue: "Led by Peter Olusanjo",
        },
        {
          name: "panelBody",
          type: "textarea",
          defaultValue:
            "Speaker, teacher, and scholar — equipping believers to flourish with academic rigour and pastoral depth.",
        },
        {
          name: "quote",
          type: "textarea",
          defaultValue:
            "Train yourself to be godly. For physical training is of some value, but godliness has value for all things.",
        },
        {
          name: "quoteCitation",
          type: "text",
          defaultValue: "1 Timothy 4:7–8",
        },
      ],
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
      name: "wisdomSectionSubtitle",
      type: "textarea",
      defaultValue:
        "Practical wisdom woven across every dimension of life — connected, intentional, and transformative.",
    },
    {
      name: "wisdomSectionCtaLabel",
      type: "text",
      defaultValue: "Listen to Peter",
    },
    {
      name: "constellationTopics",
      type: "array",
      label: "Section I — constellation topics",
      admin: {
        description:
          "Topic labels for the wisdom constellation. Layout positions are fixed; order matches the visual map.",
      },
      fields: [{ name: "label", type: "text", required: true }],
      defaultValue: [
        { label: "Relationships" },
        { label: "Business" },
        { label: "Finance" },
        { label: "Career" },
        { label: "Health" },
        { label: "Spiritual Growth" },
      ],
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
      name: "journeySteps",
      type: "array",
      label: "Section II — journey step copy",
      minRows: 5,
      maxRows: 5,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
      defaultValue: [
        {
          label: "Learn",
          description: "Receive timeless wisdom rooted in Scripture.",
        },
        {
          label: "Apply",
          description: "Put truth into practice in daily decisions.",
        },
        {
          label: "Grow",
          description: "Develop character, competence, and conviction.",
        },
        {
          label: "Influence",
          description: "Lead others through exemplary living.",
        },
        {
          label: "Impact",
          description: "Advance Kingdom purposes in your sphere.",
        },
      ],
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
      name: "testimonialsSectionLabel",
      type: "text",
      defaultValue: "Voices of Transformation",
    },
    {
      name: "testimonialsSectionTitle",
      type: "text",
      defaultValue: "What people are saying",
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
