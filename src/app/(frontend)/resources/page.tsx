import { ResourcesHub } from "@/components/resources/resources-hub";
import { YoutubeVideoSection } from "@/components/youtube/youtube-video-section";
import {
  getArticles,
  getResources,
  getAllYoutubeVideos,
  getSiteSettings,
} from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources | Profitable Living Network",
  description:
    "Articles, videos, Wisdom Snippets, School of Wisdom archives, and downloads.",
  path: "/resources",
});

export const revalidate = 60;

export default async function ResourcesPage() {
  const [resources, articles, youtubeVideos, settings] = await Promise.all([
    getResources(),
    getArticles(),
    getAllYoutubeVideos(),
    getSiteSettings(),
  ]);

  return (
    <div className="pb-24">
      <section className="border-b border-pln-gold/20 bg-pln-navy px-6 py-28 text-pln-ivory lg:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
            Knowledge Hub
          </p>
          <h1 className="mt-6 max-w-3xl border-l-4 border-pln-gold pl-6 font-display text-5xl font-extrabold leading-tight lg:text-6xl">
            Resources
          </h1>
          <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-pln-ivory/80">
            Explore teachings, archives, and downloads — filter and search to
            find wisdom for your journey.
          </p>
        </div>
      </section>

      <section className="bg-pln-section-light-bg text-pln-section-light-body">
        <YoutubeVideoSection
          sectionLabel="YouTube Channel"
          title="Video teachings"
          subtitle="Browse sessions from Profitable Living Network. Hover and move your cursor to scroll through the library."
          videos={youtubeVideos}
          channelUrl={settings?.youtubeChannelUrl}
          scrollOnHover
          variant="light"
        />

        <div className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
          <div className="border-t border-pln-navy/10 pt-20 lg:pt-28">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold-on-light">
              Library
            </p>
            <h2 className="mt-5 max-w-2xl border-l-4 border-pln-gold-on-light pl-6 font-display text-4xl font-extrabold leading-tight text-pln-section-light-heading lg:text-5xl">
              Articles &amp; downloads
            </h2>
            <div className="mt-12">
              <ResourcesHub resources={resources} articles={articles} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
