import "dotenv/config";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3010";

try {
  const res = await fetch(`${baseUrl}/api/seed/admin`);
  const data = await res.json();
  if (!res.ok) {
    console.error(data.error || "Admin seed failed");
    process.exit(1);
  }
  console.log("\nPLN admin user ready\n");
  console.log(`  Admin:  ${data.loginUrl}`);
  console.log(`  Email:  ${data.email}`);
  console.log(`  ${data.message}\n`);
  console.log(
    "Password is SEED_ADMIN_PASSWORD from .env (default: PLNAdminDev2026!)\n",
  );
} catch {
  console.error(
    `Could not reach ${baseUrl}/api/seed/admin — start the dev server first: npm run dev`,
  );
  process.exit(1);
}
