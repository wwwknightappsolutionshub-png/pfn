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
    <div className="pb-24">
      <section className="border-b border-pln-gold/20 bg-pln-navy px-6 py-28 text-pln-ivory lg:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
            Events
          </p>
          <h1 className="mt-6 max-w-3xl border-l-4 border-pln-gold pl-6 font-display text-5xl font-extrabold leading-tight lg:text-6xl">
            Gather for wisdom
          </h1>
          <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-pln-ivory/80">
            Join Wisdom Snippets every Monday, School of Wisdom monthly, and special
            gatherings designed for growth, fellowship, and Kingdom impact.
          </p>
        </div>
      </section>

      <section className="bg-pln-section-light-bg py-16 text-pln-section-light-body lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <EventsHub streamingPlatforms={settings?.streamingPlatforms} />
        </div>
      </section>
    </div>
  );
}
