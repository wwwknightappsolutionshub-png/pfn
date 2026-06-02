import Link from "next/link";
import { AboutHeroVisual } from "@/components/about/about-hero-visual";
import { AcademicJourney } from "@/components/about/academic-journey";
import { MinistriesSection } from "@/components/about/ministries-section";
import {
  ABOUT_BIO,
  ABOUT_MISSION,
  type AboutPageViewProps,
} from "@/components/about/about-content";

/** Cinematic about — split hero (copy left, portrait right) + navy/ivory bands */
export function AboutPageEditorial({
  portraitUrl,
  credentials,
  universityProfileUrl,
}: AboutPageViewProps) {
  return (
    <div className="pb-24">
      <section className="grid min-h-[min(88dvh,900px)] bg-pln-navy lg:min-h-[85dvh] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 lg:px-10 lg:py-24 xl:px-16">
          <div className="w-full max-w-xl lg:mx-auto lg:max-w-lg lg:translate-x-8 xl:max-w-xl xl:translate-x-12">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-pln-gold">
              Profitable Living Network
            </p>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] text-pln-ivory sm:text-6xl lg:text-[3.5rem] xl:text-7xl">
              Peter Olusanjo
            </h1>
            <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-pln-ivory/85 lg:text-xl">
              {ABOUT_MISSION}
            </p>
            <p className="mt-6 font-display text-2xl italic text-pln-gold">
              1 Timothy 4:7–8
            </p>
          </div>
        </div>

        <AboutHeroVisual portraitUrl={portraitUrl} />
      </section>

      <section className="bg-pln-section-light-bg py-20 text-pln-section-light-body lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold-on-light">
            Biography
          </p>
          <p className="mt-8 font-body text-xl leading-relaxed text-pln-section-light-muted lg:text-2xl lg:leading-relaxed">
            {ABOUT_BIO}
          </p>
        </div>
      </section>

      <MinistriesSection />

      <section className="border-t border-pln-navy/10 bg-pln-ivory py-20 text-pln-section-light-body lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-extrabold text-pln-section-light-heading lg:text-5xl">
              Academic Journey
            </h2>
            <p className="mt-4 font-body text-pln-section-light-muted">
              Four milestones of scholarship in service of faithful, practical
              teaching.
            </p>
          </div>
          <AcademicJourney credentials={credentials} />
          {universityProfileUrl && (
            <div className="mt-12 text-center">
              <Link
                href={universityProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-pln-gold-on-light px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pln-gold-on-light transition hover:bg-pln-gold-on-light hover:text-pln-section-light-bg"
              >
                View university profile
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
