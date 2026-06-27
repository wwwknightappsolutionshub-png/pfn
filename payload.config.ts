import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Articles } from "./src/collections/Articles";
import { Events } from "./src/collections/Events";
import { Services } from "./src/collections/Services";
import { Resources } from "./src/collections/Resources";
import { Testimonials } from "./src/collections/Testimonials";
import { ContactSubmissions } from "./src/collections/ContactSubmissions";
import { NewsletterSubscribers } from "./src/collections/NewsletterSubscribers";
import { YoutubeVideos } from "./src/collections/YoutubeVideos";
import { Homepage } from "./src/globals/Homepage";
import { SiteSettings } from "./src/globals/SiteSettings";
import { AboutPage } from "./src/globals/AboutPage";
import { ServicesPage } from "./src/globals/ServicesPage";
import { ContactPage } from "./src/globals/ContactPage";
import { EventsPage } from "./src/globals/EventsPage";
import { ResourcesPage } from "./src/globals/ResourcesPage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3010";

/** Use PostgreSQL only when DATABASE_URI is set; otherwise SQLite (no Docker required). */
const usePostgres = Boolean(
  process.env.DATABASE_URI?.startsWith("postgresql"),
);

const sqlitePath = path.resolve(dirname, "data", "pln.db");

/** When true, allow drizzle schema push (used by npm run db:push-schema). */
const schemaPush = process.env.PAYLOAD_DB_PUSH === "true";

const db = usePostgres
  ? postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI || "",
      },
      push: schemaPush,
    })
  : sqliteAdapter({
      client: {
        url: process.env.DATABASE_URL || `file:${sqlitePath}`,
      },
      // Avoid destructive auto-push — use npm run db:push-schema after schema changes
      push: schemaPush,
    });

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— PLN Admin",
    },
    importMap: {
      baseDir: path.resolve(dirname, "src"),
    },
    components: {
      logout: {
        Button: "/components/admin/AdminLogoutButton#AdminLogoutButton",
      },
    },
  },
  collections: [
    Users,
    Media,
    Articles,
    Events,
    Services,
    Resources,
    Testimonials,
    ContactSubmissions,
    NewsletterSubscribers,
    YoutubeVideos,
  ],
  globals: [
    Homepage,
    SiteSettings,
    AboutPage,
    ServicesPage,
    ContactPage,
    EventsPage,
    ResourcesPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db,
  sharp,
  cors: [siteUrl],
  csrf: [siteUrl],
});
