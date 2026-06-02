import type { SiteSetting } from "@/payload-types";

export const DEFAULT_WHATSAPP_NUMBER = "+447746798923";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Profitable Living Network, I would like to get in touch.";

export function normalizeWhatsAppNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(
  phone: string,
  message?: string | null,
): string {
  const digits = normalizeWhatsAppNumber(phone);
  if (!digits) return "https://wa.me/";

  const url = `https://wa.me/${digits}`;
  const text = message?.trim();
  return text ? `${url}?text=${encodeURIComponent(text)}` : url;
}

export function resolveWhatsApp(settings?: SiteSetting | null) {
  const number = settings?.whatsappNumber?.trim() || DEFAULT_WHATSAPP_NUMBER;
  const message =
    settings?.whatsappDefaultMessage?.trim() || DEFAULT_WHATSAPP_MESSAGE;
  const enabled = settings?.whatsappEnabled !== false;

  return {
    enabled,
    number,
    message,
    href: buildWhatsAppUrl(number, message),
  };
}
