import { CinematicHeroEditorial } from "@/components/home/cinematic-hero-editorial";
import { WisdomConstellation } from "@/components/home/wisdom-constellation";
import { WisdomJourney } from "@/components/home/wisdom-journey";
import { FeaturedTeachings } from "@/components/home/featured-teachings";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { WisdomCta } from "@/components/home/wisdom-cta";
import { TestimonialsStrip } from "@/components/home/testimonials-strip";
import { YoutubeVideoSection } from "@/components/youtube/youtube-video-section";
import { unstable_noStore as noStore } from "next/cache";
import { getHomepageData, getSiteSettings } from "@/lib/cms";
import {
  buildCinematicHeroSlides,
  resolveConstellationTopics,
} from "@/lib/homepage-hero";
import { resolveHeroSlideImages } from "@/lib/hero-images";
import { resolveJourneySteps } from "@/lib/journey-images";
import { resolveMediaUrl, resolveMediaUrlOrPlaceholder } from "@/lib/media.server";
import type { HomepageHeroFields } from "@/lib/cms-page-types";
import { PETER_YOUTUBE_CHANNEL } from "@/lib/peter-youtube-videos";

export default async function HomePage() {
  noStore();

  const [{ homepage, articles, events, videos, testimonials }, settings] =
    await Promise.all([getHomepageData(), getSiteSettings()]);
  const h = homepage! as typeof homepage & HomepageHeroFields;
  const [heroImages, constellationHoverSrc, journeySteps, featuredHeroUrl] =
    await Promise.all([
      resolveHeroSlideImages(h),
      resolveMediaUrlOrPlaceholder(h.wisdomConstellationHoverImage, "portrait"),
      resolveJourneySteps(h),
      resolveMediaUrl(h.featuredTeachingsHeroImage),
    ]);

  const heroSlides = buildCinematicHeroSlides(h, heroImages);
  const constellationTopics = resolveConstellationTopics(h);

  const featuredHeroImage = featuredHeroUrl
    ? {
        src: featuredHeroUrl,
        alt:
          h.featuredTeachingsHeroImageAlt?.trim() ||
          articles[0]?.title ||
          "Featured teaching",
      }
    : null;

  return (
    <>
      <CinematicHeroEditorial
        slides={heroSlides}
        channelUrl={settings?.youtubeChannelUrl ?? PETER_YOUTUBE_CHANNEL}
      />
      <WisdomConstellation
        title={h.wisdomSectionTitle || ""}
        subtitle={h.wisdomSectionSubtitle || ""}
        ctaLabel={h.wisdomSectionCtaLabel || ""}
        topics={constellationTopics}
        hoverThumbnailSrc={constellationHoverSrc}
        hoverThumbnailAlt={
          h.wisdomConstellationHoverImageAlt?.trim() || "Peter Olusanjo"
        }
      />
      <WisdomJourney
        title={h.journeySectionTitle || ""}
        steps={journeySteps}
      />
      <FeaturedTeachings
        title={h.featuredTeachingsTitle || ""}
        articles={articles}
        featuredHeroImage={featuredHeroImage}
      />
      <YoutubeVideoSection
        sectionLabel="Section IV"
        title={h.videosSectionTitle || ""}
        subtitle={h.videosSectionSubtitle || undefined}
        videos={videos}
        channelUrl={settings?.youtubeChannelUrl ?? PETER_YOUTUBE_CHANNEL}
        dark
      />
      <UpcomingEvents title={h.eventsSectionTitle || ""} events={events} />
      <TestimonialsStrip
        testimonials={testimonials}
        sectionLabel={h.testimonialsSectionLabel || ""}
        sectionTitle={h.testimonialsSectionTitle || ""}
      />
      <WisdomCta
        title={h.ctaTitle || ""}
        description={h.ctaDescription || ""}
        buttonLabel={h.ctaButtonLabel || "Subscribe"}
      />
    </>
  );
}
