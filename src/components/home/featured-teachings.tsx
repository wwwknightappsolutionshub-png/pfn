import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/payload-types";
import { getMediaUrlOrPlaceholder } from "@/lib/media";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  articles: Article[];
};

export function FeaturedTeachings({ title, articles }: Props) {
  if (!articles.length) return null;

  const [featured, ...rest] = articles;

  return (
    <section className="border-t border-pln-navy/10 bg-pln-section-light-bg py-28 text-pln-section-light-body lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold-on-light">
              Section III
            </p>
            <h2 className="mt-5 max-w-2xl border-l-4 border-pln-gold-on-light pl-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-pln-section-light-heading sm:text-5xl lg:text-[3.35rem]">
              {title}
            </h2>
          </div>
          <Link
            href="/resources"
            className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pln-section-light-muted transition-colors hover:text-pln-gold-on-light"
          >
            View all resources →
          </Link>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <Link
            href={`/resources/${featured.slug}`}
            className="group relative overflow-hidden rounded-2xl ring-1 ring-pln-navy/10 lg:col-span-7"
          >
            <Image
              src={getMediaUrlOrPlaceholder(featured.coverImage, "article")}
              alt={featured.title}
              width={900}
              height={600}
              className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pln-navy/95 via-pln-navy/35 to-pln-navy/5" />
            <div className="absolute bottom-0 p-8 text-pln-ivory">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pln-gold">
                {featured.category}
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold text-pln-ivory group-hover:text-pln-gold">
                {featured.title}
              </h3>
            </div>
          </Link>

          <div className="flex flex-col gap-4 lg:col-span-5">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/resources/${article.slug}`}
                className={cn(
                  "group rounded-xl border border-pln-navy/10 bg-pln-ivory/50 p-5 transition-colors",
                  "hover:border-pln-gold-on-light/35 hover:bg-white hover:shadow-[0_8px_28px_rgba(11,20,38,0.08)]",
                )}
              >
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-pln-gold-on-light">
                  {article.category}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-pln-section-light-heading transition-colors group-hover:text-pln-gold-on-light">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-pln-section-light-muted">
                    {article.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
