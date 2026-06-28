"use client";

import type { AboutPageContent } from "@/lib/cms-page-types";
import { CmsRichText } from "@/components/cms/cms-rich-text";
import { BookConsultationModal } from "@/components/about/book-consultation-modal";

type Props = {
  about: AboutPageContent | null;
};

function MinistryCardBlock({
  index,
  title,
  contents,
}: {
  index: number;
  title: string;
  contents: unknown[];
}) {
  const blocks = contents.filter((content) => content != null);
  if (!title && blocks.length === 0) return null;

  return (
    <article className="relative flex h-full flex-col border border-pln-gold/25 bg-pln-navy-light/40 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
      <span className="font-display text-4xl font-bold text-pln-gold/25 sm:text-5xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-4 font-display text-2xl font-semibold text-pln-ivory sm:text-3xl">
        {title}
      </h3>
      {blocks.length > 0 ? (
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-pln-ivory/70 sm:text-base">
          {blocks.map((content, i) => (
            <CmsRichText key={i} data={content} variant="dark" />
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function MinistriesSection({ about }: Props) {
  const speakingTeachingTitle =
    about?.speakingMinistryTitle?.trim() || "Speaking & Teaching Ministry";
  const academicTitle =
    about?.academicProfileTitle?.trim() || "Academic Profile";

  const speakingTeachingContents = [
    about?.speakingMinistry,
    about?.teachingMinistry,
  ].filter((content) => content != null);

  const hasSpeakingTeaching =
    speakingTeachingTitle || speakingTeachingContents.length > 0;
  const hasAcademic =
    academicTitle || about?.academicProfile != null;

  if (!hasSpeakingTeaching && !hasAcademic) return null;

  const ministries = [
    hasSpeakingTeaching
      ? {
          title: speakingTeachingTitle,
          contents: speakingTeachingContents,
        }
      : null,
    hasAcademic
      ? {
          title: academicTitle,
          contents: about?.academicProfile != null ? [about.academicProfile] : [],
        }
      : null,
  ].filter(Boolean) as { title: string; contents: unknown[] }[];

  return (
    <section className="bg-pln-navy pln-section-tight text-pln-ivory">
      <div className="pln-container">
        <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
          {about?.ministriesSectionLabel}
        </p>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2">
          {ministries.map((ministry, i) => (
            <MinistryCardBlock
              key={ministry.title}
              index={i}
              title={ministry.title}
              contents={ministry.contents}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-center sm:mt-12">
          <BookConsultationModal />
        </div>
      </div>
    </section>
  );
}
