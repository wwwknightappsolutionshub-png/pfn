/**
 * Repairs SQLite after failed Payload schema push (e.g. __new_homepage).
 * Run: npm run db:repair
 */
import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "../data/pln.db");

const STALE_PREFIXES = ["__new_", "_homepage_v", "_about_page_v"];

const HOMEPAGE_COLUMNS = [
  ["hero_mission_slide_kicker", "TEXT"],
  ["hero_mission_slide_panel_title", "TEXT"],
  ["hero_mission_slide_panel_body", "TEXT"],
  ["hero_pillars_slide_kicker", "TEXT"],
  ["hero_pillars_slide_title", "TEXT"],
  ["hero_pillars_slide_description", "TEXT"],
  ["hero_pillars_slide_panel_title", "TEXT"],
  ["hero_pillars_slide_panel_body", "TEXT"],
  ["hero_gather_slide_kicker", "TEXT"],
  ["hero_gather_slide_title", "TEXT"],
  ["hero_gather_slide_description", "TEXT"],
  ["hero_gather_slide_panel_title", "TEXT"],
  ["hero_gather_slide_panel_body", "TEXT"],
  ["hero_gather_slide_quote", "TEXT"],
  ["hero_gather_slide_quote_citation", "TEXT"],
  ["wisdom_section_subtitle", "TEXT"],
  ["wisdom_section_cta_label", "TEXT"],
  ["testimonials_section_label", "TEXT"],
  ["testimonials_section_title", "TEXT"],
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

const ABOUT_PAGE_COLUMNS = [
  ["hero_kicker", "TEXT"],
  ["hero_title", "TEXT"],
  ["scripture_reference", "TEXT"],
  ["biography_section_label", "TEXT"],
  ["ministries_section_label", "TEXT"],
  ["speaking_ministry_title", "TEXT"],
  ["teaching_ministry_title", "TEXT"],
  ["academic_profile_title", "TEXT"],
  ["academic_journey_title", "TEXT"],
  ["academic_journey_subtitle", "TEXT"],
];

const SITE_SETTINGS_COLUMNS = [
  ["whatsapp_enabled", "INTEGER"],
  ["whatsapp_number", "TEXT"],
  ["whatsapp_default_message", "TEXT"],
  ["footer_description", "TEXT"],
  ["footer_scripture", "TEXT"],
];

const client = createClient({ url: `file:${dbPath}` });

const tables = await client.execute(
  "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
);

for (const row of tables.rows) {
  const name = String(row.name);
  if (STALE_PREFIXES.some((prefix) => name.startsWith(prefix))) {
    await client.execute(`DROP TABLE IF EXISTS \`${name}\``);
    console.log(`Dropped stale table: ${name}`);
  }
}

async function addMissing(table, columns) {
  const tableExists = tables.rows.some((r) => r.name === table);
  if (!tableExists) {
    console.log(`Skip ${table} (table not found)`);
    return 0;
  }

  const info = await client.execute(`PRAGMA table_info(\`${table}\`)`);
  const names = new Set(info.rows.map((r) => r.name));
  let added = 0;
  for (const [name, type] of columns) {
    if (names.has(name)) continue;
    await client.execute(`ALTER TABLE \`${table}\` ADD COLUMN ${name} ${type}`);
    console.log(`Added ${table}.${name}`);
    added++;
  }
  return added;
}

const homepageAdded = await addMissing("homepage", HOMEPAGE_COLUMNS);
const aboutAdded = await addMissing("about_page", ABOUT_PAGE_COLUMNS);
const settingsAdded = await addMissing("site_settings", SITE_SETTINGS_COLUMNS);

console.log(
  `\nRepair complete. homepage +${homepageAdded}, about_page +${aboutAdded}, site_settings +${settingsAdded}`,
);
