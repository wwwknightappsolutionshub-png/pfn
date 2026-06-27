import fs from "fs";
import path from "path";
import type { Payload } from "payload";
import { seedAdminUser } from "@/lib/seed-admin";
import {
  SEED_ABOUT_PAGE,
  SEED_CONTACT_PAGE,
  SEED_EVENTS_PAGE,
  SEED_HOMEPAGE,
  SEED_RESOURCES_PAGE,
  SEED_SERVICES_PAGE,
  SEED_SITE_SETTINGS,
} from "@/lib/seed-default-content";
import { DEFAULT_WHATSAPP_MESSAGE, DEFAULT_WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { PETER_SOCIAL_URLS } from "@/lib/social-links";
import { PETER_YOUTUBE_VIDEOS } from "@/lib/peter-youtube-videos";
import { syncPeterYoutubeVideos } from "@/lib/sync-youtube-videos";

export function richText(...paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
      })),
    },
  };
}

export const DEMO_YOUTUBE_CHANNEL = PETER_SOCIAL_URLS.youtube;

export const DEMO_YOUTUBE_VIDEOS = PETER_YOUTUBE_VIDEOS;

const SEED_IMAGE_URLS = {
  portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80",
  article1: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  article2: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
  article3: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
  article4: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
  event: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  servicesHero: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  testimonial1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  testimonial2: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  testimonial3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
};

const tmpDir = path.join(process.cwd(), "scripts", ".tmp-images");

const COLLECTIONS = [
  "contact-submissions",
  "newsletter-subscribers",
  "testimonials",
  "resources",
  "youtube-videos",
  "articles",
  "events",
  "services",
  "media",
] as const;

export type SeedOptions = {
  /** Wipe demo collections before seeding. Default false on production. */
  replace?: boolean;
};

type SeedMediaIds = {
  portraitId: number;
  article1Img: number;
  article2Img: number;
  article3Img: number;
  article4Img: number;
  eventImg: number;
  servicesHeroImg: number;
  testimonial1Img: number;
  testimonial2Img: number;
  testimonial3Img: number;
};

