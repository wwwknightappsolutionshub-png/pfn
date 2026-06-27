import "server-only";

import { pushDevSchema } from "@payloadcms/drizzle";
import type { DrizzleAdapter } from "@payloadcms/drizzle/types";
import { getPayloadClient } from "@/lib/payload";

const GLOBAL_SLUGS = [
  "homepage",
  "site-settings",
  "about-page",
  "services-page",
  "contact-page",
  "events-page",
  "resources-page",
] as const;

export async function runDbPushSchema(): Promise<{
  globals: string[];
}> {
  process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = "true";

  const payload = await getPayloadClient();
  await pushDevSchema(payload.db as DrizzleAdapter);

  for (const slug of GLOBAL_SLUGS) {
    await payload.findGlobal({ slug, depth: 0 });
  }

  return { globals: [...GLOBAL_SLUGS] };
}
