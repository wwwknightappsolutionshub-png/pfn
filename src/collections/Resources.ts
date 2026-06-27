import type { CollectionConfig } from "payload";
import {
  revalidateOnPublicContentChange,
  revalidateOnPublicContentDelete,
} from "@/lib/payload-revalidate";

export const Resources: CollectionConfig = {
  slug: "resources",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "resourceType"],
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
      type: "textarea",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Articles", value: "articles" },
        { label: "Videos", value: "videos" },
        { label: "Wisdom Snippets", value: "wisdom-snippets" },
        { label: "School of Wisdom Archives", value: "school-of-wisdom" },
        { label: "Downloads", value: "downloads" },
      ],
    },
    {
      name: "resourceType",
      type: "select",
      options: [
        { label: "Article Link", value: "article" },
        { label: "Video", value: "video" },
        { label: "File Download", value: "file" },
        { label: "External Link", value: "external" },
      ],
      required: true,
    },
    {
      name: "file",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "externalUrl",
      type: "text",
    },
    {
      name: "videoUrl",
      type: "text",
    },
    {
      name: "relatedArticle",
      type: "relationship",
      relationTo: "articles",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
