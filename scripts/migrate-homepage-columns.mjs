/**
 * @deprecated Use: npm run db:repair
 * Adds missing homepage columns when Payload SQLite push fails.
 */
import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "../data/pln.db");

const NEW_COLUMNS = [
  ["journey_step_images_learn_image_id", "INTEGER REFERENCES media(id)"],
  ["journey_step_images_learn_alt", "TEXT"],
  ["journey_step_images_apply_image_id", "INTEGER REFERENCES media(id)"],
  ["journey_step_images_apply_alt", "TEXT"],
  ["journey_step_images_grow_image_id", "INTEGER REFERENCES media(id)"],
  ["journey_step_images_grow_alt", "TEXT"],
  ["journey_step_images_influence_image_id", "INTEGER REFERENCES media(id)"],
  ["journey_step_images_influence_alt", "TEXT"],
  ["journey_step_images_impact_image_id", "INTEGER REFERENCES media(id)"],
  ["journey_step_images_impact_alt", "TEXT"],
  ["featured_teachings_hero_image_id", "INTEGER REFERENCES media(id)"],
  ["featured_teachings_hero_image_alt", "TEXT"],
];

const client = createClient({ url: `file:${dbPath}` });

const existing = await client.execute("PRAGMA table_info(homepage)");
const names = new Set(existing.rows.map((r) => r.name));

let added = 0;
for (const [name, type] of NEW_COLUMNS) {
  if (names.has(name)) {
    console.log(`  skip (exists): ${name}`);
    continue;
  }
  await client.execute(`ALTER TABLE homepage ADD COLUMN ${name} ${type}`);
  console.log(`  added: ${name}`);
  added++;
}

console.log(`\nDone. ${added} column(s) added to homepage.`);
