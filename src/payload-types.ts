/* Auto-generated placeholder — run `npm run generate:types` after DB is connected */

export interface Media {
  id: number;
  alt: string;
  url?: string | null;
  caption?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  author?: string | null;
  category: string;
  featured?: boolean | null;
  publishedAt?: string | null;
  status?: string | null;
  coverImage?: number | Media | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    ogImage?: number | Media | null;
  };
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  eventType: string;
  startDate: string;
  endDate?: string | null;
  recurrence?: string | null;
  location?: string | null;
  registrationUrl?: string | null;
  featured?: boolean | null;
  featuredImage?: number | Media | null;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  icon?: string | null;
  order?: number | null;
  ctaLabel?: string | null;
  benefits?: { benefit: string; id?: string }[] | null;
}

export interface Resource {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  category: string;
  resourceType: string;
  externalUrl?: string | null;
  videoUrl?: string | null;
  featured?: boolean | null;
  file?: number | Media | null;
}

export interface Testimonial {
  id: number;
  name: string;
  position?: string | null;
  testimonial: string;
  image?: number | Media | null;
}

export interface YoutubeVideo {
  id: number;
  title: string;
  youtubeId: string;
  description?: string | null;
  featured?: boolean | null;
  showOnHomepage?: boolean | null;
  order?: number | null;
  publishedAt?: string | null;
}

export interface Homepage {
  cinematicHeadline?: string | null;
  cinematicSubheadline?: string | null;
  heroRightImages?: {
    missionSlide?: number | Media | null;
    missionAlt?: string | null;
    pillarsSlide?: number | Media | null;
    pillarsAlt?: string | null;
    gatherSlide?: number | Media | null;
    gatherAlt?: string | null;
  };
  wisdomSectionTitle?: string | null;
  wisdomConstellationHoverImage?: number | Media | null;
  wisdomConstellationHoverImageAlt?: string | null;
  journeySectionTitle?: string | null;
  journeyStepImages?: {
    learnImage?: number | Media | null;
    learnAlt?: string | null;
    applyImage?: number | Media | null;
    applyAlt?: string | null;
    growImage?: number | Media | null;
    growAlt?: string | null;
    influenceImage?: number | Media | null;
    influenceAlt?: string | null;
    impactImage?: number | Media | null;
    impactAlt?: string | null;
  };
  featuredTeachingsTitle?: string | null;
  featuredTeachingsHeroImage?: number | Media | null;
  featuredTeachingsHeroImageAlt?: string | null;
  eventsSectionTitle?: string | null;
  videosSectionTitle?: string | null;
  videosSectionSubtitle?: string | null;
  ctaTitle?: string | null;
  ctaDescription?: string | null;
  ctaButtonLabel?: string | null;
  featuredArticles?: (number | Article)[] | null;
  featuredEvents?: (number | Event)[] | null;
  featuredVideos?: (number | YoutubeVideo)[] | null;
}

export interface SiteSetting {
  siteName?: string | null;
  tagline?: string | null;
  contactEmail?: string | null;
  whatsappEnabled?: boolean | null;
  whatsappNumber?: string | null;
  whatsappDefaultMessage?: string | null;
  youtubeChannelUrl?: string | null;
  universityProfileUrl?: string | null;
  analyticsId?: string | null;
  newsletterEnabled?: boolean | null;
  streamingPlatforms?: {
    platform?: string | null;
    url: string;
    id?: string;
  }[] | null;
  socialLinks?: { platform?: string | null; url: string; id?: string }[] | null;
  seo?: {
    defaultTitle?: string | null;
    defaultDescription?: string | null;
    keywords?: string | null;
  };
}

export interface AboutPageGlobal {
  biography?: unknown;
  speakingMinistry?: unknown;
  teachingMinistry?: unknown;
  academicProfile?: unknown;
  portrait?: number | Media | null;
  credentials?: {
    title: string;
    institution: string;
    detail?: string | null;
    id?: string;
  }[] | null;
}
