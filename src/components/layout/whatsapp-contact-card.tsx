import { getSiteSettings } from "@/lib/cms";
import { resolveWhatsApp } from "@/lib/whatsapp";
import { WhatsAppChatTrigger } from "@/components/layout/whatsapp-chat-trigger";

export async function WhatsAppContactCard() {
  const settings = await getSiteSettings();
  const whatsapp = resolveWhatsApp(settings);

  if (!whatsapp.enabled) return null;

  return (
    <div className="mt-10 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 p-6">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#128C7E]">
        WhatsApp
      </p>
      <p className="mt-3 font-body text-sm leading-relaxed text-pln-ivory/80">
        Prefer a quick chat? Message us directly on WhatsApp.
      </p>
      <WhatsAppChatTrigger
        href={whatsapp.href}
        variant="brand"
        label="Message on WhatsApp"
        className="mt-5"
      />
      <p className="mt-3 font-sans text-xs text-pln-ivory/50">
        {whatsapp.number}
      </p>
    </div>
  );
}
