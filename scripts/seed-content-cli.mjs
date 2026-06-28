/**
 * Seed default content directly (no HTTP). Use on VPS when API seed times out.
 *
 * Run: npm run seed:content
 * Full replace: SEED_REPLACE=true npm run seed:content
 */
import "dotenv/config";

if (!process.env.PAYLOAD_SECRET?.trim()) {
  console.error("PAYLOAD_SECRET is missing in .env");
  process.exit(1);
}

const replace = process.env.SEED_REPLACE === "true";
process.env.PAYLOAD_SEEDING = "true";
console.log("Seeding content directly (CLI, no HTTP)...");
if (replace) {
  console.log("Mode: replace existing demo collections");
} else {
  console.log("Mode: fill empty collections + update all globals");
}

const { getPayload } = await import("payload");
const config = (await import("../payload.config.ts")).default;
const { runSeed } = await import("../src/lib/seed-data.ts");

const payload = await getPayload({ config });
const stats = await runSeed(payload, { replace });

console.log("Seed complete.");
console.log(
  `Globals: ${stats.globals}, services: ${stats.services}, articles: ${stats.articles}, events: ${stats.events}, youtube: ${stats.youtubeVideos}`,
);
if (stats.backfilledCollections?.length) {
  console.log(`Backfilled: ${stats.backfilledCollections.join(", ")}`);
}
console.log(
  `Collections seeded: ${stats.collectionsSeeded ? "all" : "globals + empty only"}, replace: ${stats.replace}`,
);

process.exit(0);
