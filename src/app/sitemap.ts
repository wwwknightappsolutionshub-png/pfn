import type { MetadataRoute } from "next";
import { getArticles, getEvents } from "@/lib/cms";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/events",
  "/resources",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, events] = await Promise.all([
    getArticles().catch(() => []),
    getEvents().catch(() => []),
  ]);

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const articleEntries = articles.map((a) => ({
    url: `${siteUrl}/resources/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const eventEntries = events.map((e) => ({
    url: `${siteUrl}/events/${e.slug}`,
    lastModified: new Date(e.startDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries, ...eventEntries];
}
