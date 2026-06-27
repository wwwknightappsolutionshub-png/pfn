/**
 * Repairs SQLite after failed Payload schema push (e.g. __new_homepage).
 * Run: node scripts/repair-sqlite-db.mjs
 */
import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "../data/pln.db");

const HOMEPAGE_COLUMNS = [
  ["journey_step_images_learn_image_id", "INTEGER"],
  ["journey_step_images_learn_alt", "TEXT"],
  ["journey_step_images_apply_image_id", "INTEGER"],
  ["journey_step_images_apply_alt", "TEXT"],
  ["journey_step_images_grow_image_id", "INTEGER"],
  ["journey_step_images_grow_alt", "TEXT"],
  ["journey_step_images_influence_image_id", "INTEGER"],
  ["journey_step_images_influence_alt", "TEXT"],
  ["journey_step_images_impact_image_id", "INTEGER"],
  ["journey_step_images_impact_alt", "TEXT"],
  ["featured_teachings_hero_image_id", "INTEGER"],
  ["featured_teachings_hero_image_alt", "TEXT"],
];

const SITE_SETTINGS_COLUMNS = [
  ["whatsapp_enabled", "INTEGER"],
  ["whatsapp_number", "TEXT"],
  ["whatsapp_default_message", "TEXT"],
];

const client = createClient({ url: `file:${dbPath}` });

const tables = await client.execute(
  "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
);

console.log("Tables matching homepage:");
for (const row of tables.rows) {
  const name = row.name;
  if (name.includes("homepage")) console.log(`  - ${name}`);
}

for (const stale of ["__new_homepage", "_homepage_v4"]) {
  const exists = tables.rows.some((r) => r.name === stale);
  if (exists) {
    await client.execute(`DROP TABLE IF EXISTS \`${stale}\``);
    console.log(`Dropped stale table: ${stale}`);
  }
}

const homepageTable = tables.rows.some((r) => r.name === "homepage");
if (!homepageTable) {
  console.error(
    "\nNo homepage table found. This script repairs an existing database.",
  );
  console.error("Fresh server: set push: true in payload.config.ts, then run:");
  console.error("  npm run db:init");
  process.exit(1);
}

const info = await client.execute("PRAGMA table_info(homepage)");
const names = new Set(info.rows.map((r) => r.name));

let added = 0;
for (const [name, type] of HOMEPAGE_COLUMNS) {
  if (names.has(name)) continue;
  await client.execute(`ALTER TABLE homepage ADD COLUMN ${name} ${type}`);
  console.log(`Added column: ${name}`);
  added++;
}

console.log(
  added
    ? `\nHomepage repair complete (${added} column(s) added).`
    : "\nHomepage schema OK.",
);

const settingsInfo = await client.execute("PRAGMA table_info(site_settings)");
const settingsNames = new Set(settingsInfo.rows.map((r) => r.name));

let settingsAdded = 0;
for (const [name, type] of SITE_SETTINGS_COLUMNS) {
  if (settingsNames.has(name)) continue;
  await client.execute(`ALTER TABLE site_settings ADD COLUMN ${name} ${type}`);
  console.log(`Added site_settings column: ${name}`);
  settingsAdded++;
}

console.log(
  settingsAdded
    ? `Site settings repair complete (${settingsAdded} column(s) added). Restart npm run dev.`
    : "Site settings schema OK. Restart npm run dev if you changed the server.",
);
