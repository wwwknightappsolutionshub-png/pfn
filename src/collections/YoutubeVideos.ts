import type { CollectionConfig } from "payload";
import {
  revalidateOnPublicContentChange,
  revalidateOnPublicContentDelete,
} from "@/lib/payload-revalidate";

export const YoutubeVideos: CollectionConfig = {
  slug: "youtube-videos",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "youtubeId", "featured", "order"],
    description:
      "Videos from the PLN YouTube channel. Paste the video ID from the YouTube URL.",
  },
  hooks: {
    afterChange: [revalidateOnPublicContentChange],
    afterDelete: [revalidateOnPublicContentDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "youtubeId",
      type: "text",
      required: true,
      label: "YouTube Video ID",
      admin: {
        description: "e.g. dQw4w9WgXcQ from youtube.com/watch?v=dQw4w9WgXcQ",
      },
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "showOnHomepage",
      type: "checkbox",
      defaultValue: false,
      label: "Show on Homepage (max 4)",
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
  ],
};
