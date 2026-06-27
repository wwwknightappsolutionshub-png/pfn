import type { Metadata } from "next";
import { Anek_Latin, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ReadingProgress } from "@/components/layout/reading-progress";
import { Analytics } from "@/components/layout/analytics";
import { WhatsAppWidget } from "@/components/layout/whatsapp-widget";
import { organizationJsonLd, buildMetadata } from "@/lib/seo";
import "@/app/globals.css";

const anek = Anek_Latin({
  variable: "--font-anek",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = buildMetadata({
  title: "148Inspirations | Godly Wisdom for a Profitable Life",
  description:
    "A Christian mission dedicated to teaching how to live a godly and profitable life through practical wisdom. Led by Peter Olusanjo.",
  path: "/",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${anek.variable} ${montserrat.variable} pln-grain min-h-screen antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <ThemeProvider>
          <WhatsAppWidget>
            <ReadingProgress />
            <SiteHeader />
            <main className="flex-1 pt-0">{children}</main>
            <SiteFooter />
            <Analytics />
          </WhatsAppWidget>
        </ThemeProvider>
      </body>
    </html>
  );
}
