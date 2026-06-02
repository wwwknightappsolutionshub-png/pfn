import Link from "next/link";
import { SocialMediaIcons } from "@/components/layout/social-media-icons";
import { StreamingPlatforms } from "@/components/layout/streaming-platforms";
import { WhatsAppChatTrigger } from "@/components/layout/whatsapp-chat-trigger";
import { getSiteSettings } from "@/lib/cms";
import { resolveWhatsApp } from "@/lib/whatsapp";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const whatsapp = resolveWhatsApp(settings);

  return (
    <footer className="border-t border-pln-charcoal/10 bg-pln-navy text-pln-ivory dark:border-pln-ivory/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-20">
        <div className="lg:col-span-5">
          <p className="font-display text-2xl leading-tight sm:text-3xl">
            Profitable Living Network
          </p>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-pln-ivory/70">
            A Christian mission dedicated to teaching how to live a godly and
            profitable life — wisdom for everyday living.
          </p>
          <p className="mt-6 font-sans text-xs text-pln-gold">
            1 Timothy 4:7–8
          </p>
          <SocialMediaIcons
            links={settings?.socialLinks}
            className="mt-10"
            variant="dark"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-4">
          <div>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.25em] text-pln-gold">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-pln-ivory/80">
              {[
                ["/about", "About"],
                ["/services", "Services"],
                ["/events", "Events"],
                ["/resources", "Resources"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-pln-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.25em] text-pln-gold">
              Connect
            </p>
            <ul className="space-y-2 text-sm text-pln-ivory/80">
              <li>
                <Link href="/contact" className="hover:text-pln-gold">
                  Contact
                </Link>
              </li>
              {whatsapp.enabled && (
                <li>
                  <WhatsAppChatTrigger
                    variant="dark"
                    showLabel
                    label="WhatsApp"
                    className="inline-flex"
                  />
                </li>
              )}
              <li>
                <Link href="/events" className="hover:text-pln-gold">
                  Wisdom Snippets
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-pln-gold">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <StreamingPlatforms
            links={settings?.streamingPlatforms}
            variant="dark"
          />
        </div>
      </div>

      <div className="border-t border-pln-ivory/10 px-6 py-6 text-center font-sans text-xs text-pln-ivory/50 lg:px-10">
        © {new Date().getFullYear()} Profitable Living Network. All rights
        reserved.
      </div>
    </footer>
  );
}
