import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "Profitable Living Network",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Godly wisdom for a profitable life",
    },
    {
      name: "contactEmail",
      type: "email",
    },
    {
      name: "whatsappEnabled",
      type: "checkbox",
      label: "WhatsApp chat enabled",
      defaultValue: true,
      admin: {
        description: "Show the floating WhatsApp button on the public site.",
      },
    },
    {
      name: "whatsappNumber",
      type: "text",
      label: "WhatsApp number",
      defaultValue: "+447746798923",
      admin: {
        description: "Include country code, e.g. +447746798923",
      },
    },
    {
      name: "whatsappDefaultMessage",
      type: "textarea",
      label: "WhatsApp default message",
      defaultValue:
        "Hello Profitable Living Network, I would like to get in touch.",
    },
    {
      name: "youtubeChannelUrl",
      type: "text",
      label: "YouTube Channel URL",
      admin: {
        description: "Full channel link, e.g. https://www.youtube.com/@YourChannel",
      },
    },
    {
      name: "universityProfileUrl",
      type: "text",
      label: "University Profile URL",
    },
    {
      name: "streamingPlatforms",
      label: "Streaming Platforms",
      type: "array",
      admin: {
        description:
          "Where PLN gathers and broadcasts — Instagram, YouTube, X, Microsoft Teams.",
      },
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "Instagram", value: "instagram" },
            { label: "YouTube", value: "youtube" },
            { label: "X", value: "x" },
            { label: "Microsoft Teams", value: "microsoft-teams" },
          ],
        },
        { name: "url", type: "text", required: true },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          options: [
            { label: "YouTube", value: "youtube" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "X (Twitter)", value: "twitter" },
          ],
        },
        { name: "url", type: "text", required: true },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "defaultTitle", type: "text" },
        { name: "defaultDescription", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
        { name: "keywords", type: "text" },
      ],
    },
    {
      name: "analyticsId",
      type: "text",
      label: "Google Analytics ID",
    },
    {
      name: "newsletterEnabled",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
