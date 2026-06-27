import { getPayloadClient } from "@/lib/payload";
import type {
  Article,
  Event,
  Homepage,
  Service,
  Resource,
  SiteSetting,
  Testimonial,
  YoutubeVideo,
} from "@/payload-types";
import type {
  AboutPageContent,
  ContactPageGlobal,
  EventsPageGlobal,
  ResourcesPageGlobal,
  ServicesPageGlobal,
} from "@/lib/cms-page-types";
import type { YoutubeVideoItem } from "@/lib/youtube";
import {
  isLegacyDemoYoutubeCatalog,
  mapPeterYoutubeVideos,
} from "@/lib/peter-youtube-videos";

function mapYoutube(docs: YoutubeVideo[]): YoutubeVideoItem[] {
  return docs.map((v) => ({
    id: v.id,
    title: v.title,
    youtubeId: v.youtubeId,
    description: v.description,
  }));
}

function publishedArticleWhere() {
  return {
    status: { equals: "published" as const },
  };
}

export async function getHomepageData(): Promise<{
  homepage: Homepage | null;
  articles: Article[];
  events: Event[];
  videos: YoutubeVideoItem[];
  testimonials: Testimonial[];
}> {
  const defaults: Homepage = {
    cinematicHeadline: "Belonging to God gives you an edge in life.",
    cinematicSubheadline: "Learn how to make it count.",
    wisdomSectionTitle: "Wisdom for Everyday Living",
    journeySectionTitle: "The Wisdom Journey",
    featuredTeachingsTitle: "Featured Teachings",
    eventsSectionTitle: "Upcoming Events",
    ctaTitle: "Join Wisdom Snippets",
    ctaDescription:
      "Every Monday, receive practical wisdom for relationships, business, finance, career, health, and spiritual growth.",
    ctaButtonLabel: "Subscribe to Wisdom Snippets",
  };

  try {
    const payload = await getPayloadClient();
    const homepage = (await payload.findGlobal({
      slug: "homepage",
      depth: 2,
    })) as Homepage;

    const featuredIds = (homepage.featuredArticles || [])
      .map((a) => (typeof a === "number" ? a : a.id))
      .filter(Boolean);

    let articles: Article[] = [];
    if (featuredIds.length) {
      const res = await payload.find({
        collection: "articles",
        where: { id: { in: featuredIds } },
        depth: 1,
      });
      articles = res.docs as Article[];
    } else {
      const res = await payload.find({
        collection: "articles",
        where: publishedArticleWhere(),
        sort: "-publishedAt",
        limit: 4,
        depth: 1,
        draft: false,
      });
      articles = res.docs as Article[];
    }

    const eventIds = (homepage.featuredEvents || [])
      .map((e) => (typeof e === "number" ? e : e.id))
      .filter(Boolean);

    let events: Event[] = [];
    if (eventIds.length) {
      const res = await payload.find({
        collection: "events",
        where: { id: { in: eventIds } },
        depth: 1,
      });
      events = res.docs as Event[];
    } else {
      const res = await payload.find({
        collection: "events",
        sort: "startDate",
        limit: 4,
        depth: 1,
      });
      events = res.docs as Event[];
    }

    const videoIds = (homepage.featuredVideos || [])
      .map((v) => (typeof v === "number" ? v : v.id))
      .filter(Boolean);

    let videos: YoutubeVideoItem[] = [];
    if (videoIds.length) {
      const res = await payload.find({
        collection: "youtube-videos",
        where: { id: { in: videoIds } },
        sort: "order",
      });
      videos = mapYoutube(res.docs as YoutubeVideo[]);
    } else {
      videos = await getFeaturedYoutubeVideos(4);
    }

    const testimonialsRes = await payload.find({
      collection: "testimonials",
      where: { featured: { equals: true } },
      sort: "order",
      limit: 3,
      depth: 1,
    });

    return {
      homepage: { ...defaults, ...homepage },
      articles,
      events,
      videos,
      testimonials: testimonialsRes.docs as Testimonial[],
    };
  } catch {
    return {
      homepage: defaults,
      articles: [],
      events: [],
      videos: [],
      testimonials: [],
    };
  }
}

export async function getFeaturedYoutubeVideos(
  limit = 4,
): Promise<YoutubeVideoItem[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "youtube-videos",
      where: {
        or: [
          { showOnHomepage: { equals: true } },
          { featured: { equals: true } },
        ],
      },
      sort: "order",
      limit,
    });
    const mapped = mapYoutube(res.docs as YoutubeVideo[]);
    if (mapped.length && !isLegacyDemoYoutubeCatalog(mapped)) return mapped;

    const all = await payload.find({
      collection: "youtube-videos",
      sort: "order",
      limit,
    });
    const allMapped = mapYoutube(all.docs as YoutubeVideo[]);
    if (allMapped.length && !isLegacyDemoYoutubeCatalog(allMapped)) {
      return allMapped;
    }
  } catch {
    /* fall through to Peter's channel catalog */
  }
  return mapPeterYoutubeVideos().slice(0, limit);
}

export async function getAllYoutubeVideos(): Promise<YoutubeVideoItem[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "youtube-videos",
      sort: "order",
      limit: 50,
    });
    const mapped = mapYoutube(res.docs as YoutubeVideo[]);
    if (mapped.length && !isLegacyDemoYoutubeCatalog(mapped)) return mapped;
  } catch {
    /* fall through */
  }
  return mapPeterYoutubeVideos();
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "testimonials",
      sort: "order",
      limit: 10,
      depth: 1,
    });
    return res.docs as Testimonial[];
  } catch {
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug: "site-settings" })) as SiteSetting;
  } catch {
    return null;
  }
}

export async function getAboutPage(): Promise<AboutPageContent | null> {
  try {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug: "about-page" })) as AboutPageContent;
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "services",
      sort: "order",
      limit: 20,
      depth: 1,
    });
    return res.docs as Service[];
  } catch {
    return [];
  }
}

export async function getServicesPage(): Promise<ServicesPageGlobal | null> {
  try {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({
      slug: "services-page",
      depth: 1,
    })) as ServicesPageGlobal;
  } catch {
    return null;
  }
}

export async function getContactPage(): Promise<ContactPageGlobal | null> {
  try {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({
      slug: "contact-page",
    })) as ContactPageGlobal;
  } catch {
    return null;
  }
}

export async function getEventsPage(): Promise<EventsPageGlobal | null> {
  try {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({
      slug: "events-page",
    })) as EventsPageGlobal;
  } catch {
    return null;
  }
}

export async function getResourcesPage(): Promise<ResourcesPageGlobal | null> {
  try {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({
      slug: "resources-page",
    })) as ResourcesPageGlobal;
  } catch {
    return null;
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "events",
      sort: "startDate",
      limit: 50,
      depth: 1,
    });
    return res.docs as Event[];
  } catch {
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "events",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    return (res.docs[0] as Event) || null;
  } catch {
    return null;
  }
}

export async function getResources(category?: string): Promise<Resource[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "resources",
      where: category
        ? { category: { equals: category } }
        : undefined,
      sort: "-createdAt",
      limit: 100,
      depth: 1,
    });
    return res.docs as Resource[];
  } catch {
    return [];
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "articles",
      where: publishedArticleWhere(),
      sort: "-publishedAt",
      limit: 100,
      depth: 1,
      draft: false,
    });
    return res.docs as Article[];
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "articles",
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: "published" } },
        ],
      },
      limit: 1,
      depth: 1,
      draft: false,
    });
    return (res.docs[0] as Article) || null;
  } catch {
    return null;
  }
}
