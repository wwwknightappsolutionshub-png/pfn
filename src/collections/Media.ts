import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import {
  revalidateOnPublicContentChange,
  revalidateOnPublicContentDelete,
} from "@/lib/payload-revalidate";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function sanitizeUploadFilename(filename: string): string {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const safe = base
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${safe || "upload"}${ext.toLowerCase()}`;
}

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateOnPublicContentChange],
    afterDelete: [revalidateOnPublicContentDelete],
    beforeOperation: [
      ({ req, operation }) => {
        if (operation !== "create" || !req.file) return;
        req.file.name = sanitizeUploadFilename(req.file.name);
      },
    ],
  },
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
    mimeTypes: ["image/*", "application/pdf", "video/*"],
  },
  admin: {
    useAsTitle: "alt",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
