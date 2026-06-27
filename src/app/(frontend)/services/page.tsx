import { ServiceGrid } from "@/components/services/service-grid";
import { ServicesHero } from "@/components/services/services-hero";
import { getServices, getServicesPage } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { resolveMediaUrl } from "@/lib/media.server";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = buildMetadata({
  title: "Services | 148Inspirations",
  description:
    "Life mentoring, private consultancy, business consultancy, conferences, and speaking engagements.",
  path: "/services",
});

export default async function ServicesPage() {
  noStore();

  const [services, page] = await Promise.all([
    getServices(),
    getServicesPage(),
  ]);

  const heroImageUrl = await resolveMediaUrl(page?.heroImage);

  return (
    <div className="pb-24">
      <ServicesHero
        kicker={page?.heroKicker || ""}
        title={page?.heroTitle || ""}
        description={page?.heroDescription || ""}
        heroImageUrl={heroImageUrl}
        heroImageAlt={page?.heroImageAlt}
      />

      <section className="bg-pln-section-light-bg py-16 text-pln-section-light-body lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ServiceGrid services={services} />
        </div>
      </section>
    </div>
  );
}
