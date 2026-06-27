import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/contact-form";
import { getEventBySlug } from "@/lib/cms";
import { getMediaUrlOrPlaceholder } from "@/lib/media";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return buildMetadata({
    title: `${event.title} | PLN Events`,
    description: `${event.title} — 148Inspirations`,
    path: `/events/${slug}`,
  });
}

export default async function EventDetailPage({ params }: Props) {
  noStore();

  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const date = new Date(event.startDate).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imageUrl = getMediaUrlOrPlaceholder(event.featuredImage, "event");

  return (
    <div className="pb-24">
      <div className="relative mx-auto max-w-5xl px-6 pt-8 lg:px-10">
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-pln-navy/10 shadow-lg">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pln-navy/90 via-pln-navy/30 to-transparent" />
        </div>
      </div>

      <section className="border-b border-pln-gold/20 bg-pln-navy px-6 py-16 text-pln-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/events"
            className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pln-gold transition hover:text-pln-ivory"
          >
            ← All events
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-pln-gold">
            {event.eventType}
          </p>
          <h1 className="mt-4 pln-page-title">
            {event.title}
          </h1>
          <p className="mt-4 text-base text-pln-ivory/80 sm:mt-6 sm:text-lg">
            {date}
            {event.location ? ` · ${event.location}` : ""}
          </p>
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              className="mt-8 inline-block border border-pln-gold bg-transparent px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-gold transition hover:bg-pln-gold hover:text-pln-navy"
            >
              Register
            </a>
          )}
        </div>
      </section>

      <section className="bg-pln-section-light-bg px-6 py-16 text-pln-section-light-body lg:px-10 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="border-l-4 border-pln-gold-on-light pl-6 font-display text-3xl font-extrabold text-pln-section-light-heading">
            Register your interest
          </h2>
          <p className="mt-4 pl-6 font-body text-pln-section-light-muted">
            Complete the form below and our team will follow up with details.
          </p>
          <div className="mt-10 rounded-2xl border border-pln-navy/10 bg-white p-8 shadow-[0_8px_28px_rgba(11,20,38,0.06)]">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
