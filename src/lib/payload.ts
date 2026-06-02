import { getPayload, type Payload } from "payload";
import config from "@payload-config";

type PayloadCache = {
  client: Payload | null;
  promise: Promise<Payload> | null;
};

const globalKey = "__pln_payload__";

function getCache(): PayloadCache {
  const g = globalThis as typeof globalThis & { [globalKey]?: PayloadCache };
  if (!g[globalKey]) {
    g[globalKey] = { client: null, promise: null };
  }
  return g[globalKey];
}

export async function getPayloadClient(): Promise<Payload> {
  const cache = getCache();

  if (cache.client) {
    return cache.client;
  }

  if (!cache.promise) {
    cache.promise = getPayload({ config });
  }

  try {
    cache.client = await cache.promise;
    return cache.client;
  } catch (error) {
    cache.promise = null;
    cache.client = null;
    throw error;
  }
}
