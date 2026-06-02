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
      name: "wisdomSectionTitle",
      type: "text",
      defaultValue: "Wisdom for Everyday Living",
    },
    {
      name: "journeySectionTitle",
      type: "text",
      defaultValue: "The Wisdom Journey",
    },
    {
      name: "featuredTeachingsTitle",
      type: "text",
      defaultValue: "Featured Teachings",
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
