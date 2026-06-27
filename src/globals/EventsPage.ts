import type { GlobalConfig } from "payload";
import { createGlobalRevalidateHook } from "@/lib/payload-revalidate";

export const EventsPage: GlobalConfig = {
  slug: "events-page",
  label: "Events Page",
  hooks: {
    afterChange: [createGlobalRevalidateHook(["/events"])],
  },
  fields: [
    {
      name: "heroKicker",
      type: "text",
      defaultValue: "Events",
    },
    {
      name: "heroTitle",
      type: "text",
      defaultValue: "Gather for wisdom",
    },
    {
      name: "heroDescription",
      type: "textarea",
      defaultValue:
        "Join Wisdom Snippets every Monday, School of Wisdom monthly, and special gatherings designed for growth, fellowship, and Kingdom impact.",
    },
  ],
};
