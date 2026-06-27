import type { Testimonial } from "@/payload-types";
import { getMediaUrlOrPlaceholder } from "@/lib/media";
import Image from "next/image";

type Props = {
  testimonials: Testimonial[];
  sectionLabel: string;
  sectionTitle: string;
};

export function TestimonialsStrip({
  testimonials,
  sectionLabel,
  sectionTitle,
}: Props) {
  if (!testimonials.length) return null;

  return (
    <section className="bg-pln-ivory pln-section dark:bg-pln-navy-light">
      <div className="pln-container">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-pln-gold">
          {sectionLabel}
        </p>
        <h2 className="mt-4 pln-section-title text-pln-navy dark:text-pln-ivory">
          {sectionTitle}
        </h2>
        <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => {
            const img = getMediaUrlOrPlaceholder(t.image, "testimonial");
            return (
              <blockquote
                key={t.id}
                className="border-l-2 border-pln-gold pl-8"
              >
                <p className="font-body text-lg italic leading-relaxed text-pln-charcoal dark:text-pln-ivory/90">
                  &ldquo;{t.testimonial}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-4">
                  <Image
                    src={img}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <cite className="font-sans text-sm font-medium not-italic">
                      {t.name}
                    </cite>
                    {t.position && (
                      <p className="text-xs text-pln-charcoal-muted dark:text-pln-ivory/50">
                        {t.position}
                      </p>
                    )}
                  </div>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
