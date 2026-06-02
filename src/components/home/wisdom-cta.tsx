import { NewsletterForm } from "@/components/forms/newsletter-form";

type Props = {
  title: string;
  description: string;
  buttonLabel: string;
};

export function WisdomCta({ title, description, buttonLabel }: Props) {
  return (
    <section className="relative overflow-hidden bg-pln-ivory pln-section dark:bg-pln-navy-light">
      <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-pln-gold/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="pln-container grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-pln-gold">
            Section VI
          </p>
          <h2 className="mt-4 pln-section-title text-pln-navy dark:text-pln-ivory">
            {title}
          </h2>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-pln-charcoal-muted dark:text-pln-ivory/70 sm:mt-6 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="border-t border-pln-gold/30 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
          <NewsletterForm
            source="wisdom-snippets"
            submitLabel={buttonLabel}
          />
        </div>
      </div>
    </section>
  );
}
