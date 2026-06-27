import type { GlobalConfig } from "payload";
import { createGlobalRevalidateHook } from "@/lib/payload-revalidate";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: "Services Page",
  hooks: {
    afterChange: [createGlobalRevalidateHook(["/services"])],
  },
  fields: [
    {
      name: "heroKicker",
      type: "text",
      defaultValue: "Services",
    },
    {
      name: "heroTitle",
      type: "text",
      defaultValue: "Wisdom applied with excellence",
    },
    {
      name: "heroDescription",
      type: "textarea",
      defaultValue:
        "Partner with PLN for mentoring, consultancy, conferences, and speaking — each engagement designed for transformation and Kingdom impact.",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Hero background image",
    },
    {
      name: "heroImageAlt",
      type: "text",
      label: "Hero image alt text",
      defaultValue: "Services",
    },
  ],
};
