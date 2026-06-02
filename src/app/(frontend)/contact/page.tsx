import { ContactForm } from "@/components/forms/contact-form";
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
    <div className="pb-24">
      <section className="grid lg:min-h-[80vh] lg:grid-cols-2">
        <div className="flex flex-col justify-end border-b border-pln-gold/20 bg-pln-navy px-6 py-28 text-pln-ivory lg:border-b-0 lg:border-r lg:px-12 lg:py-36 xl:px-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
            Contact
          </p>
          <h1 className="mt-6 max-w-lg border-l-4 border-pln-gold pl-6 font-display text-5xl font-extrabold leading-tight lg:text-6xl">
            Let&apos;s connect
          </h1>
          <p className="mt-8 max-w-md pl-6 font-body text-lg leading-relaxed text-pln-ivory/80">
            Speaking invitations, consultancy inquiries, life mentoring, and
            event registrations — we welcome your message.
          </p>
          <ul className="mt-12 space-y-3 pl-6 font-sans text-sm uppercase tracking-[0.15em] text-pln-ivory/70">
            {inquiryTopics.map((topic) => (
              <li key={topic} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-pln-gold" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-pln-section-light-bg px-6 py-28 text-pln-section-light-body lg:px-12 lg:py-36 xl:px-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold-on-light">
            Inquiry
          </p>
          <h2 className="mt-5 max-w-xl border-l-4 border-pln-gold-on-light pl-6 font-display text-3xl font-extrabold leading-tight text-pln-section-light-heading lg:text-4xl">
            Send a message
          </h2>
          <p className="mt-4 max-w-lg pl-6 font-body text-pln-section-light-muted">
            Complete the form and our team will respond as soon as possible.
          </p>
          <div className="mt-10 rounded-2xl border border-pln-navy/10 bg-white p-8 shadow-[0_8px_28px_rgba(11,20,38,0.06)] lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
