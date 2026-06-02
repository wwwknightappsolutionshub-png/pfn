import { getSiteSettings } from "@/lib/cms";
import { resolveWhatsApp } from "@/lib/whatsapp";
import { WhatsAppChatProvider } from "@/components/layout/whatsapp-chat-provider";

export async function WhatsAppWidget({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const whatsapp = resolveWhatsApp(settings);

  if (!whatsapp.enabled) return children;

  return (
    <WhatsAppChatProvider
      config={{
        number: whatsapp.number,
        defaultMessage: whatsapp.message,
      }}
    >
      {children}
    </WhatsAppChatProvider>
  );
}
