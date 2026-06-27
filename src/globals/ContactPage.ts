import type { GlobalConfig } from "payload";
import { createGlobalRevalidateHook } from "@/lib/payload-revalidate";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  hooks: {
    afterChange: [createGlobalRevalidateHook(["/contact"])],
  },
  fields: [
    {
      name: "leftKicker",
      type: "text",
      defaultValue: "Contact",
    },
    {
      name: "leftTitle",
      type: "text",
      defaultValue: "Let's connect",
    },
    {
      name: "leftDescription",
      type: "textarea",
      defaultValue:
        "Speaking invitations, consultancy inquiries, life mentoring, and event registrations — we welcome your message.",
    },
    {
      name: "inquiryTopics",
      type: "array",
      label: "Inquiry topics list",
      fields: [{ name: "topic", type: "text", required: true }],
      defaultValue: [
        { topic: "Speaking Invitations" },
        { topic: "Consultancy Inquiries" },
        { topic: "Life Mentoring" },
        { topic: "General Contact" },
      ],
    },
    {
      name: "rightKicker",
      type: "text",
      defaultValue: "Inquiry",
    },
    {
      name: "rightTitle",
      type: "text",
      defaultValue: "Send a message",
    },
    {
      name: "rightDescription",
      type: "textarea",
      defaultValue:
        "Complete the form and our team will respond as soon as possible.",
    },
  ],
};
