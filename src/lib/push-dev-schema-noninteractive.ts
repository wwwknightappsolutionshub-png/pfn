import type { DrizzleAdapter } from "@payloadcms/drizzle/types";

type SchemaPushAdapter = DrizzleAdapter & {
  extensions?: { postgis?: boolean };
  tablesFilter?: string;
};

/**
 * Like @payloadcms/drizzle pushDevSchema, but auto-accepts warnings when
 * PAYLOAD_AUTO_ACCEPT_SCHEMA_PUSH=true (VPS CLI / non-interactive).
 */
export async function pushDevSchemaNonInteractive(
  adapter: DrizzleAdapter,
): Promise<void> {
  const { pushSchema } = adapter.requireDrizzleKit();
  const pushAdapter = adapter as SchemaPushAdapter;
  const { tablesFilter, extensions = {} } = pushAdapter;

  const { apply, hasDataLoss, warnings } = await pushSchema(
    adapter.schema,
    adapter.drizzle,
    adapter.schemaName ? [adapter.schemaName] : undefined,
    tablesFilter,
    extensions.postgis ? ["postgis"] : undefined,
  );

  if (warnings.length) {
    const autoAccept = process.env.PAYLOAD_AUTO_ACCEPT_SCHEMA_PUSH === "true";

    if (autoAccept) {
      console.log(`Auto-accepting ${warnings.length} schema push warning(s).`);
      for (const warning of warnings) {
        console.log(`  · ${warning}`);
      }
      if (hasDataLoss) {
        console.log(
          "Data-loss warnings present (usually removed or moved CMS fields).",
        );
      }
    } else {
      let message = `Schema push requires confirmation:\n\n${warnings.join("\n")}\n`;
      if (hasDataLoss) {
        message +=
          "\nDATA LOSS WARNING: Possible data loss detected if schema is pushed.\n";
      }
      message +=
        "\nRe-run with PAYLOAD_AUTO_ACCEPT_SCHEMA_PUSH=true to apply on VPS.";
      throw new Error(message);
    }
  }

  await apply();

  const migrationsTable = adapter.schemaName
    ? `"${adapter.schemaName}"."payload_migrations"`
    : '"payload_migrations"';
  const drizzle = adapter.drizzle;
  const result = await adapter.execute({
    drizzle,
    raw: `SELECT * FROM ${migrationsTable} WHERE batch = '-1'`,
  });
  const devPush = result.rows;

  if (!devPush.length) {
    await drizzle.insert(adapter.tables.payload_migrations).values({
      name: "dev",
      batch: -1,
    });
  } else {
    await adapter.execute({
      drizzle,
      raw: `UPDATE ${migrationsTable} SET updated_at = CURRENT_TIMESTAMP WHERE batch = '-1'`,
    });
  }
}
