import { ServiceGrid } from "@/components/services/service-grid";
import { ServicesHero } from "@/components/services/services-hero";
import { getServices } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services | Profitable Living Network",
  description:
    "Life mentoring, private consultancy, business consultancy, conferences, and speaking engagements.",
  path: "/services",
});

export const revalidate = 120;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="pb-24">
      <ServicesHero />

      <section className="bg-pln-section-light-bg py-16 text-pln-section-light-body lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ServiceGrid services={services} />
        </div>
      </section>
    </div>
  );
}
