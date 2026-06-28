/**
 * Seed default site content via the running Next.js app.
 *
 * Run on VPS (app must be running):
 *   npm run seed:content
 *
 * To wipe demo collections and re-seed everything:
 *   SEED_REPLACE=true npm run seed:content
 */
import "dotenv/config";

const baseUrl =
  process.env.SEED_URL ||
  process.env.PUSH_SCHEMA_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://127.0.0.1:3010";
const secret = process.env.PAYLOAD_SECRET?.trim();
const replace = process.env.SEED_REPLACE === "true";

if (!secret) {
  console.error("PAYLOAD_SECRET is missing in .env");
  process.exit(1);
}

const url = `${baseUrl.replace(/\/$/, "")}/api/seed`;
console.log("Seeding content via:", url);
if (replace) {
  console.log("Mode: replace existing demo collections");
} else {
  console.log("Mode: fill empty collections + update all globals");
}

const res = await fetch(url, {
  method: "POST",
  headers: {
    "x-seed-secret": secret,
    ...(replace ? { "x-seed-replace": "true" } : {}),
  },
});

const data = await res.json().catch(() => ({}));

if (!res.ok) {
  console.error("Seed failed:", data.error || res.statusText);
  process.exit(1);
}

console.log("Seed complete.");
if (data.stats) {
  console.log(
    `Globals: ${data.stats.globals}, services: ${data.stats.services}, articles: ${data.stats.articles}, events: ${data.stats.events}, youtube: ${data.stats.youtubeVideos}`,
  );
  if (data.stats.backfilledCollections?.length) {
    console.log(`Backfilled: ${data.stats.backfilledCollections.join(", ")}`);
  }
  console.log(
    `Collections seeded: ${data.stats.collectionsSeeded ? "all" : "globals + empty only"}, replace: ${data.stats.replace}`,
  );
}
console.log("\nRestart if needed: pm2 restart pln");
