import Link from "next/link";
import { AboutHeroVisual } from "@/components/about/about-hero-visual";
import { AcademicJourney } from "@/components/about/academic-journey";
import { MinistriesSection } from "@/components/about/ministries-section";
import { CmsRichText } from "@/components/cms/cms-rich-text";
import type { AboutPageContent } from "@/lib/cms-page-types";
import type { SiteSetting } from "@/payload-types";

export type AboutPageViewProps = {
  about: AboutPageContent | null;
  portraitUrl: string;
  universityProfileUrl?: SiteSetting["universityProfileUrl"];
};

export function AboutPageEditorial({
  about,
  portraitUrl,
  universityProfileUrl,
}: AboutPageViewProps) {
  return (
    <div className="pb-16 sm:pb-24">
      <section className="grid min-h-0 bg-pln-navy lg:min-h-[85dvh] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-24 xl:px-16">
          <div className="w-full max-w-xl lg:mx-auto lg:max-w-lg lg:translate-x-8 xl:max-w-xl xl:translate-x-12">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-pln-gold">
              {about?.heroKicker}
            </p>
            <h1 className="mt-4 pln-page-title text-pln-ivory sm:mt-6 lg:text-[3.5rem] xl:text-7xl">
              {about?.heroTitle}
            </h1>
            {about?.missionStatement != null ? (
              <div className="mt-6 max-w-xl font-body text-base leading-relaxed text-pln-ivory/85 sm:mt-8 sm:text-lg lg:text-xl">
                <CmsRichText data={about.missionStatement} variant="dark" />
              </div>
            ) : null}
            {about?.scriptureReference && (
              <p className="mt-6 font-display text-2xl italic text-pln-gold">
                {about.scriptureReference}
              </p>
            )}
          </div>
        </div>

        <AboutHeroVisual portraitUrl={portraitUrl} />
      </section>

      {about?.biography != null ? (
        <section className="bg-pln-section-light-bg pln-section-tight text-pln-section-light-body">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold-on-light">
              {about.biographySectionLabel}
            </p>
            <div className="mt-6 font-body text-lg leading-relaxed text-pln-section-light-muted sm:mt-8 sm:text-xl lg:text-2xl lg:leading-relaxed">
              <CmsRichText data={about.biography} variant="light" />
            </div>
          </div>
        </section>
      ) : null}

      <MinistriesSection about={about} />

      <section className="border-t border-pln-navy/10 bg-pln-ivory pln-section-tight text-pln-section-light-body">
        <div className="pln-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="pln-section-title text-pln-section-light-heading">
              {about?.academicJourneyTitle}
            </h2>
            {about?.academicJourneySubtitle && (
              <p className="mt-4 font-body text-pln-section-light-muted">
                {about.academicJourneySubtitle}
              </p>
            )}
          </div>
          <AcademicJourney credentials={about?.credentials} />
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
