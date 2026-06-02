import { getArticles } from "@/lib/cms";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET() {
  const articles = await getArticles();

  const items = articles
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${siteUrl}/resources/${a.slug}</link>
      <guid>${siteUrl}/resources/${a.slug}</guid>
      <description><![CDATA[${a.excerpt || ""}]]></description>
      <pubDate>${a.publishedAt ? new Date(a.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Profitable Living Network</title>
    <link>${siteUrl}</link>
    <description>Godly wisdom for a profitable life</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
