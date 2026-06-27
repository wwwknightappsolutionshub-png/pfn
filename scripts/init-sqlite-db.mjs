/**
 * One-time (or fresh-server) SQLite initialization via Payload schema push.
 * Requires push: true in payload.config.ts (or PAYLOAD_SQLITE_PUSH=true below).
 *
 * Run: npm run db:init
 */
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@libsql/client";
import { getPayload } from "payload";
import config from "../payload.config.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "../data/pln.db");

function dbSize() {
  try {
    return fs.statSync(dbPath).size;
  } catch {
    return 0;
  }
}

console.log("Database path:", dbPath);
console.log("Size before:", dbSize(), "bytes");

if (!process.env.PAYLOAD_SECRET?.trim()) {
  console.error("PAYLOAD_SECRET is missing in .env");
  process.exit(1);
}

console.log("Ensure payload.config.ts has push: true before running this script.");
const payload = await getPayload({ config });

await payload.find({
  collection: "users",
  limit: 1,
  overrideAccess: true,
});

const sizeAfter = dbSize();
console.log("Size after:", sizeAfter, "bytes");

const client = createClient({ url: `file:${dbPath}` });
const tables = await client.execute(
  "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
);
console.log(`Tables created: ${tables.rows.length}`);
for (const row of tables.rows.slice(0, 12)) {
  console.log(`  - ${row.name}`);
}
if (tables.rows.length > 12) {
  console.log(`  ... and ${tables.rows.length - 12} more`);
}

if (sizeAfter < 1024 || tables.rows.length < 5) {
  console.error(
    "\nInit failed: database file is still empty or has too few tables.",
  );
  console.error(
    "Try: remove DATABASE_URL from .env (use default path), set push: true, run again.",
  );
  process.exit(1);
}

console.log("\nSQLite init OK. Set push: false in payload.config.ts for production.");
process.exit(0);