async function downloadImage(url: string, filename: string): Promise<string> {
  fs.mkdirSync(tmpDir, { recursive: true });
  const filePath = path.join(tmpDir, filename);
  if (!fs.existsSync(filePath)) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to download ${url}`);
    fs.writeFileSync(filePath, Buffer.from(await res.arrayBuffer()));
  }
  return filePath;
}

async function uploadImage(
  payload: Payload,
  url: string,
  alt: string,
  filename: string,
) {
  const filePath = await downloadImage(url, filename);
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    filePath,
  });
  return Number(doc.id);
}

async function collectionCount(
  payload: Payload,
  slug: (typeof COLLECTIONS)[number],
): Promise<number> {
  const res = await payload.find({ collection: slug, limit: 1 });
  return res.totalDocs;
}

async function clearCollections(payload: Payload) {
  for (const slug of COLLECTIONS) {
    const res = await payload.find({ collection: slug, limit: 500 });
    for (const doc of res.docs) {
      await payload.delete({ collection: slug, id: doc.id });
    }
  }
}

async function ensureSeedMedia(payload: Payload): Promise<SeedMediaIds> {
  const existing = await payload.find({ collection: "media", limit: 20, sort: "createdAt" });
  if (existing.totalDocs >= 8) {
    const ids = existing.docs.map((doc) => Number(doc.id));
    return {
      portraitId: ids[0],
      article1Img: ids[1] ?? ids[0],
      article2Img: ids[2] ?? ids[0],
      article3Img: ids[3] ?? ids[0],
      article4Img: ids[4] ?? ids[0],
      eventImg: ids[5] ?? ids[0],
      servicesHeroImg: ids[6] ?? ids[1] ?? ids[0],
      testimonial1Img: ids[7] ?? ids[0],
      testimonial2Img: ids[8] ?? ids[0],
      testimonial3Img: ids[9] ?? ids[0],
    };
  }

  const [
    portraitId,
    article1Img,
    article2Img,
    article3Img,
    article4Img,
    eventImg,
    servicesHeroImg,
    testimonial1Img,
    testimonial2Img,
    testimonial3Img,
  ] = await Promise.all([
    uploadImage(payload, SEED_IMAGE_URLS.portrait, "Peter Olusanjo portrait", "portrait.jpg"),
    uploadImage(payload, SEED_IMAGE_URLS.article1, "Business wisdom teaching", "article1.jpg"),
    uploadImage(payload, SEED_IMAGE_URLS.article2, "Leadership and career", "article2.jpg"),
    uploadImage(payload, SEED_IMAGE_URLS.article3, "Team and relationships", "article3.jpg"),
    uploadImage(payload, SEED_IMAGE_URLS.article4, "Conference teaching", "article4.jpg"),
    uploadImage(payload, SEED_IMAGE_URLS.event, "Wisdom gathering event", "event.jpg"),
    uploadImage(payload, SEED_IMAGE_URLS.servicesHero, "Services hero", "services-hero.jpg"),
    uploadImage(payload, SEED_IMAGE_URLS.testimonial1, "Testimonial portrait", "t1.jpg"),
    uploadImage(payload, SEED_IMAGE_URLS.testimonial2, "Testimonial portrait", "t2.jpg"),
    uploadImage(payload, SEED_IMAGE_URLS.testimonial3, "Testimonial portrait", "t3.jpg"),
  ]);

  return {
    portraitId,
    article1Img,
    article2Img,
    article3Img,
    article4Img,
    eventImg,
    servicesHeroImg,
    testimonial1Img,
    testimonial2Img,
    testimonial3Img,
  };
}

async function seedCollections(
  payload: Payload,
  media: SeedMediaIds,
): Promise<{
  articleIds: number[];
  eventIds: number[];
  youtubeIds: number[];
}> {
  const articlesData = [
    {
      title: "The Godly Edge in Business Decision-Making",
      slug: "godly-edge-business-decisions",
      excerpt:
        "Discover how belonging to God reshapes the way you evaluate risk, opportunity, and stewardship.",
      category: "articles" as const,
      coverImage: media.article1Img,
    },
    {
      title: "Five Principles for Profitable Relationships",
      slug: "profitable-relationships-principles",
      excerpt:
        "Wisdom from Scripture applied to marriage, parenting, and professional partnerships.",
      category: "wisdom-snippets" as const,
      coverImage: media.article2Img,
    },
    {
      title: "Stewardship: Finance as a Form of Worship",
      slug: "finance-stewardship-worship",
      excerpt:
        "Money is a tool for Kingdom impact when governed by discipline and generosity.",
      category: "teaching" as const,
      coverImage: media.article3Img,
    },
    {
      title: "School of Wisdom: Notes on Influence",
      slug: "school-of-wisdom-influence",
      excerpt:
        "From our monthly gathering — how to grow in leadership that serves others.",
      category: "school-of-wisdom" as const,
      coverImage: media.article4Img,
    },
    {
      title: "Discipline for Godliness in Daily Habits",
      slug: "discipline-godliness-habits",
      excerpt: "1 Timothy 4:7–8 applied to morning routines, work, and rest.",
      category: "articles" as const,
      coverImage: media.article1Img,
    },
    {
      title: "Career Excellence Without Compromise",
      slug: "career-excellence-without-compromise",
      excerpt: "Standing out at work while honouring Christ in every meeting.",
      category: "teaching" as const,
      coverImage: media.article2Img,
    },
  ];

  const articleIds: number[] = [];
  for (const a of articlesData) {
    const doc = await payload.create({
      collection: "articles",
      data: {
        ...a,
        author: "Peter Olusanjo",
        status: "published",
        _status: "published",
        featured: articleIds.length < 4,
        publishedAt: new Date(
          Date.now() - articleIds.length * 86400000 * 7,
        ).toISOString(),
        content: richText(
          a.excerpt,
          "148Inspirations equips you with practical, biblical wisdom for everyday life.",
          "Join Wisdom Snippets every Monday and School of Wisdom monthly.",
        ),
      },
    });
    articleIds.push(Number(doc.id));
  }

  const now = new Date();
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + ((8 - now.getDay()) % 7) || 7);

  const eventsData = [
    {
      title: "Wisdom Snippets — Live Teaching",
      slug: "wisdom-snippets-live",
      eventType: "wisdom-snippets" as const,
      recurrence: "weekly-monday" as const,
      startDate: nextMonday.toISOString(),
      location: "Online & London, UK",
      featured: true,
    },
    {
      title: "School of Wisdom — March Session",
      slug: "school-of-wisdom-march",
      eventType: "school-of-wisdom" as const,
      recurrence: "monthly-third-friday" as const,
      startDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        21,
        18,
        0,
        0,
      ).toISOString(),
      location: "London, UK",
      featured: true,
    },
    {
      title: "Kingdom Business Leaders Forum",
      slug: "kingdom-business-forum",
      eventType: "conference" as const,
      recurrence: "once" as const,
      startDate: new Date(
        now.getFullYear(),
        now.getMonth() + 2,
        15,
        9,
        0,
        0,
      ).toISOString(),
      location: "Birmingham, UK",
      featured: true,
    },
    {
      title: "Speaking Engagement — National Leaders Summit",
      slug: "national-leaders-summit",
      eventType: "speaking" as const,
      recurrence: "once" as const,
      startDate: new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        8,
        10,
        0,
        0,
      ).toISOString(),
      location: "Manchester, UK",
      featured: false,
    },
  ];

  const eventIds: number[] = [];
  for (const e of eventsData) {
    const doc = await payload.create({
      collection: "events",
      data: {
        ...e,
        featuredImage: media.eventImg,
        registrationUrl: "/contact?inquiryType=event",
        description: richText(
          `${e.title} with Peter Olusanjo.`,
          "Register via the contact form for venue and joining details.",
        ),
        agenda: [
          { time: "18:00", item: "Welcome & opening prayer" },
          { time: "18:30", item: "Main teaching session" },
          { time: "19:30", item: "Q&A and practical application" },
          { time: "20:00", item: "Closing & fellowship" },
        ],
      },
    });
    eventIds.push(Number(doc.id));
  }

  const servicesData = [
    {
      title: "Life Mentoring",
      slug: "life-mentoring",
      icon: "mentoring" as const,
      order: 1,
      description: richText(
        "One-to-one guidance for spiritual growth, major decisions, and godly living.",
        "Walk alongside Peter for accountability rooted in Scripture and clarity for the season you are in.",
      ),
      benefits: [
        "One-to-one guidance for spiritual growth",
        "Accountability rooted in Scripture",
        "Clarity for major life decisions",
      ],
    },
    {
      title: "Private Consultancy",
      slug: "private-consultancy",
      icon: "consultancy" as const,
      order: 2,
      description: richText(
        "Confidential counsel for leaders navigating complex personal or ministry situations.",
        "Biblical frameworks applied with discretion and excellence.",
      ),
      benefits: [
        "Confidential counsel for leaders",
        "Biblical frameworks for complex situations",
        "Excellence-driven engagement",
      ],
    },
    {
      title: "Business Consultancy",
      slug: "business-consultancy",
      icon: "business" as const,
      order: 3,
      description: richText(
        "Kingdom-minded strategy for organisations that want ethical growth and lasting impact.",
        "Align team culture, decision-making, and stewardship with godly values.",
      ),
      benefits: [
        "Kingdom-minded strategy",
        "Ethical growth planning",
        "Team culture aligned with godly values",
      ],
    },
    {
      title: "Conferences",
      slug: "conferences",
      icon: "conference" as const,
      order: 4,
      description: richText(
        "Transformative gatherings for churches, corporates, and leadership communities.",
        "Custom themes designed for fellowship, teaching, and Kingdom impact.",
      ),
      benefits: [
        "Transformative gatherings",
        "Corporate and church partnerships",
        "Custom themes",
      ],
    },
    {
      title: "Speaking Engagements",
      slug: "speaking-engagements",
      icon: "speaking" as const,
      order: 5,
      description: richText(
        "Inspiring keynotes for academic, ministry, and marketplace audiences.",
        "International availability with academic rigour and pastoral warmth.",
      ),
      benefits: [
        "Inspiring keynotes",
        "Academic and ministry settings",
        "International availability",
      ],
    },
  ];

  for (const s of servicesData) {
    await payload.create({
      collection: "services",
      data: {
        title: s.title,
        slug: s.slug,
        icon: s.icon,
        order: s.order,
        ctaLabel: "Request Inquiry",
        description: s.description,
        benefits: s.benefits.map((benefit) => ({ benefit })),
      },
    });
  }

  const resourcesData = [
    {
      title: "Wisdom Snippets Workbook (PDF)",
      slug: "wisdom-snippets-workbook",
      category: "downloads" as const,
      resourceType: "file" as const,
      description: "Reflection questions for weekly teaching.",
    },
    {
      title: "School of Wisdom Session Archive",
      slug: "school-of-wisdom-archive",
      category: "school-of-wisdom" as const,
      resourceType: "external" as const,
      description: "Past session outlines and study notes.",
      externalUrl: "/events",
    },
    {
      title: "Introduction to Profitable Living",
      slug: "intro-profitable-living-video",
      category: "videos" as const,
      resourceType: "video" as const,
      description: "The vision of 148Inspirations in twelve minutes.",
      videoUrl: `https://www.youtube.com/watch?v=${DEMO_YOUTUBE_VIDEOS[0].youtubeId}`,
    },
    {
      title: "Leadership Prayer Guide",
      slug: "leadership-prayer-guide",
      category: "downloads" as const,
      resourceType: "file" as const,
      description: "Daily prayers for marketplace leaders.",
    },
  ];

  for (const r of resourcesData) {
    await payload.create({ collection: "resources", data: r });
  }

  for (const t of [
    {
      name: "Sarah Adeyemi",
      position: "Business Owner, Lagos",
      testimonial:
        "Peter's teaching gave me a framework for decisions I had struggled with for years.",
      image: media.testimonial1Img,
      order: 1,
    },
    {
      name: "James Whitfield",
      position: "Church Elder, Nottingham",
      testimonial:
        "School of Wisdom has transformed how our leadership team disciples new believers.",
      image: media.testimonial2Img,
      order: 2,
    },
    {
      name: "Dr. Amara Okafor",
      position: "University Lecturer",
      testimonial:
        "Rare combination of academic excellence and pastoral warmth.",
      image: media.testimonial3Img,
      order: 3,
    },
  ]) {
    await payload.create({
      collection: "testimonials",
      data: { ...t, featured: true },
    });
  }

  const { ids: youtubeIds } = await syncPeterYoutubeVideos(payload);

  return { articleIds, eventIds, youtubeIds };
}

