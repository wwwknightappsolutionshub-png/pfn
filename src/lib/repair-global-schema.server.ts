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

const ABOUT_PAGE_COLUMNS: ColumnDef[] = [
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

const SITE_SETTINGS_COLUMNS: ColumnDef[] = [
  ["whatsapp_enabled", "INTEGER"],
  ["whatsapp_number", "TEXT"],
  ["whatsapp_default_message", "TEXT"],
  ["footer_description", "TEXT"],
  ["footer_scripture", "TEXT"],
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

export async function repairGlobalSchemaBeforePush(): Promise<{
  database: "sqlite" | "postgres" | "skipped";
  homepageColumnsAdded: number;
  aboutColumnsAdded: number;
  siteSettingsColumnsAdded: number;
}> {
  const sqliteUrl = resolveSqliteUrl();
  if (!sqliteUrl) {
    return {
      database: "postgres",
      homepageColumnsAdded: 0,
      aboutColumnsAdded: 0,
      siteSettingsColumnsAdded: 0,
    };
  }

  const client = createClient({ url: sqliteUrl });
  await dropStaleTables(client);

  const homepageColumnsAdded = await addMissingColumns(
    client,
    "homepage",
    HOMEPAGE_COLUMNS,
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

  return {
    database: "sqlite",
    homepageColumnsAdded,
    aboutColumnsAdded,
    siteSettingsColumnsAdded,
  };
}
