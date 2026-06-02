import { NewsletterForm } from "@/components/forms/newsletter-form";

type Props = {
  title: string;
  description: string;
  buttonLabel: string;
};

export function WisdomCta({ title, description, buttonLabel }: Props) {
  return (
    <section className="relative overflow-hidden bg-pln-ivory py-28 dark:bg-pln-navy-light lg:py-40">
      <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-pln-gold/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-pln-gold">
            Section VI
          </p>
          <h2 className="mt-4 font-display text-4xl text-pln-navy dark:text-pln-ivory lg:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-pln-charcoal-muted dark:text-pln-ivory/70">
            {description}
          </p>
        </div>
        <div className="border-l border-pln-gold/30 pl-0 lg:pl-16">
          <NewsletterForm
            source="wisdom-snippets"
            submitLabel={buttonLabel}
          />
        </div>
      </div>
    </section>
  );
}
