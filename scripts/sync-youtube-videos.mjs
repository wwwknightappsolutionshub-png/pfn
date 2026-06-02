import "dotenv/config";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3010";

try {
  const res = await fetch(`${baseUrl}/api/sync/youtube`);
  const data = await res.json();
  if (!res.ok) {
    console.error(data.error || "YouTube sync failed");
    process.exit(1);
  }
  console.log(`\nSynced ${data.count} videos from @the148peter`);
  console.log(`  Channel: ${data.channel}\n`);
} catch {
  console.error(
    `Could not reach ${baseUrl}/api/sync/youtube — start the dev server first: npm run dev`,
  );
  process.exit(1);
}
