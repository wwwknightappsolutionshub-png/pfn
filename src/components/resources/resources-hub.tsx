"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Article, Resource } from "@/payload-types";
import {
  ResourceDetailModal,
  type ResourceHubSelection,
} from "@/components/resources/resource-detail-modal";
import { getMediaUrlOrPlaceholder } from "@/lib/media";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All" },
  { value: "articles", label: "Articles" },
  { value: "videos", label: "Videos" },
  { value: "wisdom-snippets", label: "Wisdom Snippets" },
  { value: "school-of-wisdom", label: "School of Wisdom" },
  { value: "downloads", label: "Downloads" },
  { value: "images", label: "Images" },
];

type ArticleRecord = Article & { content?: unknown };
type ResourceRecord = Resource & {
  relatedArticle?: number | ArticleRecord | null;
};

type HubCard = {
  id: string;
  title: string;
  category: string;
  excerpt?: string | null;
  imageUrl: string;
  selection: ResourceHubSelection;
};

type Props = {
  resources: Resource[];
  articles: Article[];
};

export function ResourcesHub({ resources, articles }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selection, setSelection] = useState<ResourceHubSelection | null>(null);

  const articlesById = useMemo(() => {
    const map = new Map<number, ArticleRecord>();
    for (const a of articles) {
      map.set(a.id, a as ArticleRecord);
    }
    return map;
  }, [articles]);

  const items = useMemo((): HubCard[] => {
    const articleItems: HubCard[] = articles.map((a) => {
      const record = a as ArticleRecord;
      return {
        id: `article-${a.id}`,
        title: a.title,
        category: a.category,
        excerpt: a.excerpt,
        imageUrl: getMediaUrlOrPlaceholder(a.coverImage, "article"),
        selection: { kind: "article", article: record },
      };
    });

    const resourceItems: HubCard[] = resources.map((r) => {
      const record = r as ResourceRecord;
      return {
        id: `resource-${r.id}`,
        title: r.title,
        category: r.category,
        excerpt: r.description,
        imageUrl: getMediaUrlOrPlaceholder(r.file, "article"),
        selection: { kind: "resource", resource: record },
      };
    });

    return [...articleItems, ...resourceItems];
  }, [articles, resources]);

  const filtered = items.filter((item) => {
    const matchQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.excerpt || "").toLowerCase().includes(query.toLowerCase());

    if (category === "images") return matchQuery;
    const matchCat = category === "all" || item.category === category;
    return matchCat && matchQuery;
  });

  const isImagesView = category === "images";

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-pln-navy/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
        <input
          type="search"
          placeholder="Search resources…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md flex-1 border-b border-pln-navy/20 bg-transparent py-3 font-body text-lg text-pln-section-light-body placeholder:text-pln-section-light-muted focus:border-pln-gold-on-light focus:outline-none"
        />
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={cn(
                "font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-colors",
                category === c.value
                  ? "text-pln-gold-on-light"
                  : "text-pln-section-light-muted hover:text-pln-gold-on-light",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {isImagesView ? (
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelection(item.selection)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-pln-navy/10 bg-white shadow-[0_4px_20px_rgba(11,20,38,0.04)] transition hover:border-pln-gold-on-light/35 hover:shadow-[0_12px_36px_rgba(11,20,38,0.08)]"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pln-navy/80 via-pln-navy/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="absolute bottom-0 left-0 right-0 p-3 text-left font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-pln-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.title}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelection(item.selection)}
              className="group overflow-hidden rounded-2xl border border-pln-navy/10 bg-white text-left shadow-[0_4px_20px_rgba(11,20,38,0.04)] transition hover:border-pln-gold-on-light/35 hover:shadow-[0_12px_36px_rgba(11,20,38,0.08)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-pln-navy/5">
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pln-gold-on-light">
                  {item.category}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-pln-section-light-heading transition-colors group-hover:text-pln-gold-on-light">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-pln-section-light-muted">
                    {item.excerpt}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="mt-12 text-pln-section-light-muted">
          No resources match your search. Try a different category or term.
        </p>
      )}

      <ResourceDetailModal
        selection={selection}
        articlesById={articlesById}
        onClose={() => setSelection(null)}
      />
    </div>
  );
}
