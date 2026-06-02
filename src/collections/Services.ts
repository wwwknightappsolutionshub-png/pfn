import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
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
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "benefits",
      type: "array",
      fields: [{ name: "benefit", type: "text", required: true }],
    },
    {
      name: "icon",
      type: "select",
      options: [
        { label: "Mentoring", value: "mentoring" },
        { label: "Consultancy", value: "consultancy" },
        { label: "Business", value: "business" },
        { label: "Conference", value: "conference" },
        { label: "Speaking", value: "speaking" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "ctaLabel",
      type: "text",
      defaultValue: "Request Inquiry",
    },
  ],
};
