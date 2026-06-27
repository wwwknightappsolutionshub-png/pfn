import { EventsHub } from "@/components/events/events-hub";
import { getEventsPage, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = buildMetadata({
  title: "Events | 148Inspirations",
  description:
    "Wisdom Snippets every Monday, School of Wisdom monthly, conferences and speaking engagements.",
  path: "/events",
});

export default async function EventsPage() {
  noStore();

  const [page, settings] = await Promise.all([
    getEventsPage(),
    getSiteSettings(),
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

      <section className="bg-pln-section-light-bg py-12 text-pln-section-light-body sm:py-16 lg:py-24">
        <div className="pln-container">
          <EventsHub streamingPlatforms={settings?.streamingPlatforms} />
        </div>
      </section>
    </div>
  );
}
