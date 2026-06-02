import type { CollectionConfig } from "payload";

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true },
    { name: "name", type: "text" },
    {
      name: "source",
      type: "select",
      defaultValue: "website",
      options: [
        { label: "Website", value: "website" },
        { label: "Wisdom Snippets CTA", value: "wisdom-snippets" },
        { label: "Footer", value: "footer" },
      ],
    },
  ],
};
