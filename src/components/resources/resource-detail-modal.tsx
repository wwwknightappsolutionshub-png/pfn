"use client";

import Image from "next/image";
import Link from "next/link";
import type { Article, Resource } from "@/payload-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArticleRichText } from "@/components/resources/article-rich-text";
import { YoutubeEmbed } from "@/components/youtube/youtube-embed";
import { getMediaUrl, getMediaUrlOrPlaceholder } from "@/lib/media";
import { parseYoutubeIdFromUrl } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type ArticleRecord = Article & {
  content?: unknown;
};

type ResourceRecord = Resource & {
  relatedArticle?: number | ArticleRecord | null;
};

export type ResourceHubSelection =
  | { kind: "article"; article: ArticleRecord }
  | { kind: "resource"; resource: ResourceRecord };

type Props = {
  selection: ResourceHubSelection | null;
  articlesById: Map<number, ArticleRecord>;
  onClose: () => void;
};

function formatCategory(category: string) {
  return category.replace(/-/g, " ");
}

export function ResourceDetailModal({
  selection,
  articlesById,
  onClose,
}: Props) {
  if (!selection) return null;

  const isArticle = selection.kind === "article";
  const article: ArticleRecord | null = isArticle
    ? selection.article
    : resolveRelatedArticle(selection.resource, articlesById);

  const title = isArticle ? selection.article.title : selection.resource.title;
  const category = isArticle
    ? selection.article.category
    : selection.resource.category;
  const excerpt = isArticle
    ? selection.article.excerpt
    : selection.resource.description;
  const author = isArticle ? selection.article.author : null;

  const resourceYoutubeId =
    !isArticle &&
    selection.resource.resourceType === "video" &&
    selection.resource.videoUrl
      ? parseYoutubeIdFromUrl(selection.resource.videoUrl)
      : null;

  const imageUrl = isArticle
    ? getMediaUrlOrPlaceholder(selection.article.coverImage, "article")
    : getResourceImage(selection.resource, articlesById);

  const body = isArticle ? (
    <ArticleBody article={selection.article} />
  ) : (
    <ResourceBody resource={selection.resource} article={article} />
  );

  return (
    <Dialog
      open
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent
        className={cn(
          "max-h-[min(92vh,900px)] max-w-[calc(100%-2rem)] gap-0 overflow-hidden p-0 sm:max-w-3xl",
          "grid-rows-[auto_1fr]",
        )}
      >
        {resourceYoutubeId ? (
          <div className="w-full shrink-0 p-4 sm:p-5">
            <YoutubeEmbed
              youtubeId={resourceYoutubeId}
              title={title}
              className="rounded-none sm:rounded-xl"
            />
          </div>
        ) : (
          <div className="relative aspect-[16/9] w-full shrink-0 bg-pln-navy/10">
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pln-navy/50 via-transparent to-transparent" />
          </div>
        )}

        <div className="overflow-y-auto px-6 pb-8 pt-6 sm:px-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-gold-on-light">
            {formatCategory(category)}
          </p>
          <DialogTitle className="mt-3 pr-8 text-left text-2xl sm:text-3xl">
            {title}
          </DialogTitle>
          {author && (
            <DialogDescription className="mt-2 text-left font-body italic">
              {author}
            </DialogDescription>
          )}
          {excerpt && (
            <p className="mt-4 font-display text-lg leading-relaxed text-pln-section-light-heading">
              {excerpt}
            </p>
          )}
          <div className="mt-6 border-t border-pln-navy/10 pt-6">{body}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ArticleBody({ article }: { article: ArticleRecord }) {
  if (article.content) {
    return <ArticleRichText data={article.content} />;
  }
  if (article.excerpt) {
    return (
      <p className="font-body leading-relaxed text-pln-section-light-body">
        {article.excerpt}
      </p>
    );
  }
  return (
    <p className="text-pln-section-light-muted">
      Content for this article is not available yet.
    </p>
  );
}

function ResourceBody({
  resource,
  article,
}: {
  resource: ResourceRecord;
  article: ArticleRecord | null;
}) {
  const fileUrl =
    resource.resourceType === "file" ? getMediaUrl(resource.file) : null;
  const youtubeId =
    resource.resourceType === "video" && resource.videoUrl
      ? parseYoutubeIdFromUrl(resource.videoUrl)
      : null;

  return (
    <div className="space-y-6">
      {article?.content ? (
        <ArticleRichText data={article.content} />
      ) : article?.excerpt ? (
        <p className="font-body leading-relaxed text-pln-section-light-body">
          {article.excerpt}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {resource.resourceType === "file" && fileUrl && (
          <Link
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border border-pln-gold-on-light px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-gold-on-light transition hover:bg-pln-gold-on-light hover:text-pln-section-light-bg"
          >
            Download file
          </Link>
        )}
        {resource.resourceType === "video" &&
          resource.videoUrl &&
          !youtubeId && (
            <Link
              href={resource.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-pln-gold-on-light px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-gold-on-light transition hover:bg-pln-gold-on-light hover:text-pln-section-light-bg"
            >
              Watch video
            </Link>
          )}
        {resource.resourceType === "external" && resource.externalUrl && (
          <Link
            href={resource.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border border-pln-gold-on-light px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-gold-on-light transition hover:bg-pln-gold-on-light hover:text-pln-section-light-bg"
          >
            Open link
          </Link>
        )}
      </div>
    </div>
  );
}

function resolveRelatedArticle(
  resource: ResourceRecord,
  articlesById: Map<number, ArticleRecord>,
): ArticleRecord | null {
  const rel = resource.relatedArticle;
  if (!rel) return null;
  if (typeof rel === "number") return articlesById.get(rel) ?? null;
  return rel;
}

function getResourceImage(
  resource: ResourceRecord,
  articlesById: Map<number, ArticleRecord>,
) {
  const fileUrl = getMediaUrlOrPlaceholder(resource.file, "article");
  if (getMediaUrl(resource.file)) return fileUrl;
  const related = resolveRelatedArticle(resource, articlesById);
  if (related) return getMediaUrlOrPlaceholder(related.coverImage, "article");
  return fileUrl;
}
