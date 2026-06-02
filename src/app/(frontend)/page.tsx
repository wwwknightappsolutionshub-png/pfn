import { CinematicHeroEditorial } from "@/components/home/cinematic-hero-editorial";
import { WisdomConstellation } from "@/components/home/wisdom-constellation";
import { WisdomJourney } from "@/components/home/wisdom-journey";
import { FeaturedTeachings } from "@/components/home/featured-teachings";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { WisdomCta } from "@/components/home/wisdom-cta";
import { TestimonialsStrip } from "@/components/home/testimonials-strip";
import { YoutubeVideoSection } from "@/components/youtube/youtube-video-section";
import { getHomepageData, getSiteSettings } from "@/lib/cms";

export const revalidate = 60;

export default async function HomePage() {
  const [{ homepage, articles, events, videos, testimonials }, settings] =
    await Promise.all([getHomepageData(), getSiteSettings()]);
  const h = homepage!;

  return (
    <>
      <CinematicHeroEditorial
        headline={h.cinematicHeadline || ""}
        subheadline={h.cinematicSubheadline || ""}
        channelUrl={settings?.youtubeChannelUrl}
      />
      <WisdomConstellation title={h.wisdomSectionTitle || ""} />
      <WisdomJourney title={h.journeySectionTitle || ""} />
      <FeaturedTeachings
        title={h.featuredTeachingsTitle || ""}
        articles={articles}
      />
      <YoutubeVideoSection
        sectionLabel="Section IV"
        title={h.videosSectionTitle || "From the Teaching Channel"}
        subtitle={h.videosSectionSubtitle || undefined}
        videos={videos}
        channelUrl={settings?.youtubeChannelUrl}
        dark
      />
      <UpcomingEvents title={h.eventsSectionTitle || ""} events={events} />
      <TestimonialsStrip testimonials={testimonials} />
      <WisdomCta
        title={h.ctaTitle || ""}
        description={h.ctaDescription || ""}
        buttonLabel={h.ctaButtonLabel || "Subscribe"}
      />
    </>
  );
}
