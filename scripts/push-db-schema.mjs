/**
 * Sync Payload schema to the database (new globals, new columns).
 * Required after deploying CMS schema changes on production PostgreSQL.
 *
 * Run on VPS:
 *   npm run db:push-schema
 *
 * Uses NODE_ENV=development so Payload runs drizzle push once (safe additive sync).
 */
import "dotenv/config";

process.env.NODE_ENV = "development";
process.env.PAYLOAD_DB_PUSH = "true";

import { getPayload } from "payload";
import config from "../payload.config.ts";

const GLOBAL_SLUGS = [
  "homepage",
  "site-settings",
  "about-page",
  "services-page",
  "contact-page",
  "events-page",
  "resources-page",
];

console.log("Pushing Payload schema to database...");
console.log(
  "Database:",
  process.env.DATABASE_URI?.replace(/:[^:@]+@/, ":****@") ||
    process.env.DATABASE_URL ||
    "(default sqlite)",
);

const payload = await getPayload({ config });

console.log("\nVerifying globals...");
for (const slug of GLOBAL_SLUGS) {
  try {
    await payload.findGlobal({ slug, depth: 0 });
    console.log(`  ✓ ${slug}`);
  } catch (error) {
    console.error(
      `  ✗ ${slug}:`,
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
}

console.log("\nSchema push complete. Restart the app: pm2 restart pln");
process.exit(0);
