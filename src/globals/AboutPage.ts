import type { GlobalConfig } from "payload";
import { createGlobalRevalidateHook } from "@/lib/payload-revalidate";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  hooks: {
    afterChange: [createGlobalRevalidateHook(["/about"])],
  },
  fields: [
    {
      name: "heroKicker",
      type: "text",
      defaultValue: "148Inspirations",
    },
    {
      name: "heroTitle",
      type: "text",
      defaultValue: "Peter Olusanjo",
    },
    {
      name: "missionStatement",
      type: "richText",
    },
    {
      name: "scriptureReference",
      type: "text",
      defaultValue: "1 Timothy 4:7–8",
    },
    {
      name: "portrait",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "biographySectionLabel",
      type: "text",
      defaultValue: "Biography",
    },
    {
      name: "biography",
      type: "richText",
    },
    {
      name: "ministriesSectionLabel",
      type: "text",
      defaultValue: "Ministries",
    },
    {
      name: "speakingMinistryTitle",
      type: "text",
      defaultValue: "Speaking & Teaching Ministry",
      admin: {
        description:
          "Title for the first ministries column (speaking and teaching content appear together).",
      },
    },
    {
      name: "speakingMinistry",
      type: "richText",
      label: "Speaking ministry copy",
    },
    {
      name: "teachingMinistryTitle",
      type: "text",
      defaultValue: "Teaching Ministry",
      admin: {
        description:
          "Legacy field — teaching copy is shown under Speaking & Teaching Ministry on the site.",
      },
    },
    {
      name: "teachingMinistry",
      type: "richText",
      label: "Teaching ministry copy",
      admin: {
        description:
          "Shown below speaking copy in the Speaking & Teaching Ministry column.",
      },
    },
    {
      name: "academicProfileTitle",
      type: "text",
      defaultValue: "Academic Profile",
    },
    {
      name: "academicProfile",
      type: "richText",
    },
    {
      name: "academicJourneyTitle",
      type: "text",
      defaultValue: "Academic Journey",
    },
    {
      name: "academicJourneySubtitle",
      type: "textarea",
      defaultValue:
        "Four milestones of scholarship in service of faithful, practical teaching.",
    },
    {
      name: "universityProfileUrl",
      type: "text",
      label: "University profile URL",
      defaultValue: "https://www.abdn.ac.uk/people/peter.olayiwola",
      admin: {
        description:
          "Link for the button below the academic journey section. Leave empty to hide the button.",
      },
    },
    {
      name: "universityProfileLabel",
      type: "text",
      label: "University profile button label",
      defaultValue: "View university profile",
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
