import "server-only";

import { getPayloadClient } from "@/lib/payload";
import { runDbPushSchemaWithPayload } from "@/lib/run-db-push-schema";

export async function runDbPushSchema() {
  const payload = await getPayloadClient();
  return runDbPushSchemaWithPayload(payload);
}
