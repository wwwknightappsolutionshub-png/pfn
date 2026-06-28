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

const HOMEPAGE_SCALAR_COLUMNS = [
  ["cinematic_headline", "TEXT"],
  ["cinematic_subheadline", "TEXT"],
  ["wisdom_section_title", "TEXT"],
  ["journey_section_title", "TEXT"],
  ["featured_teachings_title", "TEXT"],
  ["events_section_title", "TEXT"],
  ["cta_title", "TEXT"],
  ["cta_description", "TEXT"],
  ["cta_button_label", "TEXT"],
  ["videos_section_title", "TEXT"],
  ["videos_section_subtitle", "TEXT"],
];

const HOMEPAGE_COLUMNS = [
  ...HOMEPAGE_SCALAR_COLUMNS,
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
  ["hero_right_images_mission_slide_id", "INTEGER"],
  ["hero_right_images_mission_alt", "TEXT"],
  ["hero_right_images_pillars_slide_id", "INTEGER"],
  ["hero_right_images_pillars_alt", "TEXT"],
  ["hero_right_images_gather_slide_id", "INTEGER"],
  ["hero_right_images_gather_alt", "TEXT"],
  ["wisdom_section_subtitle", "TEXT"],
  ["wisdom_section_cta_label", "TEXT"],
  ["wisdom_constellation_hover_image_id", "INTEGER"],
  ["wisdom_constellation_hover_image_alt", "TEXT"],
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
  ["mission_statement", "TEXT"],
  ["scripture_reference", "TEXT"],
  ["portrait_id", "INTEGER"],
  ["biography_section_label", "TEXT"],
  ["biography", "TEXT"],
  ["ministries_section_label", "TEXT"],
  ["speaking_ministry_title", "TEXT"],
  ["speaking_ministry", "TEXT"],
  ["teaching_ministry_title", "TEXT"],
  ["teaching_ministry", "TEXT"],
  ["academic_profile_title", "TEXT"],
  ["academic_profile", "TEXT"],
  ["academic_journey_title", "TEXT"],
  ["academic_journey_subtitle", "TEXT"],
  ["university_profile_url", "TEXT"],
  ["university_profile_label", "TEXT"],
];

const SITE_SETTINGS_COLUMNS = [
  ["site_name", "TEXT"],
  ["tagline", "TEXT"],
  ["contact_email", "TEXT"],
  ["whatsapp_enabled", "INTEGER"],
  ["whatsapp_number", "TEXT"],
  ["whatsapp_default_message", "TEXT"],
  ["youtube_channel_url", "TEXT"],
  ["university_profile_url", "TEXT"],
  ["analytics_id", "TEXT"],
  ["newsletter_enabled", "INTEGER"],
  ["seo_default_title", "TEXT"],
  ["seo_default_description", "TEXT"],
  ["seo_og_image_id", "INTEGER"],
  ["seo_keywords", "TEXT"],
  ["footer_description", "TEXT"],
  ["footer_scripture", "TEXT"],
];

const SERVICES_PAGE_COLUMNS = [
  ["hero_kicker", "TEXT"],
  ["hero_title", "TEXT"],
  ["hero_description", "TEXT"],
  ["hero_image_id", "INTEGER"],
  ["hero_image_alt", "TEXT"],
];

const CONTACT_PAGE_COLUMNS = [
  ["left_kicker", "TEXT"],
  ["left_title", "TEXT"],
  ["left_description", "TEXT"],
  ["right_kicker", "TEXT"],
  ["right_title", "TEXT"],
  ["right_description", "TEXT"],
];

const EVENTS_PAGE_COLUMNS = [
  ["hero_kicker", "TEXT"],
  ["hero_title", "TEXT"],
  ["hero_description", "TEXT"],
];

const RESOURCES_PAGE_COLUMNS = [
  ["hero_kicker", "TEXT"],
  ["hero_title", "TEXT"],
  ["hero_description", "TEXT"],
  ["youtube_section_label", "TEXT"],
  ["youtube_section_title", "TEXT"],
  ["youtube_section_subtitle", "TEXT"],
  ["library_kicker", "TEXT"],
  ["library_title", "TEXT"],
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
const servicesAdded = await addMissing("services_page", SERVICES_PAGE_COLUMNS);
const contactAdded = await addMissing("contact_page", CONTACT_PAGE_COLUMNS);
const eventsAdded = await addMissing("events_page", EVENTS_PAGE_COLUMNS);
const resourcesAdded = await addMissing("resources_page", RESOURCES_PAGE_COLUMNS);

const indexes = await client.execute(
  "SELECT name FROM sqlite_master WHERE type='index' ORDER BY name",
);
let indexesDropped = 0;
for (const row of indexes.rows) {
  const name = String(row.name);
  if (name.startsWith("sqlite_")) continue;
  await client.execute(`DROP INDEX IF EXISTS \`${name}\``);
  indexesDropped++;
}

console.log(
  `\nRepair complete. homepage +${homepageAdded}, about_page +${aboutAdded}, site_settings +${settingsAdded}, services_page +${servicesAdded}, contact_page +${contactAdded}, events_page +${eventsAdded}, resources_page +${resourcesAdded}, indexes dropped ${indexesDropped}`,
);
