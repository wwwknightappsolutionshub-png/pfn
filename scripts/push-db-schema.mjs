/**
 * Sync Payload schema via the running Next.js app (avoids @next/env CLI issues).
 *
 * Run on VPS (app must be running on port 3010):
 *   npm run db:push-schema
 *
 * Uses localhost by default so nginx/reverse-proxy timeouts are avoided.
 * Set PUSH_SCHEMA_URL=https://your-domain.com only if pushing from another machine.
 */
import "dotenv/config";

const baseUrl =
  process.env.PUSH_SCHEMA_URL ||
  "http://127.0.0.1:3010";
const secret = process.env.PAYLOAD_SECRET?.trim();

if (!secret) {
  console.error("PAYLOAD_SECRET is missing in .env");
  process.exit(1);
}

const url = `${baseUrl.replace(/\/$/, "")}/api/admin/push-schema`;
console.log("Pushing schema via:", url);

const res = await fetch(url, {
  method: "POST",
  headers: {
    "x-push-secret": secret,
  },
  signal: AbortSignal.timeout(10 * 60 * 1000),
});

const data = await res.json().catch(() => ({}));

if (!res.ok) {
  console.error("Schema push failed:", data.error || res.statusText);
  process.exit(1);
}

console.log("Schema push complete.");
if (data.repair) {
  console.log(
    `Repair: ${data.repair.database}, homepage +${data.repair.homepageColumnsAdded}, about +${data.repair.aboutColumnsAdded}, settings +${data.repair.siteSettingsColumnsAdded}, indexes dropped ${data.repair.indexesDropped}`,
  );
}
if (data.pushAttempts) {
  console.log(`Push attempts: ${data.pushAttempts}`);
}
if (data.pushRepairs?.length) {
  for (const line of data.pushRepairs) {
    console.log(`  repair: ${line}`);
  }
}
if (data.globals?.length) {
  for (const slug of data.globals) {
    console.log(`  ✓ ${slug}`);
  }
}
console.log("\nRestart if needed: pm2 restart pln");
