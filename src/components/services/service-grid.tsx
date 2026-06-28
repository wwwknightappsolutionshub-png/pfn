import Link from "next/link";
import type { ElementType } from "react";
import type { Service } from "@/payload-types";
import { CmsRichText } from "@/components/cms/cms-rich-text";
import {
  Briefcase,
  Mic2,
  Users,
  Building2,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, ElementType> = {
  mentoring: Users,
  consultancy: GraduationCap,
  business: Building2,
  conference: Briefcase,
  speaking: Mic2,
};

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="space-y-8">
      {services.map((service, i) => {
        const Icon = icons[service.icon || "mentoring"] || Users;
        return (
          <article
            key={service.id}
            className={cn(
              "grid gap-8 rounded-2xl border border-pln-navy/10 bg-white p-8 shadow-[0_8px_28px_rgba(11,20,38,0.06)] transition-colors",
              "hover:border-pln-gold-on-light/35 hover:shadow-[0_12px_36px_rgba(11,20,38,0.1)]",
              "lg:grid-cols-12 lg:items-start lg:p-12",
            )}
          >
            <div className="flex items-start gap-6 lg:col-span-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-pln-gold-on-light/40 bg-pln-section-light-bg text-pln-gold-on-light">
                <Icon size={24} strokeWidth={1.25} />
              </div>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-pln-gold-on-light">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-pln-section-light-heading">
                  {service.title}
                </h2>
              </div>
            </div>
            <div className="space-y-5 lg:col-span-5">
              {(service as Service & { description?: unknown }).description !=
              null ? (
                <CmsRichText
                  data={(service as Service & { description?: unknown }).description}
                  variant="light"
                />
              ) : null}
              {(service as Service & { showBenefits?: boolean | null }).showBenefits !==
                false &&
                service.benefits &&
                service.benefits.length > 0 && (
                <ul className="space-y-3">
                  {service.benefits.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-pln-section-light-muted"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pln-gold-on-light" />
                      <span className="leading-relaxed">{b.benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center lg:col-span-3 lg:justify-end lg:pt-2">
              <Link
                href={`/contact?service=${service.slug}`}
                className="inline-flex items-center font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pln-gold-on-light transition-colors hover:text-pln-section-light-heading"
              >
                {service.ctaLabel || "Request Inquiry"} →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
