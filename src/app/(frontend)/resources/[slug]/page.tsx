import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { getMediaUrlOrPlaceholder } from "@/lib/media";
import { ShareButtons } from "@/components/resources/share-buttons";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seo?.title || `${article.title} | PLN`,
    description:
      article.seo?.description || article.excerpt || article.title,
    path: `/resources/${slug}`,
    type: "article",
  });
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const cover = getMediaUrlOrPlaceholder(article.coverImage, "article");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <article className="pb-24">
      <header className="bg-pln-navy px-6 py-24 text-pln-ivory lg:py-32">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/resources"
            className="text-xs uppercase tracking-[0.25em] text-pln-gold"
          >
            ← Resources
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-pln-gold/80">
            {article.category}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight lg:text-5xl">
            {article.title}
          </h1>
          {article.author && (
            <p className="mt-6 font-body italic text-pln-ivory/70">
              {article.author}
            </p>
          )}
          <ShareButtons
            url={`${siteUrl}/resources/${slug}`}
            title={article.title}
          />
        </div>
      </header>

      <div className="relative mx-auto -mt-12 max-w-4xl px-6">
        <Image
          src={cover}
          alt={article.title}
          width={1200}
          height={630}
          className="aspect-[2/1] w-full object-cover shadow-2xl"
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        {article.excerpt && (
          <p className="font-display text-2xl leading-relaxed text-pln-charcoal-muted dark:text-pln-ivory/80">
            {article.excerpt}
          </p>
        )}
        <p className="mt-8 text-pln-charcoal-muted dark:text-pln-ivory/60">
          Full article content is managed in the CMS rich text editor. Connect
          the database and publish articles to render formatted content here via
          the Lexical renderer.
        </p>
      </div>
    </article>
  );
}
