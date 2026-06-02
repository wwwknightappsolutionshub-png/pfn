import type { Payload } from "payload";

export type SeedAdminResult = {
  email: string;
  name: string;
  created: boolean;
  updated: boolean;
};

export function getSeedAdminCredentials() {
  return {
    email:
      process.env.SEED_ADMIN_EMAIL?.trim() ||
      "admin@profitableliving.network",
    password:
      process.env.SEED_ADMIN_PASSWORD?.trim() || "PLNAdminDev2026!",
    name: process.env.SEED_ADMIN_NAME?.trim() || "PLN Admin",
  };
}

/** Create or update the CMS admin user (idempotent). */
export async function seedAdminUser(payload: Payload): Promise<SeedAdminResult> {
  const { email, password, name } = getSeedAdminCredentials();

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });

  const doc = existing.docs[0];

  if (doc) {
    await payload.update({
      collection: "users",
      id: doc.id,
      data: {
        name,
        role: "admin",
        password,
      },
      overrideAccess: true,
    });
    return { email, name, created: false, updated: true };
  }

  await payload.create({
    collection: "users",
    data: {
      email,
      password,
      name,
      role: "admin",
    },
    overrideAccess: true,
  });

  return { email, name, created: true, updated: false };
}
