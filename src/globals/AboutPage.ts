import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  fields: [
    {
      name: "missionStatement",
      type: "richText",
    },
    {
      name: "portrait",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "biography",
      type: "richText",
    },
    {
      name: "speakingMinistry",
      type: "richText",
    },
    {
      name: "teachingMinistry",
      type: "richText",
    },
    {
      name: "academicProfile",
      type: "richText",
    },
    {
      name: "credentials",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "institution", type: "text", required: true },
        { name: "detail", type: "text" },
      ],
    },
  ],
};
