import { pushDevSchema } from "@payloadcms/drizzle";
import type { DrizzleAdapter } from "@payloadcms/drizzle/types";
import type { Payload } from "payload";
import {
  repairGlobalSchemaBeforePush,
  repairSqlitePushFailure,
} from "@/lib/repair-global-schema.server";

const GLOBAL_SLUGS = [
  "homepage",
  "site-settings",
  "about-page",
  "services-page",
  "contact-page",
  "events-page",
  "resources-page",
] as const;

const MAX_PUSH_ATTEMPTS = 20;

export async function runDbPushSchemaWithPayload(payload: Payload): Promise<{
  globals: string[];
  repair: Awaited<ReturnType<typeof repairGlobalSchemaBeforePush>>;
  pushAttempts: number;
  pushRepairs: string[];
}> {
  process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = "true";

  const repair = await repairGlobalSchemaBeforePush();
  const pushRepairs: string[] = [];
  let pushAttempts = 0;

  while (pushAttempts < MAX_PUSH_ATTEMPTS) {
    pushAttempts++;
    try {
      await pushDevSchema(payload.db as DrizzleAdapter);
      break;
    } catch (error) {
      if (pushAttempts >= MAX_PUSH_ATTEMPTS) {
        throw error;
      }

      const failureRepair = await repairSqlitePushFailure(error);
      if (!failureRepair.applied) {
        throw error;
      }

      pushRepairs.push(
        `attempt ${pushAttempts}: ${failureRepair.actions.join(", ")}`,
      );
    }
  }

  for (const slug of GLOBAL_SLUGS) {
    await payload.findGlobal({ slug, depth: 0 });
  }

  return { globals: [...GLOBAL_SLUGS], repair, pushAttempts, pushRepairs };
}
