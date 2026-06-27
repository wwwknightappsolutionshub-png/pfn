import type { GlobalConfig } from "payload";
import { createGlobalRevalidateHook } from "@/lib/payload-revalidate";

export const ResourcesPage: GlobalConfig = {
  slug: "resources-page",
  label: "Resources Page",
  hooks: {
    afterChange: [createGlobalRevalidateHook(["/resources"])],
  },
  fields: [
    {
      name: "heroKicker",
      type: "text",
      defaultValue: "Knowledge Hub",
    },
    {
      name: "heroTitle",
      type: "text",
      defaultValue: "Resources",
    },
    {
      name: "heroDescription",
      type: "textarea",
      defaultValue:
        "Explore teachings, archives, and downloads — filter and search to find wisdom for your journey.",
    },
    {
      name: "youtubeSectionLabel",
      type: "text",
      defaultValue: "YouTube Channel",
    },
    {
      name: "youtubeSectionTitle",
      type: "text",
      defaultValue: "Video teachings",
    },
    {
      name: "youtubeSectionSubtitle",
      type: "textarea",
      defaultValue:
        "Browse Wisdom Snippets and teachings from Peter Olusanjo on YouTube. Swipe on mobile or move your cursor on desktop to scroll through the library.",
    },
    {
      name: "libraryKicker",
      type: "text",
      defaultValue: "Library",
    },
    {
      name: "libraryTitle",
      type: "text",
      defaultValue: "Articles & downloads",
    },
  ],
};
