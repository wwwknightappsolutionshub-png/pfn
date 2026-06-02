import type { CollectionConfig } from "payload";
import { sendContactNotification } from "@/lib/email";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "inquiryType", "createdAt"],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === "create") {
          await sendContactNotification(doc);
        }
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "message", type: "textarea", required: true },
    {
      name: "inquiryType",
      type: "select",
      required: true,
      options: [
        { label: "General Contact", value: "general" },
        { label: "Speaking Invitation", value: "speaking" },
        { label: "Consultancy Inquiry", value: "consultancy" },
        { label: "Life Mentoring", value: "mentoring" },
        { label: "Event Registration", value: "event" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In Progress", value: "in-progress" },
        { label: "Resolved", value: "resolved" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
