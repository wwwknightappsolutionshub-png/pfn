"use client";

import type { AboutPageContent } from "@/lib/cms-page-types";
import { CmsRichText } from "@/components/cms/cms-rich-text";
import { BookConsultationModal } from "@/components/about/book-consultation-modal";

type MinistryCard = {
  title?: string | null;
  content?: AboutPageContent["speakingMinistry"];
};

type Props = {
  about: AboutPageContent | null;
};

function MinistryCardBlock({
  index,
  title,
  content,
}: MinistryCard & { index: number }) {
  if (!title && !content) return null;

  return (
    <article className="relative border border-pln-gold/25 bg-pln-navy-light/40 p-6 backdrop-blur-sm sm:p-8">
      <span className="font-display text-4xl font-bold text-pln-gold/25 sm:text-5xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      {title && (
        <h3 className="mt-4 font-display text-2xl font-semibold text-pln-ivory">
          {title}
        </h3>
      )}
      {content != null ? (
        <div className="mt-4 text-sm leading-relaxed text-pln-ivory/70">
          <CmsRichText data={content} variant="dark" />
        </div>
      ) : null}
    </article>
  );
}

export function MinistriesSection({ about }: Props) {
  const ministries: MinistryCard[] = [
    {
      title: about?.speakingMinistryTitle,
      content: about?.speakingMinistry,
    },
    {
      title: about?.teachingMinistryTitle,
      content: about?.teachingMinistry,
    },
    {
      title: about?.academicProfileTitle,
      content: about?.academicProfile,
    },
  ].filter((item) => item.title || item.content);

  if (!ministries.length) return null;

  return (
    <section className="bg-pln-navy pln-section-tight text-pln-ivory">
      <div className="pln-container">
        <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
          {about?.ministriesSectionLabel}
        </p>
        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry, i) => (
            <MinistryCardBlock key={ministry.title || `ministry-${i}`} index={i} {...ministry} />
          ))}
        </div>
        <div className="flex justify-center">
          <BookConsultationModal />
        </div>
      </div>
    </section>
  );
}
