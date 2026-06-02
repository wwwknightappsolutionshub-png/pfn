import { ContactForm } from "@/components/forms/contact-form";
import { WhatsAppContactCard } from "@/components/layout/whatsapp-contact-card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact | Profitable Living Network",
  description:
    "Contact PLN for speaking invitations, consultancy inquiries, mentoring, and general questions.",
  path: "/contact",
});

const inquiryTopics = [
  "Speaking Invitations",
  "Consultancy Inquiries",
  "Life Mentoring",
  "General Contact",
];

export default function ContactPage() {
  return (
    <div className="pb-16 sm:pb-24">
      <section className="grid lg:min-h-[80vh] lg:grid-cols-2">
        <div className="flex flex-col justify-end border-b border-pln-gold/20 bg-pln-navy px-4 py-16 text-pln-ivory sm:px-6 sm:py-20 lg:border-b-0 lg:border-r lg:px-12 lg:py-36 xl:px-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
            Contact
          </p>
          <h1 className="mt-4 max-w-lg border-l-4 border-pln-gold pl-4 pln-page-title sm:mt-6 sm:pl-6 lg:text-6xl">
            Let&apos;s connect
          </h1>
          <p className="mt-6 max-w-md pl-4 font-body text-base leading-relaxed text-pln-ivory/80 sm:mt-8 sm:pl-6 sm:text-lg">
            Speaking invitations, consultancy inquiries, life mentoring, and
            event registrations — we welcome your message.
          </p>
          <ul className="mt-8 space-y-3 pl-4 font-sans text-xs uppercase tracking-[0.15em] text-pln-ivory/70 sm:mt-12 sm:pl-6 sm:text-sm">
            {inquiryTopics.map((topic) => (
              <li key={topic} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-pln-gold" />
                {topic}
              </li>
            ))}
          </ul>
          <WhatsAppContactCard />
        </div>

        <div className="bg-pln-section-light-bg px-4 py-16 text-pln-section-light-body sm:px-6 sm:py-20 lg:px-12 lg:py-36 xl:px-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold-on-light">
            Inquiry
          </p>
          <h2 className="mt-4 max-w-xl border-l-4 border-pln-gold-on-light pl-4 font-display text-2xl font-extrabold leading-tight text-pln-section-light-heading sm:mt-5 sm:pl-6 sm:text-3xl lg:text-4xl">
            Send a message
          </h2>
          <p className="mt-4 max-w-lg pl-4 font-body text-sm text-pln-section-light-muted sm:pl-6 sm:text-base">
            Complete the form and our team will respond as soon as possible.
          </p>
          <div className="mt-8 rounded-2xl border border-pln-navy/10 bg-white p-5 shadow-[0_8px_28px_rgba(11,20,38,0.06)] sm:mt-10 sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
