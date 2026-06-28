import type { CollectionConfig } from "payload";
import {
  revalidateOnPublicContentChange,
  revalidateOnPublicContentDelete,
} from "@/lib/payload-revalidate";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
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
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "benefits",
      type: "array",
      minRows: 0,
      admin: {
        description:
          "Optional bullet points. Delete all rows, or turn off “Show bullet points” below, to hide them on the site.",
      },
      fields: [{ name: "benefit", type: "text", required: true }],
    },
    {
      name: "showBenefits",
      type: "checkbox",
      label: "Show bullet points",
      defaultValue: true,
      admin: {
        description:
          "Uncheck to hide all bullet points for this service on the public site.",
      },
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
