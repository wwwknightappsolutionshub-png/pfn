import type { Metadata } from "next";
import { OG_PLACEHOLDER } from "@/lib/placeholders";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3010";

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}${OG_PLACEHOLDER}`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "148Inspirations",
      type,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "148Inspirations",
    url: siteUrl,
    description:
      "A Christian mission dedicated to teaching how to live a godly and profitable life through practical wisdom.",
    founder: {
      "@type": "Person",
      name: "Peter Olusanjo",
    },
  };
}