async function seedGlobals(
  payload: Payload,
  media: SeedMediaIds,
  relations: { articleIds: number[]; eventIds: number[]; youtubeIds: number[] },
) {
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      ...SEED_SITE_SETTINGS,
      whatsappEnabled: true,
      whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
      whatsappDefaultMessage: DEFAULT_WHATSAPP_MESSAGE,
      youtubeChannelUrl: DEMO_YOUTUBE_CHANNEL,
      universityProfileUrl: "https://www.nottingham.ac.uk",
      streamingPlatforms: [
        { platform: "instagram", url: PETER_SOCIAL_URLS.instagram },
        { platform: "youtube", url: DEMO_YOUTUBE_CHANNEL },
        { platform: "x", url: "https://x.com/ProfitableLivingNet" },
        {
          platform: "microsoft-teams",
          url: "https://teams.microsoft.com/l/meet/PLN",
        },
      ],
      socialLinks: [
        { platform: "youtube", url: PETER_SOCIAL_URLS.youtube },
        { platform: "instagram", url: PETER_SOCIAL_URLS.instagram },
        { platform: "linkedin", url: PETER_SOCIAL_URLS.linkedin },
        { platform: "facebook", url: PETER_SOCIAL_URLS.facebook },
      ],
    },
  });

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      ...SEED_HOMEPAGE,
      featuredArticles: relations.articleIds.slice(0, 4),
      featuredEvents: relations.eventIds.slice(0, 3),
      featuredVideos: relations.youtubeIds.slice(0, 4),
      heroRightImages: {
        missionSlide: media.article1Img,
        missionAlt: SEED_HOMEPAGE.heroRightImages.missionAlt,
        pillarsSlide: media.article2Img,
        pillarsAlt: SEED_HOMEPAGE.heroRightImages.pillarsAlt,
        gatherSlide: media.portraitId,
        gatherAlt: SEED_HOMEPAGE.heroRightImages.gatherAlt,
      },
      wisdomConstellationHoverImage: media.portraitId,
      journeyStepImages: {
        learnImage: media.article1Img,
        learnAlt: SEED_HOMEPAGE.journeyStepImages.learnAlt,
        applyImage: media.article2Img,
        applyAlt: SEED_HOMEPAGE.journeyStepImages.applyAlt,
        growImage: media.article3Img,
        growAlt: SEED_HOMEPAGE.journeyStepImages.growAlt,
        influenceImage: media.article4Img,
        influenceAlt: SEED_HOMEPAGE.journeyStepImages.influenceAlt,
        impactImage: media.portraitId,
        impactAlt: SEED_HOMEPAGE.journeyStepImages.impactAlt,
      },
      featuredTeachingsHeroImage: media.article1Img,
    },
  });

  await payload.updateGlobal({
    slug: "about-page",
    data: {
      ...SEED_ABOUT_PAGE,
      portrait: media.portraitId,
      missionStatement: richText(...SEED_ABOUT_PAGE.missionStatement),
      biography: richText(...SEED_ABOUT_PAGE.biography),
      speakingMinistry: richText(...SEED_ABOUT_PAGE.speakingMinistry),
      teachingMinistry: richText(...SEED_ABOUT_PAGE.teachingMinistry),
      academicProfile: richText(...SEED_ABOUT_PAGE.academicProfile),
    },
  });

  await payload.updateGlobal({
    slug: "services-page",
    data: {
      ...SEED_SERVICES_PAGE,
      heroImage: media.servicesHeroImg,
    },
  });

  await payload.updateGlobal({
    slug: "contact-page",
    data: SEED_CONTACT_PAGE,
  });

  await payload.updateGlobal({
    slug: "events-page",
    data: SEED_EVENTS_PAGE,
  });

  await payload.updateGlobal({
    slug: "resources-page",
    data: SEED_RESOURCES_PAGE,
  });
}

