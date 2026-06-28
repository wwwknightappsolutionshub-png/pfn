/**
 * Push Payload schema directly (no HTTP). Use on VPS when API push times out.
 *
 * Run: npm run db:push-schema
 */
import "dotenv/config";

process.env.PAYLOAD_DB_PUSH = "true";
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = "true";

if (!process.env.PAYLOAD_SECRET?.trim()) {
  console.error("PAYLOAD_SECRET is missing in .env");
  process.exit(1);
}

console.log("Pushing schema directly (CLI, no HTTP)...");

const { getPayload } = await import("payload");
const config = (await import("../payload.config.ts")).default;
const { runDbPushSchemaWithPayload } = await import(
  "../src/lib/run-db-push-schema.ts"
);

const payload = await getPayload({ config });
const result = await runDbPushSchemaWithPayload(payload);

console.log("Schema push complete.");
console.log(
  `Repair: ${result.repair.database}, homepage +${result.repair.homepageColumnsAdded}, about +${result.repair.aboutColumnsAdded}, settings +${result.repair.siteSettingsColumnsAdded}, indexes dropped ${result.repair.indexesDropped}`,
);
console.log(`Push attempts: ${result.pushAttempts}`);
for (const line of result.pushRepairs) {
  console.log(`  repair: ${line}`);
}
for (const slug of result.globals) {
  console.log(`  ✓ ${slug}`);
}

process.exit(0);
