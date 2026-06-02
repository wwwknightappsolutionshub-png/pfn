import Link from "next/link";
import type { Event } from "@/payload-types";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  events: Event[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const typeLabels: Record<string, string> = {
  "wisdom-snippets": "Wisdom Snippets",
  "school-of-wisdom": "School of Wisdom",
};

function EventCard({
  href,
  eyebrow,
  title,
  detail,
  staggered,
}: {
  href: string;
  eyebrow: string;
  title: string;
  detail: string;
  staggered?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group rounded-2xl border border-pln-navy/10 bg-white/90 p-6 transition-colors sm:p-8 lg:p-10",
        "hover:border-pln-gold-on-light/40 hover:bg-white hover:shadow-[0_12px_36px_rgba(11,20,38,0.1)]",
        staggered && "lg:translate-y-12",
      )}
    >
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pln-gold-on-light">
        {eyebrow}
      </p>
      <h3 className="mt-4 font-display text-2xl font-semibold text-pln-section-light-heading transition-colors group-hover:text-pln-gold-on-light">
        {title}
      </h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-pln-section-light-muted">
        {detail}
      </p>
    </Link>
  );
}

export function UpcomingEvents({ title, events }: Props) {
  return (
    <section className="border-t border-pln-navy/10 bg-pln-section-light-bg pln-section text-pln-section-light-body">
      <div className="pln-container">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold-on-light">
          Section V
        </p>
        <h2 className="mt-5 max-w-2xl border-l-4 border-pln-gold-on-light pl-4 pln-section-title text-pln-section-light-heading sm:pl-6">
          {title}
        </h2>

        <div className="mt-10 grid gap-6 sm:mt-12 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {events.length > 0 ? (
            events.map((event, i) => (
              <EventCard
                key={event.id}
                href={`/events/${event.slug}`}
                eyebrow={typeLabels[event.eventType] || event.eventType}
                title={event.title}
                detail={`${formatDate(event.startDate)}${event.location ? ` · ${event.location}` : ""}`}
                staggered={i % 2 === 1}
              />
            ))
          ) : (
            <>
              <EventCard
                href="/events"
                eyebrow="Every Monday"
                title="Wisdom Snippets"
                detail="Weekly practical wisdom sessions"
              />
              <EventCard
                href="/events"
                eyebrow="Third Friday Monthly"
                title="School of Wisdom"
                detail="Deeper teaching and discipleship"
                staggered
              />
            </>
          )}
        </div>

        <Link
          href="/events"
          className="mt-12 inline-block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pln-section-light-muted transition-colors hover:text-pln-gold-on-light"
        >
          Full events calendar →
        </Link>
      </div>
    </section>
  );
}