export async function runSeed(payload: Payload, options: SeedOptions = {}) {
  const replace =
    options.replace ?? process.env.NODE_ENV !== "production";

  const admin = await seedAdminUser(payload);

  const articlesBefore = await collectionCount(payload, "articles");
  const shouldSeedCollections = replace || articlesBefore === 0;

  if (replace) {
    await clearCollections(payload);
  }

  const media = await ensureSeedMedia(payload);

  let relations = {
    articleIds: [] as number[],
    eventIds: [] as number[],
    youtubeIds: [] as number[],
  };

  if (shouldSeedCollections) {
    relations = await seedCollections(payload, media);
  } else {
    const [articles, events, youtube] = await Promise.all([
      payload.find({
        collection: "articles",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 6,
      }),
      payload.find({ collection: "events", sort: "startDate", limit: 4 }),
      payload.find({ collection: "youtube-videos", sort: "order", limit: 4 }),
    ]);
    relations = {
      articleIds: articles.docs.map((doc) => Number(doc.id)),
      eventIds: events.docs.map((doc) => Number(doc.id)),
      youtubeIds: youtube.docs.map((doc) => Number(doc.id)),
    };

    if (relations.youtubeIds.length === 0) {
      const synced = await syncPeterYoutubeVideos(payload);
      relations.youtubeIds = synced.ids;
    }
  }

  await seedGlobals(payload, media, relations);

  return {
    admin,
    replace,
    collectionsSeeded: shouldSeedCollections,
    articles: relations.articleIds.length,
    events: relations.eventIds.length,
    youtubeVideos: relations.youtubeIds.length,
    globals: 7,
  };
}
