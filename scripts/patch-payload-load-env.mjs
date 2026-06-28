/**
 * Payload 3 expects a default export from @next/env, but Next 16 only provides CJS named exports.
 * Patch loadEnv.js once so CLI scripts (db:push-schema, seed:content) work outside Next.js.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(
  __dirname,
  "../node_modules/payload/dist/bin/loadEnv.js",
);

if (!fs.existsSync(target)) {
  console.warn("patch-payload-load-env: payload loadEnv.js not found, skipping");
  process.exit(0);
}

const original = fs.readFileSync(target, "utf8");

if (original.includes("nextEnvImport.default ?? nextEnvImport")) {
  process.exit(0);
}

const patched = original.replace(
  "import nextEnvImport from '@next/env';\nimport { findUpSync } from '../utilities/findUp.js';\nconst { loadEnvConfig } = nextEnvImport;",
  "import * as nextEnvImport from '@next/env';\nimport { findUpSync } from '../utilities/findUp.js';\nconst { loadEnvConfig } = (nextEnvImport.default ?? nextEnvImport);",
);

if (patched === original) {
  console.warn("patch-payload-load-env: pattern not found, skipping");
  process.exit(0);
}

fs.writeFileSync(target, patched);
console.log("patch-payload-load-env: patched payload loadEnv.js");
