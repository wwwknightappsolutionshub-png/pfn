import { ResourcesHub } from "@/components/resources/resources-hub";
import { YoutubeVideoSection } from "@/components/youtube/youtube-video-section";
import {
  getArticles,
  getResources,
  getAllYoutubeVideos,
  getSiteSettings,
  getResourcesPage,
} from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { PETER_YOUTUBE_CHANNEL } from "@/lib/peter-youtube-videos";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = buildMetadata({
  title: "Resources | 148Inspirations",
  description:
    "Articles, videos, Wisdom Snippets, School of Wisdom archives, and downloads.",
  path: "/resources",
});

export default async function ResourcesPage() {
  noStore();

  const [resources, articles, youtubeVideos, settings, page] =
    await Promise.all([
      getResources(),
      getArticles(),
      getAllYoutubeVideos(),
      getSiteSettings(),
      getResourcesPage(),
    ]);

  return (
    <div className="pb-16 sm:pb-24">
      <section className="border-b border-pln-gold/20 bg-pln-navy px-4 py-16 text-pln-ivory sm:px-6 sm:py-20 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
            {page?.heroKicker}
          </p>
          <h1 className="mt-4 max-w-3xl border-l-4 border-pln-gold pl-4 pln-page-title sm:mt-6 sm:pl-6 lg:text-6xl">
            {page?.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-pln-ivory/80 sm:mt-8 sm:text-lg">
            {page?.heroDescription}
          </p>
        </div>
      </section>

      <section className="bg-pln-section-light-bg text-pln-section-light-body">
        <YoutubeVideoSection
          sectionLabel={page?.youtubeSectionLabel || ""}
          title={page?.youtubeSectionTitle || ""}
          subtitle={page?.youtubeSectionSubtitle || undefined}
          videos={youtubeVideos}
          channelUrl={settings?.youtubeChannelUrl ?? PETER_YOUTUBE_CHANNEL}
          scrollOnHover
          variant="light"
        />

        {page?.showLibrarySection === true ? (
          <div className="pln-container pb-16 sm:pb-20 lg:pb-28">
            <div className="border-t border-pln-navy/10 pt-12 sm:pt-16 lg:pt-28">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold-on-light">
                {page?.libraryKicker}
              </p>
              <h2 className="mt-4 max-w-2xl border-l-4 border-pln-gold-on-light pl-4 pln-section-title text-pln-section-light-heading sm:mt-5 sm:pl-6">
                {page?.libraryTitle}
              </h2>
              <div className="mt-8 sm:mt-12">
                <ResourcesHub resources={resources} articles={articles} />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
