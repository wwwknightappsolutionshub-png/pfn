import type { CollectionConfig } from "payload";
import {
  revalidateOnPublicContentChange,
  revalidateOnPublicContentDelete,
} from "@/lib/payload-revalidate";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "eventType", "startDate", "featured"],
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
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "eventType",
      type: "select",
      required: true,
      options: [
        { label: "Wisdom Snippets (Weekly)", value: "wisdom-snippets" },
        { label: "School of Wisdom (Monthly)", value: "school-of-wisdom" },
        { label: "Conference", value: "conference" },
        { label: "Speaking Engagement", value: "speaking" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "startDate",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "endDate",
      type: "date",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "recurrence",
      type: "select",
      options: [
        { label: "One-time", value: "once" },
        { label: "Every Monday", value: "weekly-monday" },
        { label: "Third Friday Monthly", value: "monthly-third-friday" },
      ],
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "agenda",
      type: "array",
      fields: [
        { name: "time", type: "text" },
        { name: "item", type: "text", required: true },
      ],
    },
    {
      name: "registrationUrl",
      type: "text",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};
