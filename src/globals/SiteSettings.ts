import type { GlobalConfig } from "payload";
import { createGlobalRevalidateHook } from "@/lib/payload-revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  hooks: {
    afterChange: [
      createGlobalRevalidateHook([
        "/",
        "/about",
        "/services",
        "/events",
        "/resources",
        "/contact",
      ]),
    ],
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "148Inspirations",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Godly wisdom for a profitable life",
    },
    {
      name: "footerDescription",
      type: "textarea",
      label: "Footer description",
      defaultValue:
        "A Christian mission dedicated to teaching how to live a godly and profitable life — wisdom for everyday living.",
    },
    {
      name: "footerScripture",
      type: "text",
      label: "Footer scripture reference",
      defaultValue: "1 Timothy 4:7–8",
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
      defaultValue: "+447356068483",
      admin: {
        description:
          "Opens WhatsApp directly when visitors click the chat button. Include country code, e.g. +447356068483",
      },
    },
    {
      name: "whatsappDefaultMessage",
      type: "textarea",
      label: "WhatsApp default message",
      defaultValue:
        "Hello 148Inspirations, I would like to get in touch.",
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
