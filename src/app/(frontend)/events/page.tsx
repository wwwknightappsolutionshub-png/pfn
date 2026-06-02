import { EventsHub } from "@/components/events/events-hub";
import { getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Events | Profitable Living Network",
  description:
    "Wisdom Snippets every Monday, School of Wisdom monthly, conferences and speaking engagements.",
  path: "/events",
});

export const revalidate = 60;

export default async function EventsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pb-16 sm:pb-24">
      <section className="border-b border-pln-gold/20 bg-pln-navy px-4 py-16 text-pln-ivory sm:px-6 sm:py-20 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
            Events
          </p>
          <h1 className="mt-4 max-w-3xl border-l-4 border-pln-gold pl-4 pln-page-title sm:mt-6 sm:pl-6 lg:text-6xl">
            Gather for wisdom
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-pln-ivory/80 sm:mt-8 sm:text-lg">
            Join Wisdom Snippets every Monday, School of Wisdom monthly, and special
            gatherings designed for growth, fellowship, and Kingdom impact.
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
