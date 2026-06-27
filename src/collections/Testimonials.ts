import type { CollectionConfig } from "payload";
import {
  revalidateOnPublicContentChange,
  revalidateOnPublicContentDelete,
} from "@/lib/payload-revalidate";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
  },
  hooks: {
    afterChange: [revalidateOnPublicContentChange],
    afterDelete: [revalidateOnPublicContentDelete],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "position", type: "text" },
    { name: "testimonial", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
