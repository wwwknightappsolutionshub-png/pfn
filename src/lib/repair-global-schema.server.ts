import "server-only";

import { createClient, type Client } from "@libsql/client";
import path from "path";

type ColumnDef = readonly [string, string];

const STALE_TABLE_PREFIXES = ["__new_", "_homepage_v", "_about_page_v"];

const HOMEPAGE_COLUMNS: ColumnDef[] = [
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

const SITE_SETTINGS_COLUMNS: ColumnDef[] = [
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

const ABOUT_PAGE_COLUMNS: ColumnDef[] = [
  ["hero_kicker", "TEXT"],
  ["hero_title", "TEXT"],
  ["scripture_reference", "TEXT"],
  ["portrait_id", "INTEGER"],
  ["biography_section_label", "TEXT"],
  ["ministries_section_label", "TEXT"],
  ["speaking_ministry_title", "TEXT"],
  ["teaching_ministry_title", "TEXT"],
  ["academic_profile_title", "TEXT"],
  ["academic_journey_title", "TEXT"],
  ["academic_journey_subtitle", "TEXT"],
];

const SERVICES_PAGE_COLUMNS: ColumnDef[] = [
  ["hero_kicker", "TEXT"],
  ["hero_title", "TEXT"],
  ["hero_description", "TEXT"],
  ["hero_image_id", "INTEGER"],
  ["hero_image_alt", "TEXT"],
];

const CONTACT_PAGE_COLUMNS: ColumnDef[] = [
  ["left_kicker", "TEXT"],
  ["left_title", "TEXT"],
  ["left_description", "TEXT"],
  ["right_kicker", "TEXT"],
  ["right_title", "TEXT"],
  ["right_description", "TEXT"],
];

const EVENTS_PAGE_COLUMNS: ColumnDef[] = [
  ["hero_kicker", "TEXT"],
  ["hero_title", "TEXT"],
  ["hero_description", "TEXT"],
];

const RESOURCES_PAGE_COLUMNS: ColumnDef[] = [
  ["hero_kicker", "TEXT"],
  ["hero_title", "TEXT"],
  ["hero_description", "TEXT"],
  ["youtube_section_label", "TEXT"],
  ["youtube_section_title", "TEXT"],
  ["youtube_section_subtitle", "TEXT"],
  ["library_kicker", "TEXT"],
  ["library_title", "TEXT"],
];

// Scalar columns that may predate nested groups on homepage
const HOMEPAGE_SCALAR_COLUMNS: ColumnDef[] = [
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

const HOMEPAGE_COLUMNS_FULL: ColumnDef[] = [
  ...HOMEPAGE_SCALAR_COLUMNS,
  ...HOMEPAGE_COLUMNS,
];

function resolveSqliteUrl(): string | null {
  if (process.env.DATABASE_URI?.startsWith("postgresql")) {
    return null;
  }

  const raw = process.env.DATABASE_URL || "file:./data/pln.db";
  if (raw.startsWith("file:")) {
    const filePath = raw.replace(/^file:/, "");
    const resolved = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    return `file:${resolved}`;
  }

  return raw;
}

async function dropStaleTables(client: Client) {
  const tables = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
  );

  for (const row of tables.rows) {
    const name = String(row.name);
    if (STALE_TABLE_PREFIXES.some((prefix) => name.startsWith(prefix))) {
      await client.execute(`DROP TABLE IF EXISTS \`${name}\``);
    }
  }
}

async function tableExists(client: Client, table: string): Promise<boolean> {
  const tables = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
  );
  return tables.rows.some((row) => String(row.name) === table);
}

async function addMissingColumns(
  client: Client,
  table: string,
  columns: ColumnDef[],
): Promise<number> {
  if (!(await tableExists(client, table))) return 0;

  const info = await client.execute(`PRAGMA table_info(\`${table}\`)`);
  const names = new Set(info.rows.map((row) => String(row.name)));

  let added = 0;
  for (const [name, type] of columns) {
    if (names.has(name)) continue;
    await client.execute(`ALTER TABLE \`${table}\` ADD COLUMN ${name} ${type}`);
    added++;
  }

  return added;
}

async function dropAllUserIndexes(client: Client): Promise<number> {
  const indexes = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='index' ORDER BY name",
  );

  let dropped = 0;
  for (const row of indexes.rows) {
    const name = String(row.name);
    if (name.startsWith("sqlite_")) continue;
    await client.execute(`DROP INDEX IF EXISTS \`${name}\``);
    dropped++;
  }

  return dropped;
}

export async function repairGlobalSchemaBeforePush(): Promise<{
  database: "sqlite" | "postgres" | "skipped";
  homepageColumnsAdded: number;
  aboutColumnsAdded: number;
  siteSettingsColumnsAdded: number;
  servicesPageColumnsAdded: number;
  contactPageColumnsAdded: number;
  eventsPageColumnsAdded: number;
  resourcesPageColumnsAdded: number;
  indexesDropped: number;
}> {
  const sqliteUrl = resolveSqliteUrl();
  if (!sqliteUrl) {
    return {
      database: "postgres",
      homepageColumnsAdded: 0,
      aboutColumnsAdded: 0,
      siteSettingsColumnsAdded: 0,
      servicesPageColumnsAdded: 0,
      contactPageColumnsAdded: 0,
      eventsPageColumnsAdded: 0,
      resourcesPageColumnsAdded: 0,
      indexesDropped: 0,
    };
  }

  const client = createClient({ url: sqliteUrl });
  await dropStaleTables(client);

  const homepageColumnsAdded = await addMissingColumns(
    client,
    "homepage",
    HOMEPAGE_COLUMNS_FULL,
  );
  const aboutColumnsAdded = await addMissingColumns(
    client,
    "about_page",
    ABOUT_PAGE_COLUMNS,
  );
  const siteSettingsColumnsAdded = await addMissingColumns(
    client,
    "site_settings",
    SITE_SETTINGS_COLUMNS,
  );
  const servicesPageColumnsAdded = await addMissingColumns(
    client,
    "services_page",
    SERVICES_PAGE_COLUMNS,
  );
  const contactPageColumnsAdded = await addMissingColumns(
    client,
    "contact_page",
    CONTACT_PAGE_COLUMNS,
  );
  const eventsPageColumnsAdded = await addMissingColumns(
    client,
    "events_page",
    EVENTS_PAGE_COLUMNS,
  );
  const resourcesPageColumnsAdded = await addMissingColumns(
    client,
    "resources_page",
    RESOURCES_PAGE_COLUMNS,
  );
  const indexesDropped = await dropAllUserIndexes(client);

  return {
    database: "sqlite",
    homepageColumnsAdded,
    aboutColumnsAdded,
    siteSettingsColumnsAdded,
    servicesPageColumnsAdded,
    contactPageColumnsAdded,
    eventsPageColumnsAdded,
    resourcesPageColumnsAdded,
    indexesDropped,
  };
}
